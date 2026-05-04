import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStart, createSuccess, fetchFailure, updateSuccess } from '../../store/slices/festivalsSlice';
import { mockApi } from '../../store/api/mockApi';
import type { Festival } from '../../types';

interface FestivalFormProps {
  festival?: Festival; // Если передан — режим редактирования
}

export const FestivalForm = ({ festival }: FestivalFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.festivals);

  const [formData, setFormData] = useState(festival || {
    name: '',
    epoch: '',
    date: '',
    location: '',
    requirementsFileUrl: '',
  });

  useEffect(() => {
    if (festival) {
      setFormData({
        name: festival.name,
        epoch: festival.epoch,
        date: festival.date,
        location: festival.location,
        requirementsFileUrl: festival.requirementsFileUrl,
      });
    }
  }, [festival]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    dispatch(fetchStart());
    
    try {
      let result;
      if (festival) {
        result = await mockApi.updateFestival(festival.id, formData);
        dispatch(updateSuccess(result));
      } else {
        result = await mockApi.createFestival({
          ...formData,
          status: 'draft',
          organizerId: user.id,
        });
        dispatch(createSuccess(result));
      }
      
      navigate('/organizer/festivals');
    } catch (err) {
      dispatch(fetchFailure('Не удалось скрепить документ печатью'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-history-parchment border border-history-bronze/30 shadow-sm rounded-sm">
      <h2 className="text-3xl mb-6 border-b border-history-bronze/50 pb-3 text-center uppercase tracking-widest">
        Учреждение нового фестиваля
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: 'Название фестиваля', name: 'name', type: 'text' },
          { label: 'Эпоха', name: 'epoch', type: 'text' },
          { label: 'Дата проведения', name: 'date', type: 'date' },
          { label: 'Место действия', name: 'location', type: 'text' },
          { label: 'URL свитка с требованиями', name: 'requirementsFileUrl', type: 'url' },
        ].map((field) => (
          <div key={field.name}>
            <label className="label-modern-history">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              required
              className="input-modern-history"
            />
          </div>
        ))}

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-history-burgundy hover:bg-history-burgundy-hover text-history-parchment font-bold py-3 rounded-sm transition-all border border-history-burgundy"
          >
            {isLoading ? 'Чернило сохнет...' : 'Утвердить указ'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/organizer/festivals')}
            className="flex-1 bg-history-parchment hover:bg-history-parchment-dark text-history-ink font-bold py-3 rounded-sm transition-all border border-history-bronze"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};
