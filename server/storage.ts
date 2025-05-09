import { users, type User, type InsertUser } from "@shared/schema"; // Importa tipos e dados relacionados ao usuário do esquema compartilhado.

// Interface IStorage define os métodos necessários para CRUD de usuários.
export interface IStorage {
  getUser(id: number): Promise<User | undefined>; // Método para buscar um usuário pelo id.
  getUserByUsername(username: string): Promise<User | undefined>; // Método para buscar um usuário pelo nome de usuário.
  createUser(user: InsertUser): Promise<User>; // Método para criar um novo usuário.
}

// A classe MemStorage implementa a interface IStorage, usando memória para armazenar os dados.
export class MemStorage implements IStorage {
  private users: Map<number, User>; // Usamos um Map para armazenar usuários, com o id como chave.
  currentId: number; // Mantém o id atual para a criação de novos usuários.

  constructor() {
    this.users = new Map(); // Inicializa o Map de usuários.
    this.currentId = 1; // Começa o id dos usuários a partir de 1.
  }

  // Método para buscar um usuário pelo id
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id); // Retorna o usuário do Map, se encontrado.
  }

  // Método para buscar um usuário pelo nome de usuário
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find( // Converte o Map em um array de valores e encontra o usuário pelo nome de usuário.
      (user) => user.username === username,
    );
  }

  // Método para criar um novo usuário
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++; // Cria um novo id, e incrementa para o próximo.
    const user: User = { ...insertUser, id }; // Cria o usuário com os dados inseridos e o id gerado.
    this.users.set(id, user); // Armazena o usuário no Map.
    return user; // Retorna o usuário criado.
  }
}

// Instância de MemStorage que pode ser usada para acessar os métodos de CRUD.
export const storage = new MemStorage();