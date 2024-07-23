import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../actions/routes';

import {
	Flex,
	ButtonGroup,
	Button,
	IconButton,
	Table,
	Thead,
	Tr,
	Th,
	Td,
	Tbody,
	Link,
} from '@chakra-ui/react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import fetchMostRecentSelectedRoute from '../api/fetchSelectedRoute';

const RESULTS_PER_PAGE = 20;
const PaginationButton = ({ text, onclick }) => {
	return <Button onClick={onclick}>{text}</Button>;
};
const Pagination = () => {
	const dispatch = useDispatch();
	const changePage = (newPageNumber) => {
		dispatch(setPage(newPageNumber));
		fetchMostRecentSelectedRoute(newPageNumber);
	};
	const { page, selectedRoute } = useSelector((state) => {
		return state.routes;
	});

	const buttons = [];
	if (page > 1) {
		buttons.push(
			<PaginationButton
				key="prev"
				text="Previous"
				onclick={() => {
					changePage(page - 1);
				}}
			/>
		);
	}
	if (selectedRoute.length === RESULTS_PER_PAGE) {
		buttons.push(
			<PaginationButton
				key="next"
				text="Next"
				onclick={() => {
					changePage(page + 1);
				}}
			/>
		);
	}
	return (
		<div>
			Page {page}
			<ButtonGroup variant="solid" size="sm" spacing={3}>
				{buttons}
			</ButtonGroup>
		</div>
	);
};

const MTAEntrancesComponent = () => {
	const { selectedRoute } = useSelector((state) => {
		return state.routes;
	});

	if (!selectedRoute) return null;
	// TODO: Implement loading and error if needed
	// if (!selectedRoute) return 'Loading...';
	// if (error) return 'An error has occurred: ' + error.message;

	const columnNames = Object.keys(selectedRoute[0]);
	return (
		<>
			<Flex w="full" alignItems="left">
				<Table
					w="full"
					bg="white"
					display={{
						base: 'block',
						md: 'table',
					}}
					sx={{
						'@media print': {
							display: 'table',
						},
					}}
				>
					<Thead
						display={{
							base: 'none',
							md: 'table-header-group',
						}}
						sx={{
							'@media print': {
								display: 'table-header-group',
							},
						}}
					>
						<Tr>
							{columnNames.map((columnName, i) => (
								<Th key={`h_${i}`}>{columnName}</Th>
							))}
						</Tr>
					</Thead>
					<Tbody
						display={{
							base: 'block',
							lg: 'table-row-group',
						}}
						sx={{
							'@media print': {
								display: 'table-row-group',
							},
						}}
					>
						{selectedRoute.map((route, tid) => {
							return (
								<Tr
									key={tid}
									display={{
										base: 'grid',
										md: 'table-row',
									}}
									sx={{
										'@media print': {
											display: 'table-row',
										},
										gridTemplateColumns:
											'minmax(0px, 35%) minmax(0px, 65%)',
										gridGap: '10px',
									}}
								>
									{columnNames.map((columnName, index) => {
										return (
											<React.Fragment
												key={`td_${tid}${index}`}
											>
												<Td
													display={{
														base: 'table-cell',
														md: 'none',
													}}
													sx={{
														'@media print': {
															display: 'none',
														},
														textTransform:
															'uppercase',
														fontSize: 'xs',
														fontWeight: 'bold',
														letterSpacing: 'wider',
														fontFamily: 'heading',
													}}
												>
													{route[columnName]}
												</Td>
												<Td fontSize="md">
													{route[columnName]}
												</Td>
											</React.Fragment>
										);
									})}
									<Td
										display={{
											base: 'table-cell',
											md: 'none',
										}}
										sx={{
											'@media print': {
												display: 'none',
											},
											textTransform: 'uppercase',
											fontSize: 'xs',
											fontWeight: 'bold',
											letterSpacing: 'wider',
											fontFamily: 'heading',
										}}
									>
										Actions
									</Td>
									<Td>
										<ButtonGroup
											variant="solid"
											size="sm"
											spacing={3}
										>
											<Link
												href={route.route_url}
												target="_blank"
											>
												<IconButton
													colorScheme="blue"
													icon={<FaExternalLinkAlt />}
												/>
											</Link>
										</ButtonGroup>
									</Td>
								</Tr>
							);
						})}
					</Tbody>
				</Table>
				{/* TODO: #4 Use pagination */}
			</Flex>
			<Pagination />
		</>
	);
};

export default MTAEntrancesComponent;
