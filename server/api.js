import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Configuração inicial
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ==============================================
// Configurações de Segurança e Middlewares
// ==============================================

// Configuração do CORS dinâmico
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5000/'
    ].filter(Boolean);

    // Permitir requisições sem origin (como mobile apps ou curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true
};

// Middlewares essenciais
app.use(helmet()); // Segurança básica para headers
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limiting para prevenir abuso
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requisições por IP
});
app.use(limiter);

// Middleware de log
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// ==============================================
// Configuração do Banco de Dados
// ==============================================

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 10000 // 10 segundos de timeout
};

// Pool de conexões (melhor que conexões diretas)
let pool;

const initializePool = async () => {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
    try {
      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();
      console.log('✅ Conexão com o banco de dados estabelecida com sucesso');
    } catch (error) {
      console.error('❌ Erro ao conectar ao banco de dados:', error);
      process.exit(1);
    }
  }
};

// ==============================================
// Rotas da API
// ==============================================

// Health Check
app.get('/', (_, res) => {
  res.status(200).json({
    status: 'online',
    message: "API está operacional",
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Rota para receber os dados do modal
app.post('/meta/send', async (req, res) => {
  // Tratamento para preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  let connection;
  try {
    // Validação dos dados de entrada
    const { name, phone, promotion_name, quantity, price, utm, graduation } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        status: 'error',
        errorType: 'VALIDATION_ERROR',
        message: 'Nome e telefone são obrigatórios',
        receivedData: req.body
      });
    }

    // Formatação dos dados
    const formattedPhone = phone.replace(/\D/g, '');
    const data = {
      full_name: name,
      phone: formattedPhone,
      promotion_name,
      promotion_quantity: quantity,
      promotion_price: price,
      utm_source: utm,
      graduation: graduation
    };

    console.log("📩 Dados recebidos:", JSON.stringify(data, null, 2));

    // Conexão com o banco de dados
    connection = await pool.getConnection();

    // Inserção no banco de dados
    const [result] = await connection.execute(
      `INSERT INTO Costumer 
        (full_name, phone, promotion_name, promotion_quantity, promotion_price, utm_source) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.full_name,
        data.phone,
        data.promotion_name,
        data.promotion_quantity,
        data.promotion_price,
        data.utm_source
      ]
    );

    console.log('✅ Dados inseridos com sucesso. ID:', result.insertId);

    // Resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: 'Dados recebidos e salvos com sucesso!',
      data: {
        ...data,
        id: result.insertId,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('❌ Erro:', error);

    // Tratamento de erros específicos
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        status: 'error',
        errorType: 'DUPLICATE_ENTRY',
        message: 'Este telefone já está cadastrado'
      });
    }

    if (error.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({
        status: 'error',
        errorType: 'DATABASE_SCHEMA_ERROR',
        message: 'Configuração do banco de dados incompleta'
      });
    }

    // Erro genérico
    return res.status(500).json({
      status: 'error',
      errorType: 'SERVER_ERROR',
      message: 'Ocorreu um erro inesperado no servidor',
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
        stack: error.stack
      })
    });
  } finally {
    if (connection) connection.release();
  }
});

// ==============================================
// Tratamento de Erros e Rotas Não Encontradas
// ==============================================

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    errorType: 'NOT_FOUND',
    message: 'Endpoint não encontrado',
    suggestedEndpoints: [
      { method: 'GET', path: '/', description: 'Health Check' },
      { method: 'POST', path: '/meta/send', description: 'Enviar dados do formulário' }
    ]
  });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error('🔥 Erro global:', err);

  // Tratamento específico para erros de CORS
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      status: 'error',
      errorType: 'CORS_ERROR',
      message: 'Acesso não permitido pela política de CORS'
    });
  }

  res.status(500).json({
    status: 'error',
    errorType: 'INTERNAL_SERVER_ERROR',
    message: 'Erro interno no servidor',
    ...(process.env.NODE_ENV === 'development' && {
      details: err.message,
      stack: err.stack
    })
  });
});

// ==============================================
// Inicialização do Servidor na Vercel (Serverless)
// ==============================================

let initialized = false;

const handler = async (req, res) => {
  try {
    if (!initialized) {
      await initializePool();
      initialized = true;
      console.log('🚀 Pool de conexões inicializado');
      console.log('🔒 Configuração de CORS:', corsOptions);
      console.log('🛡️ Ambiente:', process.env.NODE_ENV || 'development');
    }
    return app(req, res); // Vercel executa o Express como função handler
  } catch (error) {
    console.error('❌ Erro durante inicialização:', error);
    res.status(500).json({
      status: 'error',
      message: 'Erro interno no servidor durante a inicialização',
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
        stack: error.stack
      })
    });
  }
};

initializePool().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando localmente em http://localhost:${PORT}`);
  });
});
