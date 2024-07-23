import React, { useState, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { Box, Link, Avatar, Wrap, WrapItem } from '@chakra-ui/react';
import MTAEntrancesComponent from './MTAEntrances';
import { selectRoute } from '../actions/routes';
import fetchSelectedRoute from '../fetchSelectedRoute';

const MTARoutesComponent = () => {
	const fetchAndSetRoute = useCallback(fetchSelectedRoute);
	const { error, routes, selectedRouteId } = useSelector((state) => {
		return state.routes;
	});
	if (error) return 'An error has occurred: ' + error.message;
	if (!routes) {
		return 'Loading...';
	}
	return (
		<Box>
			<Wrap>
				{routes.map((route, tid) => {
					return (
						<WrapItem key={`route${route.route_id}`}>
							<Link
								onClick={() => {
									fetchAndSetRoute(route.route_id);
								}}
							>
								<Avatar
									name={`${route.route_short_name[0]} ${
										!!route.route_short_name[1]
											? route.route_short_name[1]
											: ''
									}`}
									border="1px solid black"
									color="white"
									bgColor={`#${route.route_color}`}
								/>
							</Link>
						</WrapItem>
					);
				})}
			</Wrap>
			<MTAEntrancesComponent />
		</Box>
	);
};

export default MTARoutesComponent;
