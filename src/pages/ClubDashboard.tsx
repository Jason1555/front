import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { ClubProfile } from '../components/Club/ClubProfile';
import { FestivalCatalog } from '../components/Club/FestivalCatalog';
import { MyApplications } from '../components/Club/MyApplications';
import { useAppDispatch } from '../store/hooks';
import { loadClubs, loadFestivals } from '../store/thunks';

export const ClubDashboard = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Загружаем клубы и фестивали при монтировании
  useEffect(() => {
    dispatch(loadClubs() as any);
    dispatch(loadFestivals() as any);
  }, [dispatch]);

  const renderContent = () => {
    if (location.pathname.includes('/club/profile')) {
      return <ClubProfile />;
    }
    if (location.pathname.includes('/club/applications')) {
      return <MyApplications />;
    }
    return <FestivalCatalog />;
  };

  return <Layout>{renderContent()}</Layout>;
};