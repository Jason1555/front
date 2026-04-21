import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-red-950 via-pink-1000 to-black p-8">
      <h1 className="text-7xl font-extrabold text-gold-500 mb-4 text-shadow-md font-serif">
        404
      </h1>
      <p className="text-3xl text-gray-300 mb-8 font-serif text-center">
        Страница не найдена
      </p>
      <Link
        to="/login"
        className="bg-dark-gold hover:bg-light-gold text-white font-semibold py-4 px-12 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};