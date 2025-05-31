
import { Link } from 'react-router-dom';
import { getMajalis } from '../storage';

const HomePage = () => {
  const majalis = getMajalis();

  return (
    <div className="p-4 max-w-md mx-auto text-right">
      <h1 className="text-3xl font-bold text-green-600 mb-4">مجالس الذكر</h1>
      <Link to="/create" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">+ إنشاء مجلس</Link>
      {majalis.length === 0 ? <p>لا توجد مجالس بعد</p> : majalis.map(m => (
        <Link to={`/majlis/${m.id}`} key={m.id} className="block bg-white p-3 rounded shadow mb-2">
          <h3>{m.title}</h3>
          <p>{m.time}</p>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
