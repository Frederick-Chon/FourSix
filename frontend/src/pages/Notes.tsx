import { useEffect, useState } from 'react';
import { getStoredBrews, deleteBrew } from '@/utils/storage';
import type { Brew } from '@/types/brew';

const Notes = () => {
  const [brews, setBrews] = useState<Brew[]>([]);

  useEffect(() => {
    setBrews(getStoredBrews());
  }, []);

  const handleDelete = (id: string) => {
    deleteBrew(id);
    setBrews((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Brew History</h1>
      {brews.length === 0 ? (
        <p>No brews yet. Start brewing!</p>
      ) : (
        <ul className="space-y-3">
          {brews.map((brew) => (
            <li key={brew.id} className="p-4 rounded-xl border shadow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">
                    {new Date(brew.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {brew.size}, {brew.balance}, {brew.strength}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(brew.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              </div>
              <p>
                Coffee: {brew.coffeeGrams}g | Water: {brew.waterGrams}g
              </p>
              {brew.notes && (
                <p className="mt-2 text-gray-700 italic">{brew.notes}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
