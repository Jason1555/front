import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStart, fetchClubSuccess, fetchFailure, updateSuccess } from '../../store/slices/clubsSlice';
import { mockApi } from '../../store/api/mockApi';

export const ClubProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { currentClub, isLoading } = useAppSelector((state) => state.clubs);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    website: '',
    description: '',
  });

  useEffect(() => {
  // Если у нас уже есть данные в currentClub, мы НЕ должны их перезагружать,
  // чтобы не вызывать лишних запросов и не сбрасывать состояние формы.
  if (currentClub) {
    setFormData({
      name: currentClub.name,
      phone: currentClub.phone,
      email: currentClub.email,
      website: currentClub.website || '',
      description: currentClub.description || '',
    });
    return;
  }

  const loadClub = async () => {
    if (!user) return;
    dispatch(fetchStart());
    try {
      const clubs = await mockApi.getClubs();
      const club = clubs.find((c) => c.userId === user.id);
      if (club) {
        dispatch(fetchClubSuccess(club));
      } else {
        dispatch(fetchFailure('Летопись клуба не найдена.'));
      }
    } catch (err) {
      dispatch(fetchFailure('Ошибка загрузки'));
    }
  };

    loadClub();
  }, [dispatch, user, currentClub?.id]); // Зависим от ID клуба, а не от всего объекта

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentClub) return;

    dispatch(fetchStart());
    try {
      const updated = await mockApi.updateClub(currentClub.id, formData);
      dispatch(updateSuccess(updated)); // Redux обновляет currentClub
    
      // Закрываем форму с небольшой задержкой
      setTimeout(() => {
        setIsEditing(false);
      }, 0);
    } catch (err) {
      dispatch(fetchFailure(err instanceof Error ? err.message : 'Ошибка обновления'));
    }
  };

  if (isLoading) return <div className="text-history-bronze text-center py-20 font-serif italic">Листаем свитки...</div>;

  if (!currentClub) return <div className="text-history-burgundy text-center py-20 font-serif">Летопись клуба не найдена.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-history-parchment border border-history-bronze/30 shadow-2xl rounded-sm">
      {/* Заголовок */}
      <div className="flex justify-between items-center border-b-2 border-history-burgundy pb-6 mb-8">
        <h2 className="text-4xl font-serif font-bold text-history-ink tracking-wide">{currentClub.name}</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-history-burgundy text-history-parchment px-6 py-2 rounded-sm uppercase tracking-[0.2em] text-xs font-bold hover:bg-[#6b232d] transition-all"
        >
          {isEditing ? 'Отмена' : 'Правка летописи'}
        </button>
      </div>

      {/* Основная сетка */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <img src={currentClub.logo} alt={currentClub.name} className="w-full aspect-square rounded-sm object-cover border-2 border-history-bronze shadow-lg" />
        </div>

        <div className="col-span-2 space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif text-xl border-b border-history-bronze/50 pb-2 text-history-burgundy">Контактные сведения</h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-sans">
              <p><span className="text-history-bronze block text-[10px] uppercase">Телефон</span> {currentClub.phone}</p>
              <p><span className="text-history-bronze block text-[10px] uppercase">Email</span> {currentClub.email}</p>
              
              {/* Добавляем отображение сайта */}
              {currentClub.website && (
                <p className="col-span-2">
                  <span className="text-history-bronze block text-[10px] uppercase">Сайт</span> 
                  <a href={currentClub.website} target="_blank" rel="noopener noreferrer" className="text-history-burgundy hover:underline">
                    {currentClub.website}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Здесь также можно добавить вывод социальных сетей, если они есть */}
          {currentClub.socialLinks && (
            <div className="space-y-2">
              <h3 className="font-serif text-sm text-history-bronze uppercase tracking-wider">Социальные сети</h3>
              <div className="flex gap-4">
                {currentClub.socialLinks.vk && <a href={currentClub.socialLinks.vk} target="_blank" rel="noreferrer" className="text-history-ink hover:text-history-burgundy">VK</a>}
                {currentClub.socialLinks.instagram && <a href={currentClub.socialLinks.instagram} target="_blank" rel="noreferrer" className="text-history-ink hover:text-history-burgundy">Instagram</a>}
              </div>
            </div>
          )}

          <div className="bg-history-ink/5 p-4 rounded-sm border-l-4 border-history-bronze">
            <h3 className="font-serif text-lg mb-2 text-history-ink">Описание</h3>
            <p className="text-history-ink/80 leading-relaxed italic">{currentClub.description}</p>
          </div>
        </div>
      </div>

      {/* Форма редактирования в том же стиле */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-12 pt-8 border-t-2 border-history-burgundy space-y-6">
          <h3 className="font-serif text-2xl text-history-burgundy">Изменение летописи</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Название" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Телефон" name="phone" value={formData.phone} onChange={handleChange} />
            <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
            <InputField label="Сайт" name="website" value={formData.website} onChange={handleChange} />
          </div>
          
          <div className="w-full">
            <label className="block text-xs uppercase tracking-widest text-history-bronze mb-2">Описание</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-white border border-history-bronze/30 p-4 focus:ring-1 focus:ring-history-burgundy outline-none" />
          </div>

          <button type="submit" className="w-full bg-history-ink text-white py-4 uppercase tracking-[0.3em] font-bold text-sm hover:bg-black transition-all">
            Сохранить изменения
          </button>
        </form>
      )}
    </div>
  );
};

// Вспомогательный компонент для инпутов
const InputField = ({ label, name, value, onChange }: any) => (
  <div>
    <label className="block text-xs uppercase tracking-widest text-history-bronze mb-2">{label}</label>
    <input type="text" name={name} value={value} onChange={onChange} className="w-full bg-white border border-history-bronze/30 px-4 py-3 outline-none focus:border-history-burgundy transition-colors" />
  </div>
);