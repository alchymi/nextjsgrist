"use client"; // Obligatoire pour utiliser useEffect et useState

import { useEffect, useState } from "react";

interface GristRecord {
  id: number;
  fields: Record<string, any>;
}

export default function Home() {
  const [data, setData] = useState<GristRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/grist");
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        const json = await res.json();
        setData(json.records);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Données Grist</h1>

      {loading && <p className="text-yellow-500">Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {data.map((item) => (
          <li key={item.id} className="bg-gray-800 p-3 my-2 rounded">
            {JSON.stringify(item.fields)}
          </li>
        ))}
      </ul>
    </div>
  );
}
