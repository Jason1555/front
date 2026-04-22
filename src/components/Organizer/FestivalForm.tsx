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
      // РЕЖИМ РЕДАКТИРОВАНИЯ
      result = await mockApi.updateFestival(festival.id, formData);
      dispatch(updateSuccess(result)); // Убедитесь, что такой экшен есть в slice
    } else {
      // РЕЖИМ СОЗДАНИЯ
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
    <div className="max-w-2xl mx-auto my-10 p-8 bg-history-parchment border-2 border-[#8b5a2b] shadow-2xl rounded-sm font-serif">
      <h2 className="text-3xl font-bold text-[#4a2c1a] mb-6 border-b-2 border-[#8b5a2b] pb-2 text-center italic">
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
            <label className="block text-sm font-bold text-[#4a2c1a] mb-1 uppercase tracking-wider">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-[#fffaf0] border border-[#8b5a2b] rounded-sm focus:ring-2 focus:ring-[#8b5a2b] focus:outline-none transition-shadow"
            />
          </div>
        ))}

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-[#8b5a2b] hover:bg-[#6d4622] text-history-parchment font-bold py-3 rounded-sm transition-all border-2 border-[#4a2c1a] shadow-md"
          >
            {isLoading ? 'Чернило сохнет...' : 'Утвердить указ'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/organizer/festivals')}
            className="flex-1 bg-[#d2b48c] hover:bg-[#c1a070] text-[#4a2c1a] font-bold py-3 rounded-sm transition-all border-2 border-[#8b5a2b]"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};