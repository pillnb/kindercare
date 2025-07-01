"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Tip = { 
  id: number; 
  title: string; 
  content?: string; 
  image_url?: string; 
  category?: string;
};

export default function TestTipsPage() {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        console.log("Fetching tips...");
        const res = await fetch("/api/tips");
        console.log("Response status:", res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log("Raw tips data:", data);
        setTips(data);
      } catch (err) {
        console.error("Error fetching tips:", err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  if (loading) return <div className="p-8">Loading tips...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test Tips Page</h1>
      <p className="mb-4">Found {tips.length} tips</p>
      
      {tips.length === 0 ? (
        <p>No tips available</p>
      ) : (
        <div className="grid gap-4">
          {tips.map((tip) => (
            <div key={tip.id} className="border p-4 rounded-lg">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
                  <Image
                    src={tip.image_url || '/image/tips/default-tip.png'}
                    alt={tip.title}
                    width={96}
                    height={96}
                    className="object-cover"
                    unoptimized={true}
                    onError={(e) => {
                      console.log('Image failed to load:', tip.image_url);
                      const target = e.target as HTMLImageElement;
                      target.src = '/image/tips/default-tip.png';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{tip.title}</h3>
                  <p className="text-sm text-gray-600">Category: {tip.category}</p>
                  <p className="text-sm text-gray-600">Image URL: {tip.image_url}</p>
                  <p className="text-sm mt-2">{tip.content?.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
