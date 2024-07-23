import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';

import { Box, Link, Avatar, Wrap, WrapItem } from '@chakra-ui/react';
import MTAEntrancesComponent from './MTAEntrances';
import { selectRoute } from '../actions/routes';

const MTARoutesComponent = () => {
	const dispatch = useDispatch();
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
									dispatch(selectRoute(route.route_id));
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
			{selectedRouteId && (
				<MTAEntrancesComponent routeID={selectedRouteId} />
			)}
		</Box>
	);
};

export default MTARoutesComponent;
