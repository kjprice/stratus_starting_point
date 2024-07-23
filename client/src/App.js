import { doUntil } from 'async';
import React, { useEffect, useState } from 'react';
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
import theme from './theme';

const queryClient = new QueryClient();

export default function App({ Component }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={theme}>
				<NavbarComponent />
				<LeafletMapComponent
					h={'250px'}
					w={'100%'}
					bg="black"
					position={[40.7812, -73.9665]}
				/>
				<MTARoutesComponent />
			</ChakraProvider>
		</QueryClientProvider>
	);
}
