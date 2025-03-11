import { useEffect, useState } from 'react';

const TestAPI = () => {
  const [data, setData] = useState<string>('Loading...');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        console.log('API Response: ', data);
        setData(JSON.stringify(data, null, 2));
      })
      .catch((error) => {
        console.error('Error fetching API: ', error);
        setData('Error fetching API');
      });
  }, []);

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold">API Response:</h2>
      <pre className="bg-gray-800 p-3 rounded">{data}</pre>
    </div>
  );
};

export default TestAPI;
