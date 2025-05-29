import { useState, useEffect } from 'react';
import type { CoffeeBean } from '@/types/coffee';
import {
  fetchCoffees,
  addCoffee,
  updateCoffee,
  deleteCoffee,
} from '@/utils/api';

const Coffee = () => {
  const [beans, setBeans] = useState<CoffeeBean[]>([]);
  const [name, setName] = useState('');
  const [roaster, setRoaster] = useState('');
  const [origin, setOrigin] = useState('');
  const [process, setProcess] = useState('');
  const [roastDate, setRoastDate] = useState('');
  const [weight, setWeight] = useState(250);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const loadBeans = async () => {
      try {
        const result = await fetchCoffees();
        setBeans(result);
      } catch (err) {
        console.error('Failed to fetch beans:', err);
      }
    };

    loadBeans();
  }, []);

  const handleAddOrUpdateCoffee = async () => {
    const beanData = {
      userId: 'user-1',
      name,
      roaster,
      origin,
      process,
      roastDate,
      totalWeight: weight,
    };

    try {
      if (editingId) {
        const updated = await updateCoffee(editingId, beanData);
        setBeans((prev) => prev.map((b) => (b.id === editingId ? updated : b)));
        setEditingId(null);
      } else {
        const newBean = await addCoffee(beanData);
        setBeans((prev) => [newBean, ...prev]);
      }

      setName('');
      setRoaster('');
      setOrigin('');
      setProcess('');
      setRoastDate('');
      setWeight(250);
    } catch (err) {
      console.error('Failed to save coffee bean:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCoffee(id);
      setBeans((prev) => prev.filter((bean) => bean.id !== id));
    } catch (err) {
      console.error('Failed to delete coffee bean:', err);
    }
  };

  const formatDateDiff = (dateStr: string, label: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days < 7
      ? `${label} ${days} days ago`
      : `${label} ${Math.floor(days / 7)} weeks ago`;
  };

  const openBeans = beans.filter((b) => b.gramsRemaining > 0 && !b.opened);
  const newBeans = beans.filter(
    (b) => b.gramsRemaining === b.totalWeight && !b.opened
  );
  const finishedBeans = beans.filter((b) => b.gramsRemaining <= 0 || b.opened);

  const BeanCard = ({ bean }: { bean: CoffeeBean }) => (
    <li className="p-4 rounded-xl border bg-zinc-800 text-white flex justify-between items-start">
      <div>
        <p className="font-semibold text-lg">{bean.name}</p>
        <p className="text-sm text-zinc-400">
          {bean.roaster} · {bean.origin}
        </p>
        <p className="text-sm text-zinc-400 italic">{bean.process}</p>
        <p className="text-sm mt-1">
          {formatDateDiff(bean.roastDate, 'Roasted')}
        </p>
        <p className="mt-2 font-medium">{bean.gramsRemaining}g remaining</p>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <button
          onClick={() => {
            setEditingId(bean.id);
            setName(bean.name);
            setRoaster(bean.roaster);
            setOrigin(bean.origin);
            setProcess(bean.process || '');
            setRoastDate(bean.roastDate);
            setWeight(bean.totalWeight);
          }}
          className="text-yellow-400 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(bean.id)}
          className="text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </li>
  );

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Coffee Inventory</h1>

      {/* Form */}
      <div className="space-y-3 border rounded-xl p-4 bg-zinc-900">
        <input
          type="text"
          placeholder="Coffee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
        <input
          type="text"
          placeholder="Roaster"
          value={roaster}
          onChange={(e) => setRoaster(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
        <input
          type="text"
          placeholder="Origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
        <input
          type="text"
          placeholder="Process (e.g. Washed, Natural)"
          value={process}
          onChange={(e) => setProcess(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
        <input
          type="date"
          value={roastDate}
          onChange={(e) => setRoastDate(e.target.value)}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
        <input
          type="number"
          placeholder="Weight (g)"
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value))}
          className="w-full p-2 rounded bg-zinc-800 text-white"
        />
        <button
          onClick={handleAddOrUpdateCoffee}
          className="w-full py-2 rounded bg-green-600 text-white font-semibold"
        >
          {editingId ? 'Update Coffee' : 'Add Coffee'}
        </button>
      </div>

      {/* Sections */}
      {openBeans.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mb-2">Open</h2>
          <ul className="space-y-3">
            {openBeans.map((bean) => (
              <BeanCard key={bean.id} bean={bean} />
            ))}
          </ul>
        </section>
      )}

      {newBeans.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">New</h2>
          <ul className="space-y-3">
            {newBeans.map((bean) => (
              <BeanCard key={bean.id} bean={bean} />
            ))}
          </ul>
        </section>
      )}

      {finishedBeans.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold mt-6 mb-2">Finished</h2>
          <ul className="space-y-3">
            {finishedBeans.map((bean) => (
              <BeanCard key={bean.id} bean={bean} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Coffee;
