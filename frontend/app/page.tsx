"use client";

import { useState, useEffect } from "react";
import Footer from '@/components/Footer';

export default function Home() {
  const [data, setData] = useState<any>({ rpm: null, error: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRpm = async () => {
      try {
        const res = await fetch("/api/rpm/latest");
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setData({ error: String(error) });
        setLoading(false);
      }
    };

    fetchRpm(); // fetch immediately on mount
    const interval = setInterval(fetchRpm, 500); // then every 1 second

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const rpmValue = Number(data?.latest);
  const display = Number.isFinite(rpmValue) ? Math.round(rpmValue) : "—";

  return (
    <main>
      <div className="text-center py-8 space-y-2">
        <h1 className="font-bold text-2xl">Current RPM</h1>
        <p className="text-9xl py-8">{data?.error ? `Error: ${data.error}` : display}</p>
        {loading && <p className="text-gray-500">Loading...</p>}
      </div>
    </main>
  );
}
