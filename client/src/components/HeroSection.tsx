export default function HeroSection() {
  return (
    <section className="py-0 bg-gradient-to-r from-primary/10 to-neutral-100">
      <div className="w-full">
        <picture>
          <source 
            srcSet="/advantages/banner1920x600.png" 
            media="(min-width: 1920px)" 
          />
          <source 
            srcSet="/advantages/banner1440x600.png" 
            media="(min-width: 1440px)" 
          />
          <source 
            srcSet="/advantages/banner1024.jpeg" 
            media="(min-width: 1024px)" 
          />
         <source
         srcSet="advantages/banner768.jpeg"
         media="(max-width: 768px)"        
 

         />
          <img 
            src="/advantages/banner1024.jpeg" 
            alt="Estudantes profissionais em sala de aula" 
            className="w-full h-auto min-h-[600px] max-sm:h-auto"
          />
        </picture>
      </div>
    </section>
  );
}