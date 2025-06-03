import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  HStack,
  Icon,
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
      bg="white"
      borderLeft="1px"
      borderColor="gray.200"
    >
      <VStack align="stretch" spacing="4">
        <HStack spacing="4">
          <Input
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="Note title"
            size="lg"
            fontWeight="bold"
          />
          <Select
            value={category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
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
          borderColor="gray.200"
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
        <HStack spacing="4" justify="flex-end">
          <Button
            leftIcon={<Icon as={FiTrash2} />}
            colorScheme="red"
            variant="outline"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            leftIcon={<Icon as={FiSave} />}
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
