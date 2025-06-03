import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { FiTrash2, FiSave, FiChevronDown } from 'react-icons/fi';
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
      <Stack direction="column" spacing={4}>
        <Stack direction="row" justify="space-between">
          <Input
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="Note title"
            size="lg"
            fontWeight="bold"
          />
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<Icon as={FiChevronDown} />}
              maxW="200px"
            >
              {category ? categories.find(cat => cat.id === category)?.name : 'Select category'}
            </MenuButton>
            <MenuList>
              {categories.map((cat) => (
                <MenuItem
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Stack>
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
        <Stack direction="row" justify="flex-end">
          <Button
            colorScheme="red"
            variant="outline"
            onClick={handleDelete}
          >
            <Icon as={FiTrash2} mr={2} />
            Delete
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            bg="#4A90E2"
            _hover={{ bg: '#357ABD' }}
          >
            <Icon as={FiSave} mr={2} />
            Save
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
