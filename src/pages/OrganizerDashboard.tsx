import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { FestivalList } from '../components/Organizer/FestivalList';
import { ApplicationsList } from '../components/Organizer/ApplicationsList';
import { useAppDispatch } from '../store/hooks';
import { loadFestivals, loadClubs } from '../store/thunks';

export const OrganizerDashboard = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadFestivals() as any);
    dispatch(loadClubs() as any);
  }, [dispatch]);

  const renderContent = () => {
    if (location.pathname.includes('/organizer/applications')) {
      return <ApplicationsList />;
    }
    return <FestivalList />;
  };

  return <Layout>{renderContent()}</Layout>;
};