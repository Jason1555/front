import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStart, createSuccess, fetchFailure } from '../../store/slices/applicationsSlice';
import { mockApi } from '../../store/api/mockApi';
import type { ApplicationDocument } from '../../types';

export const ApplicationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [linkUrl, setLinkUrl] = useState('');
  const { festivalId } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, error } = useAppSelector((state) => state.applications);
  const { currentClub } = useAppSelector((state) => state.clubs);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    description: '',
  });

  const [documents, setDocuments] = useState<ApplicationDocument[]>([]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!festivalId || !user || !currentClub) return;

    dispatch(fetchStart());

    try {
      const application = await mockApi.createApplication({
        festivalId,
        clubId: currentClub.id,
        status: 'pending',
        documents,
        description: formData.description,
      });

      dispatch(createSuccess(application));
      navigate('/club/applications');
    } catch (err) {
      dispatch(fetchFailure(err instanceof Error ? err.message : 'Ошибка отправки заявки'));
    }
  };

  const addLink = () => {
  if (linkUrl) {
    const doc: ApplicationDocument = {
      id: `link-${Date.now()}`,
      name: 'Внешняя ссылка на фото',
      type: 'photo', // Или 'document'
      url: linkUrl,
      uploadedAt: new Date().toISOString(),
    };
    setDocuments((prev) => [...prev, doc]);
    setLinkUrl(''); // Очищаем поле
  }
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files) {
    const newFiles = Array.from(e.target.files).map((file) => ({
      id: `doc-${Date.now()}-${Math.random()}`,
      name: file.name,
      type: 'photo' as const, // Тип фото
      url: URL.createObjectURL(file), // Временная ссылка для отображения
      uploadedAt: new Date().toISOString(),
    }));
    
    setDocuments((prev) => [...prev, ...newFiles]);
  }
};

  return (
  <div className="max-w-2xl mx-auto p-10 bg-history-parchment border border-history-bronze/30 shadow-2xl rounded-sm">
    <h2 className="text-3xl font-serif font-bold text-history-ink border-b-2 border-history-burgundy pb-6 mb-8 uppercase tracking-widest text-center">
      Подача заявки на фестиваль
    </h2>

    {error && (
      <div className="bg-history-burgundy/20 border border-history-burgundy text-history-burgundy px-4 py-3 rounded-sm mb-6 font-serif">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-8 font-sans">
      {/* Описание */}
      <div className="w-full">
        <label className="block text-[10px] uppercase tracking-widest text-history-bronze mb-3">
          Описание участия
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleDescriptionChange}
          required
          rows={6} // Увеличил для удобства
          className="w-full bg-white border border-history-bronze/40 p-4 text-history-ink focus:border-history-burgundy focus:ring-1 focus:ring-history-burgundy outline-none resize-y"
          placeholder="Введите подробное описание..."
        />
      </div>

      {/* Секция документов */}
      <div className="border-t border-history-bronze/20 pt-8">
        <h3 className="font-serif text-lg text-history-burgundy mb-6">Галерея и документы</h3>
        
        <div className="space-y-6">
          {/* Поле для ссылки */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-history-bronze mb-2">Ссылка на ресурс (фотоальбом)</label>
            <div className="flex gap-2">
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="flex-1 bg-white border border-history-bronze/30 p-3 outline-none focus:border-history-burgundy"
                placeholder="https://..."
              />
              <button 
                type="button" 
                onClick={addLink}
                className="bg-history-ink text-white px-6 uppercase text-[10px] font-bold hover:bg-black transition-all"
              >
                Добавить ссылку
              </button>
            </div>
          </div>

          {/* Кнопка для файлов */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />

          {/* Ваша кнопка, которая теперь открывает проводник */}
          <div className="border-2 border-dashed border-history-bronze/30 p-8 text-center hover:border-history-burgundy transition-all">
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()} // Программный клик
              className="text-history-bronze hover:text-history-burgundy uppercase text-xs tracking-widest"
            >
              + Прикрепить файлы фотографий
            </button>
            <p className="text-[10px] text-history-bronze/60 mt-2">можно выбрать сразу много файлов</p>
          </div>
        </div>

        {/* Список прикрепленных */}
        {documents.length > 0 && (
          <div className="mt-8 space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex justify-between items-center p-3 bg-history-ink/5 border border-history-bronze/10">
                <span className="text-xs text-history-ink truncate max-w-50">{doc.name}</span>
                <button type="button" onClick={() => removeDocument(doc.id)} className="text-history-burgundy text-[10px] uppercase font-bold">Удалить</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Кнопки */}
      <div className="flex gap-4 pt-8 border-t border-history-bronze/20">
        {/* Кнопка Отмены */}
        <button
          type="button"
          onClick={() => navigate('/club/festivals')} // Или другой путь возврата
          className="px-8 py-4 border border-history-bronze text-history-bronze uppercase tracking-[0.2em] font-bold text-sm hover:bg-history-bronze hover:text-history-parchment transition-all"
        >
          Отмена
        </button>

        {/* Кнопка Отправки */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-history-burgundy text-history-parchment py-4 uppercase tracking-[0.3em] font-bold text-sm hover:bg-[#6b232d] transition-all shadow-md disabled:opacity-50"
        >
          {isLoading ? 'Отправка...' : 'Отправить в летопись'}
        </button>
      </div>
    </form>
  </div>
);
};