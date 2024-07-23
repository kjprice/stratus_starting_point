import React from 'react';

import {
	chakra,
	Box,
	Flex,
	useColorModeValue,
	VisuallyHidden,
	HStack,
	Button,
	useDisclosure,
	VStack,
	IconButton,
	CloseButton,
} from '@chakra-ui/react';
import { AiOutlineMenu } from 'react-icons/ai';

export default function Gslr() {
	const bg = useColorModeValue('white', 'gray.800');
	const mobileNav = useDisclosure();

	return (
		<React.Fragment>
			<chakra.header
				bg={bg}
				w="full"
				px={{ base: 2, sm: 4 }}
				py={4}
				shadow="md"
			>
				<Flex
					alignItems="center"
					justifyContent="space-between"
					mx="auto"
				>
					<Flex>
						<chakra.a
							href="/"
							title="Starting Point Project"
							display="flex"
							alignItems="center"
						>
							<VisuallyHidden>StartingPoint - MTA</VisuallyHidden>
						</chakra.a>
						<chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
							StartingPoint - MTA
						</chakra.h1>
					</Flex>
					<HStack display="flex" alignItems="center" spacing={1}>
						<Box display={{ base: 'inline-flex', md: 'none' }}>
							<IconButton
								display={{ base: 'flex', md: 'none' }}
								aria-label="Open menu"
								fontSize="20px"
								color={useColorModeValue('gray.800', 'inherit')}
								variant="ghost"
								icon={<AiOutlineMenu />}
								onClick={mobileNav.onOpen}
							/>

							<VStack
								pos="absolute"
								top={0}
								left={0}
								right={0}
								display={mobileNav.isOpen ? 'flex' : 'none'}
								flexDirection="column"
								p={2}
								pb={4}
								m={2}
								bg={bg}
								spacing={3}
								rounded="sm"
								shadow="sm"
							></VStack>
						</Box>
					</HStack>
				</Flex>
			</chakra.header>
		</React.Fragment>
	);
}
