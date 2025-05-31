
import { useParams, Link } from 'react-router-dom';
import { getMajlisById } from '../storage';
import { useState } from 'react';

const MajlisDetailPage = () => {
  const { id } = useParams();
  const majlis = getMajlisById(id);

  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem(`chat_${id}`)) || []);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const newMessages = [...messages, { text: message, time: new Date().toLocaleTimeString() }];
    setMessages(newMessages);
    localStorage.setItem(`chat_${id}`, JSON.stringify(newMessages));
    setMessage('');
  };

  if (!majlis) return <p>المجلس غير موجود</p>;

  return (
    <div className="p-4 max-w-md mx-auto text-right">
      <h1 className="text-2xl font-bold">{majlis.title}</h1>
      <p>{majlis.time}</p>
      <p>{majlis.description}</p>
      
      <h2 className="mt-4 text-lg font-semibold">المحادثة المباشرة</h2>
      <div className="bg-gray-100 p-2 rounded h-40 overflow-y-scroll mb-2">
        {messages.map((m, idx) => (
          <div key={idx} className="mb-1"><b>{m.time}:</b> {m.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="أكتب رسالة..."
        className="w-full p-2 border rounded"
      />
      <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded mt-2">إرسال</button>

      <Link to={`/majlis/${id}/join`} className="bg-green-700 text-white px-4 py-2 rounded mt-4 inline-block">
        انضم للمجلس
      </Link>
    </div>
  );
};

export default MajlisDetailPage;
