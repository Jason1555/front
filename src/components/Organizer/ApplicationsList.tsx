import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStart, fetchSuccess, fetchFailure, updateStatusSuccess } from '../../store/slices/applicationsSlice';
import { mockApi } from '../../store/api/mockApi';
import { loadFestivals, loadClubs } from '../../store/thunks';
import { APPLICATION_STATUS } from '../../utils/constants';
import { ApplicationReview } from './ApplicationReview';
import type { Application } from '../../types';

export const ApplicationsList = () => {
  const dispatch = useAppDispatch();
  const { applications, isLoading, error } = useAppSelector((state) => state.applications);
  const { festivals } = useAppSelector((state) => state.festivals);
  const { clubs } = useAppSelector((state) => state.clubs);

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      if (festivals.length === 0) dispatch(loadFestivals() as any);
      if (clubs.length === 0) dispatch(loadClubs() as any);

      dispatch(fetchStart());
      try {
        const data = await mockApi.getApplications();
        dispatch(fetchSuccess(data));
      } catch (err) {
        dispatch(fetchFailure(err instanceof Error ? err.message : 'Ошибка загрузки'));
      }
    };

    loadData();
  }, [dispatch, festivals.length, clubs.length]);

  const handleApprove = async (notes: string) => {
    if (!selectedApp) return;
    setReviewLoading(true);
    try {
      const updated = await mockApi.updateApplicationStatus(selectedApp.id, APPLICATION_STATUS.APPROVED, notes);
      dispatch(updateStatusSuccess(updated));
      setSelectedApp(null);
    } catch (err) {
      console.error('Ошибка:', err);
    } finally {
      setReviewLoading(false);
    }
  };

  const handleReject = async (notes: string) => {
    if (!selectedApp) return;
    setReviewLoading(true);
    try {
      const updated = await mockApi.updateApplicationStatus(selectedApp.id, APPLICATION_STATUS.REJECTED, notes);
      dispatch(updateStatusSuccess(updated));
      setSelectedApp(null);
    } catch (err) {
      console.error('Ошибка:', err);
    } finally {
      setReviewLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      [APPLICATION_STATUS.PENDING]: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'На рассмотрении' },
      [APPLICATION_STATUS.APPROVED]: { bg: 'bg-green-100', text: 'text-green-800', label: 'Одобрена' },
      [APPLICATION_STATUS.REJECTED]: { bg: 'bg-red-100', text: 'text-red-800', label: 'Отклонена' },
    };
    const config = statusMap[status] || statusMap[APPLICATION_STATUS.PENDING];
    return <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-semibold`}>{config.label}</span>;
  };

  const getFestivalName = (id: string) => festivals.find((f) => f.id === id)?.name || 'Неизвестный фестиваль';
  const getClubName = (id: string) => clubs.find((c) => c.id === id)?.name || 'Неизвестный клуб';

  if (isLoading) return <div className="text-center py-8">Загрузка заявок...</div>;

  return (
    <div className="bg-history-parchment rounded-none shadow-none p-6 border border-history-bronze relative">
      <h2 className="text-2xl font-serif font-bold mb-6 text-history-ink border-b border-history-bronze pb-2">
        Заявки на участие
      </h2>

      {error && <div className="bg-history-burgundy/10 border border-history-burgundy text-history-burgundy px-4 py-3 mb-4">{error}</div>}

      {applications.length === 0 ? (
        <p className="text-history-ink/60 text-center py-8 font-serif italic">Заявок не найдено</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border border-history-bronze bg-white/40 p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-serif font-bold text-xl">{getClubName(app.clubId)}</h3>
                  <p className="text-sm italic">{getFestivalName(app.festivalId)}</p>
                </div>
                {getStatusBadge(app.status)}
              </div>
              <p className="text-history-ink mb-6">{app.description}</p>
              <div className="flex justify-between items-center border-t border-history-bronze/20 pt-4">
                <span className="text-xs text-history-ink/50 uppercase tracking-wider">
                  Подана: {new Date(app.submittedAt).toLocaleDateString('ru-RU')}
                </span>
                {app.status === APPLICATION_STATUS.PENDING && (
                  <button onClick={() => setSelectedApp(app)} className="px-8 py-2.5 border border-history-bronze bg-history-bronze/5 hover:bg-history-bronze hover:text-white transition-all font-bold uppercase text-[11px]">
                    Рассмотреть
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl">
            <button 
              onClick={() => setSelectedApp(null)}
              className="absolute -top-10 right-0 font-serif italic text-white hover:text-history-parchment"
            >
              Закрыть X
            </button>
            <ApplicationReview
              application={selectedApp}
              onApprove={handleApprove}
              onReject={handleReject}
              onClose={() => setSelectedApp(null)}
              isLoading={reviewLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};