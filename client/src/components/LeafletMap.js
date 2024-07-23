import { color } from '@chakra-ui/react';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export default function LeafletMap({ position }) {
	const { routeColorsById } = useSelector((state) => {
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
