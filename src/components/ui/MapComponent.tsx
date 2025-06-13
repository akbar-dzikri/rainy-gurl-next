"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapComponentProps {
  address: string;
  city: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export default function MapComponent({ address, city }: MapComponentProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default coordinates (Jakarta)
  const defaultCoords: Coordinates = { lat: -6.2088, lng: 106.8456 };

  const geocodeAddress = async (fullAddress: string) => {
    if (!fullAddress.trim()) {
      setCoordinates(defaultCoords);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Using Nominatim (OpenStreetMap) geocoding service
      const query = encodeURIComponent(fullAddress);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&countrycodes=id`
      );

      if (!response.ok) {
        throw new Error("Gagal mengambil data lokasi");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        setError("Alamat tidak ditemukan");
        setCoordinates(defaultCoords);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mencari lokasi");
      setCoordinates(defaultCoords);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fullAddress = `${address}, ${city}, Indonesia`;
    const timeoutId = setTimeout(() => {
      geocodeAddress(fullAddress);
    }, 1000); // Debounce untuk menghindari terlalu banyak request

    return () => clearTimeout(timeoutId);
  }, [address, city]);

  // Set default coordinates on mount
  useEffect(() => {
    if (!coordinates) {
      setCoordinates(defaultCoords);
    }
  }, []);

  if (!coordinates) {
    return (
      <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center shadow-md">
        <div className="text-gray-500">Memuat peta...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-200 shadow-md relative">
      {loading && (
        <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded shadow-md text-sm z-[1000]">
          Mencari lokasi...
        </div>
      )}
      {error && (
        <div className="absolute top-2 left-2 bg-red-100 text-red-700 px-3 py-1 rounded shadow-md text-sm z-[1000]">
          {error}
        </div>
      )}

      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        key={`${coordinates.lat}-${coordinates.lng}`} // Force re-render when coordinates change
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lng]}>
          <Popup>
            <div className="text-center">
              <strong>Lokasi Anda</strong>
              <br />
              {address && <span>{address}</span>}
              {city && (
                <span>
                  <br />
                  {city}
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
