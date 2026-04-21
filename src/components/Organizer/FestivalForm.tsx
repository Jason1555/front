import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStart, createSuccess, fetchFailure } from '../../store/slices/festivalsSlice';
import { mockApi } from '../../store/api/mockApi';
import { FESTIVAL_STATUS } from '../../utils/constants';
import type { Festival } from '../../types';

export const FestivalForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, error } = useAppSelector((state) => state.festivals);

  const [formData, setFormData] = useState({
    name: '',
    epoch: '',
    date: '',
    location: '',
    requirementsFileUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    dispatch(fetchStart());

    try {
      const newFestival: Omit<Festival, 'id' | 'createdAt'> = {
        ...formData,
        organizerId: user.id,
        status: FESTIVAL_STATUS.DRAFT,
      };

      const festival = await mockApi.createFestival(newFestival);
      dispatch(createSuccess(festival));
      navigate('/organizer/festivals');
    } catch (err) {
      dispatch(fetchFailure(err instanceof Error ? err.message : 'Ошибка создания фестиваля'));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Создать новый фестиваль</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Название фестиваля"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Эпоха</label>
          <input
            type="text"
            name="epoch"
            value={formData.epoch}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Например: IX век, XII-XIII века"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Место</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Город, регион"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL файла требований
          </label>
          <input
            type="url"
            name="requirementsFileUrl"
            value={formData.requirementsFileUrl}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/requirements.pdf"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
          >
            {isLoading ? 'Создание...' : 'Создать фестиваль'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/organizer/festivals')}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};