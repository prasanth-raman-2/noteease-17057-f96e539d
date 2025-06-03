import React from 'react';
import { Box, Flex, ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/theme';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { NoteEditor } from './NoteEditor';

const theme = extendTheme({
  colors: {
    primary: {
      500: '#4A90E2',
    },
    secondary: {
      500: '#F5F7FA',
    },
    accent: {
      500: '#FFD700',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'secondary.500',
      },
    },
  },
});

export const NoteEase: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box h="100vh" overflow="hidden">
        <Flex direction="column" h="full">
          <TopBar />
          <Flex flex={1} overflow="hidden">
            <Sidebar />
            <NoteEditor />
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
