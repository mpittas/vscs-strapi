'use client';

import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: '700px' }}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(/images/solar-hero.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-[#0f172a]/80" /> {/* Dark overlay matches other sections */}
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center px-4">
        <span className="text-[#4ade80] font-medium mb-4 tracking-wide text-lg">
          VS Construction Services
        </span>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 max-w-5xl leading-tight">
          Вашият партньор в <span className="text-[#4ade80]">соларния бизнес</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-200 mb-12 max-w-2xl font-normal leading-relaxed">
          Строителни услуги до ключ и иновативни решения за възобновяема енергия.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Button 
            href="/contact" 
            className="rounded-full bg-[#10b981] hover:bg-[#059669] text-white border-none py-4 px-10 text-base font-bold shadow-lg shadow-green-900/20"
          >
            Свържете се с нас
          </Button>
          <Button 
            href="/about" 
            variant="secondary"
            className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white py-4 px-10 text-base font-bold"
          >
            Научете повече
          </Button>
        </div>
      </div>
    </section>
  );
}
