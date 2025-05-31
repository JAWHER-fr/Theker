
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const JoinMajlisPage = () => {
  const { id } = useParams();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const name = prompt("أدخل اسمك لتسجيل الحضور:");
    const attendance = JSON.parse(localStorage.getItem(`attendance_${id}`)) || [];
    attendance.push({ name, time: new Date().toLocaleTimeString() });
    localStorage.setItem(`attendance_${id}`, JSON.stringify(attendance));

    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [id]);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="p-4 max-w-md mx-auto text-right">
      <h1 className="text-2xl font-bold">انضمام لمجلس {id}</h1>
      <p>مدة الحضور: {formatTime(seconds)}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">ابدأ الذكر</button>
    </div>
  );
};

export default JoinMajlisPage;
