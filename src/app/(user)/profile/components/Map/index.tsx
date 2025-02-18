import { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { AreaOption } from "@/types/biteship";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface Coordinate {
  lat: number;
  lng: number;
}

interface MapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedArea: AreaOption | null;
  selectedLatitude: number | null;
  selectedLongitude: number | null;
}

const Map: React.FC<MapProps> = ({
  onLocationSelect,
  selectedArea,
  selectedLatitude,
  selectedLongitude,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);
  const [center, setCenter] = useState<Coordinate>({
    lat: -6.2088, // Jakarta as default
    lng: 106.8456,
  });
  const [markerPosition, setMarkerPosition] = useState<Coordinate | null>(null);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      onLocationSelect(lat, lng);
    }
  };

  const geocodeAddress = (address: string) => {
    if (!isLoaded || typeof window === "undefined" || !window.google) {
      console.error("Google Maps API is not loaded yet.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (
        status === "OK" &&
        results &&
        results.length > 0 &&
        results[0].geometry?.location
      ) {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        setCenter({ lat, lng });
        mapRef.current?.panTo({ lat, lng });
      } else {
        console.error("Geocode failed:", status, results);
      }
    });
  };

  useEffect(() => {
    if (selectedArea && isLoaded) {
      if (selectedLatitude && selectedLongitude) {
        setMarkerPosition({
          lat: selectedLatitude,
          lng: selectedLongitude,
        });
      }

      geocodeAddress(selectedArea.name);
    }
  }, [selectedArea, isLoaded, selectedLatitude, selectedLongitude]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onClick={handleMapClick}
      onLoad={(map) => {
        mapRef.current = map;
      }}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
};

export default Map;
