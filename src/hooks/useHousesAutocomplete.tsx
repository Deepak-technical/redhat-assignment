// src/hooks/useHousesAutocomplete.ts
import { useState, useEffect } from "react";

interface House {
  name: string;
  region: string;
}

// Cache houses globally to avoid refetching
let cachedHouses: House[] = [];

export function useHousesAutocomplete(searchTerm: string) {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllHouses = async () => {
      setLoading(true);
      try {
        // Only fetch if cache is empty
        if (cachedHouses.length === 0) {
          const response = await fetch(
            "https://www.anapioficeandfire.com/api/houses?pageSize=50"
          );
          if (!response.ok) throw new Error("Failed to fetch houses");
          const data = await response.json();
          cachedHouses = data.map((h: any) => ({
            name: h.name,
            region: h.region || "Unknown",
          }));
        }
      } catch (err) {
        setError("Failed to load houses");
      } finally {
        setLoading(false);
      }
    };

    fetchAllHouses();
  }, []);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setHouses([]);
      return;
    }

    // Filter cached houses locally
    const filtered = cachedHouses.filter(house =>
      house.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setHouses(filtered);
  }, [searchTerm]); // Now reacts directly to searchTerm changes

  return { houses, loading, error };
}