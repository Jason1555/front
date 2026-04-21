import { useState } from 'react';
import type { Application } from '../../types';

interface ApplicationReviewProps {
  application: Application;
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

export const ApplicationReview = ({
  application,
  onApprove,
  onReject,
  onClose,
  isLoading,
}: ApplicationReviewProps) => {
  const [notes, setNotes] = useState('');
  // const [action, setAction] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = async () => {
  await onApprove(notes);
  onClose(); // Закроет окно автоматически после успеха
};

const handleReject = async () => {
  await onReject(notes);
  onClose(); // Закроет окно автоматически после успеха
};

  return (
    <div className="bg-history-parchment border border-history-bronze/30 p-8 shadow-2xl rounded-sm max-w-2xl mx-auto">
      <h3 className="font-serif text-2xl text-history-burgundy border-b border-history-bronze/50 pb-4 mb-6 uppercase tracking-widest">
        Рассмотрение заявки
      </h3>

      <div className="space-y-6 mb-8">
        {application.documents.map((doc) => (
          <div key={doc.id} className="p-4 bg-white/50 border border-history-bronze/20">
            <p className="font-bold text-history-ink">{doc.name}</p>
            <p className="text-[10px] uppercase text-history-bronze mb-2">{doc.type}</p>
            {doc.type === 'photo' ? (
              <img src={doc.url} alt={doc.name} className="max-w-xs rounded-sm border border-history-bronze/20" />
            ) : (
              <a href={doc.url} target="_blank" rel="noreferrer" className="text-history-burgundy hover:underline text-sm">{doc.url}</a>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-[10px] uppercase tracking-widest text-history-bronze mb-2">Комментарий организатора</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-white border border-history-bronze/30 p-4 focus:ring-1 focus:ring-history-burgundy outline-none font-sans"
          rows={4}
          placeholder="Ваше решение..."
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleApprove}
          disabled={isLoading}
          className="flex-1 bg-history-burgundy text-history-parchment py-3 uppercase tracking-[0.2em] font-bold text-sm hover:bg-[#6b232d] transition-all"
        >
          {isLoading ? '...' : 'Одобрить'}
        </button>
        <button
          onClick={handleReject}
          disabled={isLoading}
          className="flex-1 border border-history-burgundy text-history-burgundy py-3 uppercase tracking-[0.2em] font-bold text-sm hover:bg-history-burgundy hover:text-history-parchment transition-all"
        >
          {isLoading ? '...' : 'Отклонить'}
        </button>
      </div>
    </div>
  );
};