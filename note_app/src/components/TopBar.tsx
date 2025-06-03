import React from 'react';
import {
  Box,
  Input,
  Button,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import { useNoteStore } from '../store/noteStore';

export const TopBar: React.FC = () => {
  const { setSearchQuery, addNote } = useNoteStore();

  const handleCreateNote = () => {
    addNote({
      title: 'New Note',
      content: '',
    });
  };

  return (
    <Box
      py={4}
      px={6}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex justify="space-between" align="center">
        <Input
          placeholder="Search notes..."
          maxW="400px"
          onChange={(e) => setSearchQuery(e.target.value)}
          borderColor="gray.200"
          _hover={{ borderColor: '#4A90E2' }}
          _focus={{ borderColor: '#4A90E2', boxShadow: '0 0 0 1px #4A90E2' }}
        />
        <Button
          colorScheme="blue"
          bg="#4A90E2"
          onClick={handleCreateNote}
          _hover={{ bg: '#357ABD' }}
        >
          <Icon as={FiPlus} mr={2} />
          Create Note
        </Button>
      </Flex>
    </Box>
  );
};
