import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStart, fetchSuccess, fetchFailure } from '../../store/slices/applicationsSlice';
import { mockApi } from '../../store/api/mockApi';

// Конфигурация для отображения статусов
const STATUS_CONFIG: Record<string, { label: string; style: string }> = {
  PENDING: { 
    label: 'На рассмотрении', 
    style: 'border-history-bronze text-history-bronze' 
  },
  APPROVED: { 
    label: 'Одобрено', 
    style: 'border-emerald-800 text-emerald-900' 
  },
  REJECTED: { 
    label: 'Отклонено', 
    style: 'border-history-burgundy text-history-burgundy' 
  },
};

export const MyApplications = () => {
  const dispatch = useAppDispatch();
  const { applications, isLoading } = useAppSelector((state) => state.applications);
  const { currentClub } = useAppSelector((state) => state.clubs);
  const { festivals } = useAppSelector((state) => state.festivals);

  useEffect(() => {
    const loadApplications = async () => {
      if (!currentClub) return;
      dispatch(fetchStart());
      try {
        const data = await mockApi.getApplications({ clubId: currentClub.id });
        dispatch(fetchSuccess(data));
      } catch (err) {
        dispatch(fetchFailure(err instanceof Error ? err.message : 'Ошибка загрузки'));
      }
    };
    loadApplications();
  }, [dispatch, currentClub]);

  const getFestivalName = (id: string) => festivals.find(f => f.id === id)?.name || 'Неизвестный фестиваль';

  // Функция для стилизации статуса
  const getStatusStyle = (status: string) => {
    const config = STATUS_CONFIG[status] || { label: status, style: 'border-history-ink text-history-ink' };
    return `border ${config.style} px-3 py-1 text-[11px] uppercase tracking-widest font-serif font-bold bg-white/30`;
  };

  if (isLoading) return <div className="p-8 text-center font-serif text-history-ink">Поиск записей в архиве...</div>;

  return (
    <div className="bg-history-parchment p-8 min-h-screen text-history-ink font-sans">
      <h2 className="text-3xl font-serif mb-8 border-b border-history-bronze pb-4">Журнал поданных заявок</h2>
      
      <div className="space-y-6">
        {applications.map((app) => (
          <div key={app.id} className="border border-history-bronze bg-white/50 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-serif font-bold text-xl">{getFestivalName(app.festivalId)}</h3>
                <p className="text-sm italic opacity-80">
                  Дата подачи: {new Date(app.submittedAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <div className={getStatusStyle(app.status)}>
                {STATUS_CONFIG[app.status]?.label || app.status}
              </div>
            </div>

            <p className="text-base leading-relaxed mb-4">{app.description}</p>

            {app.documents.length > 0 && (
              <div className="mb-4 border-t border-history-bronze/30 pt-3">
                <p className="text-xs font-bold uppercase tracking-wider mb-2 text-history-ink/70">Приложенные документы:</p>
                <ul className="list-none space-y-1 text-sm">
                  {app.documents.map((doc) => (
                    <li key={doc.id} className="before:content-['•'] before:mr-2 before:text-history-bronze">
                      <a 
                        href={doc.url || '#'} 
                        className="text-history-ink underline decoration-history-bronze decoration-1 underline-offset-4 hover:text-history-burgundy hover:decoration-history-burgundy transition-colors"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {app.reviewerNotes && (
              <div className="p-4 bg-history-parchment/50 border-l-4 border-history-burgundy text-sm italic">
                <p className="font-bold uppercase text-[10px] mb-1">Комментарий организатора:</p>
                <p>{app.reviewerNotes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};