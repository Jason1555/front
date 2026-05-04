import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadFestivals } from '../../store/thunks';
import { FESTIVAL_STATUS } from '../../utils/constants';

// Конфигурация статусов в стиле «канцелярских пометок»
const STATUS_CONFIG: Record<string, { label: string; style: string }> = {
  [FESTIVAL_STATUS.DRAFT]: { label: 'Черновик', style: 'border-history-ink text-history-ink/60' },
  [FESTIVAL_STATUS.ACTIVE]: { label: 'Активен', style: 'border-emerald-800 text-emerald-900' },
  [FESTIVAL_STATUS.COMPLETED]: { label: 'Завершен', style: 'border-history-bronze text-history-bronze' },
};

export const FestivalList = () => {
  const dispatch = useAppDispatch();
  const { festivals, isLoading } = useAppSelector((state) => state.festivals);

  useEffect(() => {
    if (festivals.length === 0) {
      dispatch(loadFestivals() as any);
    }
  }, [dispatch, festivals.length]);

  const getStatusBadge = (status: string) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG[FESTIVAL_STATUS.DRAFT];
    return (
      <span className={`border ${config.style} px-2 py-0.5 text-[10px] uppercase tracking-widest font-serif font-bold bg-history-parchment`}>
        {config.label}
      </span>
    );
  };

  if (isLoading) return <div className="p-8 text-center font-serif text-history-ink">Архивы поднимаются...</div>;

  return (
    <div className="bg-history-parchment p-8 min-h-screen text-history-ink font-sans">
      <h2 className="text-3xl font-serif mb-8 border-b border-history-bronze pb-4">
        Реестр фестивалей
      </h2>

      <div className="border border-history-bronze bg-history-parchment shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-history-bronze bg-history-bronze/10">
              {['Название', 'Эпоха', 'Дата', 'Место', 'Статус', 'Документы'].map((head) => (
                <th
                  key={head}
                  className="text-left px-6 py-4 font-serif font-bold text-sm uppercase tracking-wider text-history-ink"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-history-bronze/30">
            {festivals.map((festival) => (
              <tr key={festival.id} className="hover:bg-history-bronze/5 transition-colors">
                <td className="px-6 py-4 font-serif font-bold text-lg">{festival.name}</td>
                <td className="px-6 py-4 italic">{festival.epoch}</td>
                <td className="px-6 py-4">{new Date(festival.date).toLocaleDateString('ru-RU')}</td>
                <td className="px-6 py-4">{festival.location}</td>
                <td className="px-6 py-4">{getStatusBadge(festival.status)}</td>
                <td className="px-6 py-4">
                  <a
                    href={festival.requirementsFileUrl}
                    download
                    className="text-history-ink underline decoration-history-bronze hover:text-history-burgundy hover:decoration-history-burgundy transition-all text-sm font-serif italic"
                  >
                    Требования
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};