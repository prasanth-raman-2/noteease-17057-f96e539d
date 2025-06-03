import React from 'react';
import {
  Box,
  Stack,
  Text,
  Badge,
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
      <Stack spacing={0} align="stretch">
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
            <Text
              fontWeight="medium"
              mb={2}
              isTruncated
            >
              {note.title}
            </Text>
            <Text
              fontSize="sm"
              color="gray.600"
              isTruncated
            >
              {note.content}
            </Text>
            {note.category && (
              <Badge
                mt={2}
                colorScheme="blue"
                variant="subtle"
              >
                {getCategoryName(note.category)}
              </Badge>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
