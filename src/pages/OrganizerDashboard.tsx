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
      <div className="max-w-6xl mx-auto p-6 font-serif text-[#4a2c1a]">
        {/* Шапка дэшборда */}
        <header className="mb-8 border-b-2 border-[#8b5a2b] pb-4">
          <h1 className="text-4xl font-bold">Кабинет Организатора</h1>
          
          <div className="mt-6 flex gap-4">            
            {/* Кнопка создания */}
            <button
              onClick={() => navigate('/organizer/festivals/create')}
              className="ml-auto bg-[#8b5a2b] text-[#f4e4bc] px-6 py-2 rounded-sm shadow-md hover:bg-[#6d4622] transition-colors font-bold"
            >
              📜 Учредить новый фестиваль
            </button>
          </div>
        </header>

        {/* Контент */}
        <main className="bg-[#fffaf0] p-6 border border-[#d2b48c] rounded shadow-inner">
          {isApplications ? <ApplicationsList /> : <FestivalList />}
        </main>
      </div>
    </Layout>
  );
};