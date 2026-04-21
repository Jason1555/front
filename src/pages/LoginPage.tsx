import { LoginForm } from '../components/Auth/LoginForm';
import backgroundImage from '../assets/login.webp';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,#3c2f25_0%,#1a1612_100%)]"
    style={{ 
        // Применяем картинку и накладываем темный градиент поверх неё
        backgroundImage: `linear-gradient(to bottom, rgba(26, 22, 18, 0.72), rgba(26, 22, 18, 0.98)), url(${backgroundImage})`,
        backgroundColor: '#1a1612' // Резервный цвет фона
      }}
    >
      <div className="w-full max-w-md relative animate-in fade-in zoom-in-95 duration-700">
        
        <div className="text-center mb-10">
          <h1 className="text-5xl font-serif text-history-gold tracking-[0.2em] uppercase mb-2 drop-shadow-2xl">
            Historical Core
          </h1>
          <div className="flex items-center justify-center gap-4 opacity-40">
            <div className="h-px w-8 bg-history-bronze"></div>
            <span className="text-history-bronze italic text-xs uppercase tracking-widest text-nowrap">Вход в обитель</span>
            <div className="h-px w-8 bg-history-bronze"></div>
          </div>
        </div>

        {/* Прозрачный контейнер для формы, чтобы не перегружать страницу */}
        <div className="bg-black/10 backdrop-blur-sm p-1 rounded-xl">
          <LoginForm />
        </div>
        
        <p className="mt-12 text-center text-history-bronze/30 text-[9px] tracking-[0.4em] uppercase">
          Aureum Reconstructio Systema &bull; 2026
        </p>
      </div>
    </div>
  );
};