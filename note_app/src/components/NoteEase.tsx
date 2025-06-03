import React from 'react';
import { Box, Flex, ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { NoteEditor } from './NoteEditor';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brandPrimary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#4A90E2',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
    brandSecondary: {
      50: '#F5F7FA',
      100: '#E4E7EB',
      200: '#CBD2D9',
      300: '#9AA5B1',
      400: '#7B8794',
      500: '#616E7C',
      600: '#52606D',
      700: '#3E4C59',
      800: '#323F4B',
      900: '#1F2933',
    },
    brandAccent: {
      50: '#FFF9E6',
      100: '#FFF3CC',
      200: '#FFE799',
      300: '#FFDB66',
      400: '#FFCF33',
      500: '#FFD700',
      600: '#CCA800',
      700: '#997D00',
      800: '#665300',
      900: '#332A00',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brandSecondary.50',
      },
    },
  },
});

export const NoteEase: React.FC = () => {
  return (
    <ChakraProvider resetCSS theme={theme}>
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
