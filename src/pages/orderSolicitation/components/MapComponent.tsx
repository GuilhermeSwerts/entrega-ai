import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { Bike, Utensils, Home } from "lucide-react";
import { renderToString } from "react-dom/server";
import { useEffect } from "react";

// Fix for default marker icons in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons using Lucide
const createCustomIcon = (icon: React.ReactNode, color: string, bgColor: string = "white") => {
    return L.divIcon({
        html: renderToString(
            <div style={{ color, backgroundColor: bgColor }} className="p-1.5 rounded-full shadow-lg border-2 border-white flex items-center justify-center">
                {icon}
            </div>
        ),
        className: "custom-div-icon",
        iconSize: [36, 36],
        iconAnchor: [18, 18],
    });
};

const restaurantIcon = createCustomIcon(<Utensils size={20} />, "#ffffff", "#10b981"); // Green-500
const availableMotoboyIcon = createCustomIcon(<Bike size={20} />, "#64748b", "#f1f5f9"); // Slate-500 on Slate-100
const busyMotoboyIcon = createCustomIcon(<Bike className="pulse" size={20} />, "#ffffff", "#10b981"); // White on Green-500
const customerIcon = createCustomIcon(<Home size={20} />, "#ffffff", "#f97316"); // White on Orange-500

interface RoutingProps {
    waypoints: Array<[number, number]>;
}

const Routing = ({ waypoints }: RoutingProps) => {
    const map = useMap();

    useEffect(() => {
        if (!map || waypoints.length < 2) return;

        const routingControl = (L as any).Routing.control({
            waypoints: waypoints.map(wp => L.latLng(wp[0], wp[1])),
            lineOptions: {
                styles: [{ color: "#4f46e5", weight: 6, opacity: 0.8 }],
                extendToWaypoints: true,
                missingRouteTolerance: 10
            },
            show: false,
            addWaypoints: false,
            routeWhileDragging: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
        }).addTo(map);

        return () => {
            map.removeControl(routingControl);
        };
    }, [map, waypoints]);

    return null;
};

interface MapComponentProps {
    orderLocation?: [number, number];
    restaurantLocation?: [number, number];
    motoboys?: Array<{ id: string; position: [number, number]; name: string; status?: 'available' | 'busy' }>;
    route?: Array<[number, number]>;
}

export const MapComponent = ({ orderLocation, restaurantLocation, motoboys = [], route = [] }: MapComponentProps) => {
    const defaultPosition: [number, number] = [-23.5505, -46.6333]; // São Paulo default

    const center = orderLocation || restaurantLocation || (motoboys.length > 0 ? motoboys[0].position : defaultPosition);

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200">
            <MapContainer
                center={center}
                zoom={14}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {restaurantLocation && (
                    <Marker position={restaurantLocation} icon={restaurantIcon}>
                        <Popup>
                            <div className="font-semibold text-emerald-600">Restaurante</div>
                        </Popup>
                    </Marker>
                )}

                {orderLocation && (
                    <Marker position={orderLocation} icon={customerIcon}>
                        <Popup>
                            <div className="font-semibold text-orange-600">Casa do Cliente (Pedido)</div>
                        </Popup>
                    </Marker>
                )}

                {motoboys.map((moto) => (
                    <Marker
                        key={moto.id}
                        position={moto.position}
                        icon={moto.status === 'busy' ? busyMotoboyIcon : availableMotoboyIcon}
                    >
                        <Popup>
                            <div className={`font-semibold ${moto.status === 'busy' ? 'text-emerald-600' : 'text-slate-500'}`}>
                                {moto.name}
                            </div>
                            <div className="text-xs text-slate-400">
                                {moto.status === 'busy' ? 'Em entrega' : 'Disponível'}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {route.length > 1 && (
                    <Routing waypoints={route} />
                )}
            </MapContainer>
        </div>
    );
};
