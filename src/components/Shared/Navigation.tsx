import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { USER_ROLES } from '../../utils/constants';

export const Navigation = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return null;

  const isActive = (path: string) => 
    location.pathname === path 
      ? 'text-history-gold border-history-gold bg-white/5' 
      : 'text-history-parchment/60 border-transparent hover:text-history-parchment hover:bg-white/5';

  const navItemClass = "px-4 py-3 text-xs uppercase tracking-[0.2em] font-bold border-b-2 transition-all duration-300";

  const renderLinks = () => {
    if (user.role === USER_ROLES.ORGANIZER) {
      return (
        <>
          <Link to="/organizer/festivals" className={`${navItemClass} ${isActive('/organizer/festivals')}`}>
            Свитки Фестивалей
          </Link>
          <Link to="/organizer/applications" className={`${navItemClass} ${isActive('/organizer/applications')}`}>
            Прошения
          </Link>
        </>
      );
    }

    return (
      <>
        <Link to="/club/profile" className={`${navItemClass} ${isActive('/club/profile')}`}>
          Герб Клуба
        </Link>
        <Link to="/club/festivals" className={`${navItemClass} ${isActive('/club/festivals')}`}>
          Все События
        </Link>
        <Link to="/club/applications" className={`${navItemClass} ${isActive('/club/applications')}`}>
          Мои Грамоты
        </Link>
      </>
    );
  };

  return (
    <nav className="bg-history-ink border-b border-history-bronze/20 shadow-inner">
      <div className="max-w-7xl mx-auto flex gap-2 px-4">
        {renderLinks()}
      </div>
    </nav>
  );
};