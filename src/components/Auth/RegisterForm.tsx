import React, { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerSuccess, loginStart, loginFailure, clearError } from '../../store/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { USER_ROLES } from '../../utils/constants';

export const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: USER_ROLES.CLUB,
    password: '',
    confirmPassword: ''
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (formData.password !== formData.confirmPassword) {
      dispatch(loginFailure('Шифры не совпадают'));
      return;
    }

    dispatch(loginStart());

    try {
      await new Promise(resolve => setTimeout(resolve, 800)); // Имитация записи в свитки

      const mockResponse = {
        user: { 
          id: Math.random().toString(), 
          email: formData.email, 
          name: formData.name, 
          role: formData.role 
        },
        token: 'new-session-token'
      };

      dispatch(registerSuccess(mockResponse));
      navigate('/');
      
    } catch (err: any) {
      dispatch(loginFailure('Не удалось создать запись в летописи'));
    }
  }, [formData, dispatch, navigate, isLoading]);

  useEffect(() => {
    dispatch(clearError()); // Сбрасываем ошибку при открытии формы
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-4">
      {error && (
        <div className="bg-history-burgundy/20 border-l-4 border-history-burgundy p-3 text-history-parchment text-xs italic">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5">
        {/* Email */}
        <div>
          <label className="label-modern-history">Электронная почта</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="input-modern-history"
            placeholder="nomen@imperium.com"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="label-modern-history">Имя или Название Клуба</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="input-modern-history"
            placeholder="Richard the Lionheart"
            required
          />
        </div>

        {/* Role Select */}
        <div>
          <label className="label-modern-history">Ваше призвание</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-modern-history appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23a67c52\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
          >
            <option value={USER_ROLES.CLUB}>Клуб (Участник)</option>
            <option value={USER_ROLES.ORGANIZER}>Организатор (Магистр)</option>
          </select>
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-modern-history">Шифр</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="input-modern-history"
              placeholder="••••"
              required
            />
          </div>
          <div>
            <label className="label-modern-history">Повтор</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-modern-history"
              placeholder="••••"
              required
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-history-burgundy hover:bg-history-burgundy-hover text-history-parchment py-4 rounded-md font-serif font-bold tracking-[0.2em] uppercase text-sm shadow-xl transition-all active:scale-[0.97] disabled:opacity-50 cursor-pointer overflow-hidden relative group"
        >
          <span className="relative z-10">{isLoading ? 'Внесение в списки...' : 'Примкнуть'}</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      <div className="text-center pt-2">
        <Link 
          to="/login" 
          className="text-history-bronze hover:text-history-gold text-xs font-serif underline underline-offset-8 decoration-history-bronze/30 transition-all uppercase tracking-widest"
        >
          Уже в списках? Вернуться
        </Link>
      </div>
    </form>
  );
};