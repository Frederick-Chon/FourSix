import { useEffect, useState } from 'react';
import {
  getStoredBrews,
  deleteBrew,
  updateBrew,
  getStoredCoffees,
} from '@/utils/storage';
import type { Brew } from '@/types/brew';
import type { CoffeeBean } from '@/types/coffee';

const Notes = () => {
  const [brews, setBrews] = useState<Brew[]>([]);
  const [beans, setBeans] = useState<CoffeeBean[]>([]);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);

  useEffect(() => {
    setBrews(getStoredBrews());
    setBeans(getStoredCoffees());
  }, []);

  const handleDelete = (id: string) => {
    deleteBrew(id);
    setBrews((prev) => prev.filter((b) => b.id !== id));
  };

  const handleNoteChange = (id: string, value: string) => {
    setBrews((prev) =>
      prev.map((brew) => (brew.id === id ? { ...brew, notes: value } : brew))
    );
  };

  const handleSaveNote = (brew: Brew) => {
    updateBrew(brew);
    setLastSavedId(brew.id);
    setTimeout(() => setLastSavedId(null), 2000);
  };

  const getBeanName = (brew: Brew) => {
    const bean = beans.find((b) => b.id === brew.beanId);
    return bean ? `${bean.name} – ${bean.roaster}` : 'Unknown Bean';
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Brew History</h1>
      {brews.length === 0 ? (
        <p>No brews yet. Start brewing!</p>
      ) : (
        <ul className="space-y-3">
          {brews.map((brew) => (
            <li
              key={brew.id}
              className="p-4 rounded-xl border shadow space-y-2"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {new Date(brew.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {brew.size}, {brew.balance}, {brew.strength}
                  </p>
                  <p className="text-sm text-yellow-600">{getBeanName(brew)}</p>
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

              <textarea
                value={brew.notes || ''}
                onChange={(e) => handleNoteChange(brew.id, e.target.value)}
                placeholder="Add notes about this brew..."
                className="w-full mt-2 rounded border px-3 py-2 text-sm text-white-800"
              />

              <button
                onClick={() => handleSaveNote(brew)}
                className="text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
              >
                Save Note
              </button>
              {lastSavedId === brew.id && (
                <p className="text-sm text-green-400 mt-1">Note saved!</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
