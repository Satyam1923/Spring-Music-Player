// lib/jioSaavan.ts
export async function fetchSongs(song: string) {
    const res = await fetch(`/api/songs?song=${encodeURIComponent(song)}`);
    
    if (!res.ok) {
      throw new Error(`Error fetching songs: ${res.statusText}`);
    }
  
    const data = await res.json();
    return data;
  }
  