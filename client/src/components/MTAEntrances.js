import React from 'react';
import { useQuery } from 'react-query';

import {
	Flex,
	ButtonGroup,
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

const MTAEntrancesComponent = ({ routeID }) => {
	if (!routeID) {
		return <React.Fragment />;
	}

	const { isLoading, error, data } = useQuery(`entrances_${routeID}`, () =>
		fetch(`/api/entrances/route/${routeID}`).then((res) => res.json())
	);

	if (isLoading) return 'Loading...';
	if (error) return 'An error has occurred: ' + error.message;

	const columnNames = Object.keys(data[0]);
	return (
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
					{data.map((route, tid) => {
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
													textTransform: 'uppercase',
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
		</Flex>
	);
};

export default MTAEntrancesComponent;
