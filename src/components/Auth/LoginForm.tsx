import React, { useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { USER_ROLES } from '../../utils/constants'; // Убедись, что путь к константам верный
import { mockApi } from '../../store/api/mockApi';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
  e.preventDefault();
  if (isLoading) return;

  dispatch(loginStart());

  try {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // ПРАВИЛЬНОЕ ОПРЕДЕЛЕНИЕ ID НА ОСНОВЕ ТВОИХ mockUsers
    let userId = '';
    if (email === 'organizer@example.com') userId = 'org-1';
    else if (email === 'club1@example.com') userId = 'club-1';
    else if (email === 'club2@example.com') userId = 'club-2';

    const role = email.includes('organizer') ? USER_ROLES.ORGANIZER : USER_ROLES.CLUB;
    
    const user = { 
      id: userId, 
      email, 
      role,
      name: email.includes('club1') ? 'Викинги' : 'Организатор'
    };

    // Теперь проверка пройдет, так как userId совпадает с ID в mockUsers
    if (role === USER_ROLES.CLUB) {
      const clubs = await mockApi.getClubs();
      // Ищем клуб, у которого userId совпадает с id залогиненного юзера
      const clubExists = clubs.find((c) => String(c.userId) === String(user.id));
      
      if (!clubExists) {
        throw new Error('Для данного пользователя не заведено летописи клуба.');
      }
    }

    dispatch(loginSuccess({ user, token: 'secret-token' }));
    navigate('/');
  } catch (err: any) {
    dispatch(loginFailure(err.message || 'Ошибка входа'));
  }
}, [email, password, dispatch, navigate, isLoading]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-4">
      {error && (
        <div className="bg-history-burgundy/20 border-l-4 border-history-burgundy p-3 text-history-parchment text-xs italic">
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <label className="label-modern-history">Электронная почта</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-modern-history"
          placeholder="nomen@imperium.com"
          required
        />
      </div>

      {/* Пароль */}
      <div>
        <label className="label-modern-history">Тайный шифр</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-modern-history"
          placeholder="••••"
          required
        />
      </div>

      {/* Кнопка в стиле RegisterForm */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-history-burgundy hover:bg-history-burgundy-hover text-history-parchment py-4 rounded-md font-serif font-bold tracking-[0.2em] uppercase text-sm shadow-xl transition-all active:scale-[0.97] disabled:opacity-50 cursor-pointer overflow-hidden relative group"
        >
          <span className="relative z-10">{isLoading ? 'Сверка списков...' : 'Войти'}</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Ссылка на регистрацию */}
      <div className="text-center pt-2">
        <Link 
          to="/register" 
          className="text-history-bronze hover:text-history-gold text-xs font-serif underline underline-offset-8 decoration-history-bronze/30 transition-all uppercase tracking-widest"
        >
          Примкнуть к ордену
        </Link>
      </div>
    </form>
  );
};