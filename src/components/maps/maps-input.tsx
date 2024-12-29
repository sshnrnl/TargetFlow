import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapInputProps {
  onLocationChange: (location: { lat: number; lng: number }) => void;
  initialPosition?: { lat: number; lng: number };
}

const MapInput: React.FC<MapInputProps> = ({
  onLocationChange,
  initialPosition,
}) => {
  const defaultPosition = initialPosition || {
    lat: -6.256217520218847,
    lng: 106.63464948470104,
  };
  const [position, setPosition] = useState(defaultPosition);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onLocationChange({ lat, lng });
      },
    });

    return <Marker position={position} />;
  };

  const defaultIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = defaultIcon;

  return (
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default MapInput;
