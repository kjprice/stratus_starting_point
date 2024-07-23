import React, { useState } from 'react';
import { useQuery } from 'react-query';

import { Box, Link, Avatar, Wrap, WrapItem } from '@chakra-ui/react';
import MTAEntrancesComponent from './MTAEntrances';

const MTARoutesComponent = () => {
	const [routeID, setRouteID] = useState();
	const { isLoading, error, data } = useQuery('routes', () =>
		fetch('/api/routes').then((res) => res.json())
	);

	if (isLoading) return 'Loading...';
	if (error) return 'An error has occurred: ' + error.message;
	return (
		<Box>
			<Wrap>
				{data.map((route, tid) => {
					return (
						<WrapItem key={`route${route.route_id}`}>
							<Link
								onClick={() => {
									setRouteID(route.route_id);
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
			<MTAEntrancesComponent routeID={routeID} />
		</Box>
	);
};

export default MTARoutesComponent;
