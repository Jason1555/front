import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { USER_ROLES } from '../../utils/constants';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="bg-history-ink text-history-parchment p-5 border-b-2 border-history-bronze shadow-xl relative overflow-hidden">
      {/* Текстура пыли для атмосферы */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-2xl font-serif font-bold tracking-widest text-history-gold uppercase">
            Historical Core
          </h1>
          <p className="text-[10px] text-history-bronze uppercase tracking-[0.2em] mt-1 font-medium">
            {user?.role === USER_ROLES.ORGANIZER ? 'Officium Organitoris' : 'Taberna Societatis'}
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block border-r border-history-bronze/30 pr-6">
              <p className="font-serif italic text-lg leading-tight">{user.name}</p>
              <p className="text-xs text-history-bronze">{user.email}</p>
            </div>
            <button
              onClick={() => dispatch(logout())}
              className="px-5 py-2 font-serif text-xs bg-history-burgundy text-history-parchment border border-history-gold/30 hover:bg-history-burgundy-hover transition-all shadow-[3px_3px_0px_0px_rgba(166,124,82,0.3)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
            >
              ПОКИНУТЬ
            </button>
          </div>
        )}
      </div>
    </header>
  );
};