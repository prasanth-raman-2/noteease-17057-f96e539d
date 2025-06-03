import { create } from 'zustand';
import { Note, Category } from '../types';

interface NoteState {
  notes: Note[];
  selectedNote: Note | null;
  categories: Category[];
  searchQuery: string;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  setSelectedNote: (note: Note | null) => void;
  setSearchQuery: (query: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  selectedNote: null,
  categories: [],
  searchQuery: '',

  addNote: (noteData) => set((state) => {
    const newNote: Note = {
      id: Date.now().toString(),
      ...noteData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return { notes: [...state.notes, newNote] };
  }),

  updateNote: (updatedNote) => set((state) => ({
    notes: state.notes.map((note) =>
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date() } : note
    ),
  })),

  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter((note) => note.id !== id),
    selectedNote: state.selectedNote?.id === id ? null : state.selectedNote,
  })),

  setSelectedNote: (note) => set({ selectedNote: note }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  addCategory: (categoryData) => set((state) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...categoryData,
    };
    return { categories: [...state.categories, newCategory] };
  }),

  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter((category) => category.id !== id),
    notes: state.notes.map((note) =>
      note.category === id ? { ...note, category: undefined } : note
    ),
  })),
}));
