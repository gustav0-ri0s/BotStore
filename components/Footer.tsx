import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-slate-300 dark:text-slate-400 py-8 text-center mt-auto">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} BotStore. Todos los derechos reservados.</p>
        <p className="text-sm mt-1">Tu Socio Confiable para la Innovación en Robótica</p>
      </div>
    </footer>
  );
};

export default Footer;