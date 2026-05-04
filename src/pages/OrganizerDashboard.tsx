import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { FestivalList } from '../components/Organizer/FestivalList';
import { ApplicationsList } from '../components/Organizer/ApplicationsList';
import { useAppDispatch } from '../store/hooks';
import { loadFestivals, loadClubs } from '../store/thunks';

export const OrganizerDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadFestivals() as any);
    dispatch(loadClubs() as any);
  }, [dispatch]);

  // Определяем, какая вкладка активна
  const isApplications = location.pathname.includes('/organizer/applications');

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 text-history-ink">
        {/* Шапка дэшборда */}
        <header className="mb-8 border-b border-history-bronze pb-4">
          <h1 className="text-4xl">
            Кабинет Организатора
          </h1>
          
          <div className="mt-6 flex gap-4">            
            {/* Кнопка создания */}
            <button
              onClick={() => navigate('/organizer/festivals/create')}
              className="ml-auto bg-history-burgundy text-history-parchment px-6 py-2 rounded-sm shadow-sm hover:bg-history-burgundy-hover transition-colors border border-history-burgundy font-bold"
            >
              📜 Учредить новый фестиваль
            </button>
          </div>
        </header>

        {/* Контент */}
        <main className="bg-history-parchment p-6 border border-history-bronze/30 rounded-sm shadow-sm">
          {isApplications ? <ApplicationsList /> : <FestivalList />}
        </main>
      </div>
    </Layout>
  );
};