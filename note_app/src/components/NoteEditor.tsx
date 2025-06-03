import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  useColorModeValue,
  Select,
} from '@chakra-ui/react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { FiTrash2, FiSave } from 'react-icons/fi';
import { useNoteStore } from '../store/noteStore';

export const NoteEditor: React.FC = () => {
  const { selectedNote, updateNote, deleteNote, categories } = useNoteStore();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setCategory(selectedNote.category || '');
      try {
        const contentState = selectedNote.content
          ? convertFromRaw(JSON.parse(selectedNote.content))
          : EditorState.createEmpty().getCurrentContent();
        setEditorState(EditorState.createWithContent(contentState));
      } catch {
        setEditorState(EditorState.createEmpty());
      }
    }
  }, [selectedNote]);

  const handleSave = () => {
    if (selectedNote) {
      updateNote({
        ...selectedNote,
        title,
        category: category || undefined,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      });
    }
  };

  const handleDelete = () => {
    if (selectedNote) {
      deleteNote(selectedNote.id);
    }
  };

  const handleKeyCommand = (command: string, state: EditorState) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  if (!selectedNote) {
    return (
      <Box p={8} textAlign="center" color="gray.500">
        Select a note or create a new one
      </Box>
    );
  }

  return (
    <Box
      flex={1}
      p={6}
      bg={bgColor}
      borderLeft="1px"
      borderColor={borderColor}
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            size="lg"
            fontWeight="bold"
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
            maxW="200px"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
        </HStack>
        <Box
          borderWidth={1}
          borderColor={borderColor}
          borderRadius="md"
          p={4}
          minH="400px"
        >
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
          />
        </Box>
        <HStack spacing={4} justify="flex-end">
          <Button
            leftIcon={<FiTrash2 />}
            colorScheme="red"
            variant="outline"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            leftIcon={<FiSave />}
            colorScheme="blue"
            onClick={handleSave}
            bg="#4A90E2"
            _hover={{ bg: '#357ABD' }}
          >
            Save
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
