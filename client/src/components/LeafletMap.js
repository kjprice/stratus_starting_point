import { color } from '@chakra-ui/react';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

function StationMarker({ station }) {
	const {
		station_latitude,
		station_longitude,
		east_west_street,
		north_south_street,
	} = station;

	const crossStreet = `${north_south_street} x ${east_west_street}`;
	return (
		<Marker position={[station_latitude, station_longitude]}>
			<Popup>{crossStreet}</Popup>
		</Marker>
	);
}

function SelectedLineStations() {
	const { selectedRoute } = useSelector((state) => {
		return state.routes;
	});
	if (!selectedRoute) {
		return null;
	}

	return selectedRoute.map((entrance, i) => (
		<StationMarker key={`station_${i}`} station={entrance} />
	));
}
export default function LeafletMap({ position }) {
	const { routeColorsById, selectedRoute } = useSelector((state) => {
		return state.routes;
	});
	const { data } = useQuery('shapes', () =>
		fetch('/api/shapes').then((res) => res.json())
	);

	return (
		<MapContainer
			center={position}
			zoom={13}
			style={{ height: '40vh', width: '100wh' }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<SelectedLineStations />
			{(data || []).map((route) => {
				return route.shapes.map((shape, i) => {
					return (
						<GeoJSON
							key={`subway-lines_${i}`}
							data={shape}
							style={{
								color: routeColorsById[route.route_id] || 'red',
							}}
						/>
					);
				});
			})}
		</MapContainer>
	);
}
