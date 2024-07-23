import { doUntil } from 'async';
import React, { useEffect, useState, useContext } from 'react';
import { Provider } from 'react-redux';
import {
	Text,
	HStack,
	StackDivider,
	ChakraProvider,
	Box,
	Link,
} from '@chakra-ui/react';
import NavbarComponent from './components/Navbar';
import MTARoutesComponent from './components/MTARoutes';
import LeafletMapComponent from './components/LeafletMap';
import { QueryClientProvider, QueryClient } from 'react-query';
import store from './store';
import theme from './theme';
import { setRoutes, setRoutesError } from './actions/routes';

const queryClient = new QueryClient();

const fetchRoutes = () => {
	return fetch('/api/routes')
		.then((res) => res.json())
		.then((routes) => store.dispatch(setRoutes(routes)))
		.catch((e) => store.dispatch(setRoutesError(routes)));
};

export default function App({ Component }) {
	useEffect(() => {
		// TODO: #5 - fix race conditions
		// TODO: This should likely be set in thunk, saga, or use middleware api
		fetchRoutes();
	}, []);

	const state = store.getState();

	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<Provider store={store}>
					<NavbarComponent />
					<LeafletMapComponent
						h={'250px'}
						w={'100%'}
						bg="black"
						position={[40.7812, -73.9665]}
					/>
					<MTARoutesComponent />
				</Provider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}
