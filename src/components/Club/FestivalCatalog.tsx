import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStart, fetchSuccess, fetchFailure } from '../../store/slices/festivalsSlice';
import { mockApi } from '../../store/api/mockApi';
import { FESTIVAL_STATUS } from '../../utils/constants';

export const FestivalCatalog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { festivals, isLoading, error } = useAppSelector((state) => state.festivals);

  useEffect(() => {
    const loadFestivals = async () => {
      dispatch(fetchStart());
      try {
        const data = await mockApi.getFestivals();
        // Фильтруем только активные фестивали для клубов
        const activeFestivals = data.filter((f) => f.status === FESTIVAL_STATUS.ACTIVE);
        dispatch(fetchSuccess(activeFestivals));
      } catch (err) {
        dispatch(fetchFailure(err instanceof Error ? err.message : 'Ошибка загрузки'));
      }
    };

    loadFestivals();
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center py-8">Загрузка фестивалей...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-history-parchment border border-history-bronze/30 shadow-2xl rounded-sm">
      <h2 className="text-3xl font-serif font-bold text-history-ink border-b-2 border-history-burgundy pb-6 mb-8 uppercase tracking-widest text-center">
        Доступные фестивали
      </h2>

      {error && (
        <div className="bg-history-burgundy/20 border border-history-burgundy text-history-burgundy px-4 py-3 rounded-sm mb-6 font-serif">
          {error}
        </div>
      )}

      {festivals.length === 0 ? (
        <p className="text-history-bronze text-center py-20 font-serif italic">Активных фестивалей не найдено</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {festivals.map((festival) => (
            <div key={festival.id} className="border border-history-bronze/50 p-6 bg-white shadow-md hover:shadow-xl transition-all rounded-sm flex flex-col">
              <h3 className="text-2xl font-serif font-bold text-history-ink mb-4 border-b border-history-bronze/30 pb-2">
                {festival.name}
              </h3>
              
              <div className="space-y-3 text-sm font-sans text-history-ink/70 mb-6 grow">
                <p><span className="text-history-bronze block text-[10px] uppercase">Эпоха</span> {festival.epoch}</p>
                <p><span className="text-history-bronze block text-[10px] uppercase">Дата</span> {new Date(festival.date).toLocaleDateString('ru-RU')}</p>
                <p><span className="text-history-bronze block text-[10px] uppercase">Место</span> {festival.location}</p>
              </div>

              <div className="flex gap-4 mt-auto">
                <a
                  href={festival.requirementsFileUrl}
                  download
                  className="flex-1 border border-history-ink text-history-ink py-3 text-center text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-history-ink hover:text-white transition-all"
                >
                  Требования
                </a>
                <button
                  onClick={() => navigate(`/club/festivals/${festival.id}/apply`)}
                  className="flex-1 bg-history-burgundy text-history-parchment py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#6b232d] transition-all"
                >
                  Подать заявку
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};  