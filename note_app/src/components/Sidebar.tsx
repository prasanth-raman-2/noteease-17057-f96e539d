import React from 'react';
import {
  Box,
  VStack,
  Text,
  Tag,
} from '@chakra-ui/react';
import { useNoteStore } from '../store/noteStore';

export const Sidebar: React.FC = () => {
  const { notes, selectedNote, setSelectedNote, searchQuery, categories } = useNoteStore();
  
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryName = (categoryId?: string) => {
    if (!categoryId) return null;
    return categories.find((cat) => cat.id === categoryId)?.name;
  };

  return (
    <Box
      w="300px"
      h="100%"
      bg="gray.50"
      borderRight="1px"
      borderColor="gray.200"
      overflowY="auto"
    >
      <VStack spacing={0} align="stretch">
        {filteredNotes.map((note) => (
          <Box
            key={note.id}
            p={4}
            cursor="pointer"
            bg={selectedNote?.id === note.id ? 'gray.100' : 'transparent'}
            _hover={{ bg: 'gray.100' }}
            onClick={() => setSelectedNote(note)}
            borderBottom="1px"
            borderColor="gray.200"
          >
            <Text fontWeight="medium" mb={2} noOfLines={1}>
              {note.title}
            </Text>
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {note.content}
            </Text>
            {note.category && (
              <Tag size="sm" mt={2} colorScheme="blue">
                {getCategoryName(note.category)}
              </Tag>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
