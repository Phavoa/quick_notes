"use client";

import { Plus, Trash, Edit, Save, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Input } from "./ui/input";
import { AnimatePresence } from "framer-motion";
import NoteCard from "./NoteCard";




const fakeNotes = [
    {
      id: 1,
      title: "Meeting Notes",
      content:
        "Discussed project timelines and deliverables for Q4. Need to finalize the budget by next week.",
    },
    {
      id: 2,
      title: "Grocery List",
      content:
        "Milk, eggs, bread, bananas, chicken, and pasta. Don't forget to pick up laundry detergent.",
    },
    {
      id: 3,
      title: "Book Recommendations",
      content:
        "1. Atomic Habits by James Clear\n2. The Alchemist by Paulo Coelho\n3. Sapiens by Yuval Noah Harari",
    },
    {
      id: 4,
      title: "Workout Plan",
      content:
        "Monday: Chest & Triceps\nTuesday: Back & Biceps\nWednesday: Legs\nThursday: Shoulders\nFriday: Cardio",
    },
    {
      id: 5,
      title: "Travel Itinerary",
      content:
        "Day 1: Arrive in Paris, check-in at hotel\nDay 2: Visit Eiffel Tower and Louvre Museum\nDay 3: Day trip to Versailles",
    },
    {
      id: 6,
      title: "Recipe Ideas",
      content:
        "1. Spaghetti Carbonara\n2. Chicken Tikka Masala\n3. Veggie Stir Fry\n4. Chocolate Lava Cake",
    },
    {
      id: 7,
      title: "Project Ideas",
      content:
        "1. Build a note-taking app\n2. Create a personal finance tracker\n3. Develop a habit tracker",
    },
    {
      id: 8,
      title: "Birthday Plans",
      content:
        "Invite friends over for a BBQ. Order a cake from the local bakery. Don't forget balloons and decorations!",
    },
    {
      id: 9,
      title: "Learning Goals",
      content:
        "1. Learn React Native\n2. Master TypeScript\n3. Explore GraphQL\n4. Practice algorithms daily",
    },
    {
      id: 10,
      title: "Weekend To-Do",
      content:
        "1. Clean the garage\n2. Organize the closet\n3. Fix the leaky faucet\n4. Call mom",
    },
  ];

// Custom Hook for Note Management
const useNotes = (initialNotes) => {
  const [notes, setNotes] = useState(initialNotes);
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Load notes from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNotes = localStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    }
  }, []);

  // Save notes to localStorage whenever the notes state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  const addNote = useCallback((note) => {
    setNotes((prev) => [...prev, { id: Date.now(), ...note }]);
  }, []);

  const updateNote = useCallback((id, updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updatedNote } : note))
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    editingNoteId,
    setEditingNoteId,
    setNotes,
  };
};

// Note Form Component
const NoteForm = ({ onSubmit, onCancel, initialData, isEditing }) => {
  const [noteContent, setNoteContent] = useState(
    initialData || { title: "", content: "" }
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!noteContent.title.trim() || !noteContent.content.trim()) {
      setError("Title and content are required.");
      return;
    }
    onSubmit(noteContent);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div>
        <Label className="text-sm font-medium">Title</Label>
        <Input
          value={noteContent.title}
          onChange={(e) =>
            setNoteContent((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
      </div>
      <div>
        <Label className="text-sm font-medium">Content</Label>
        <Textarea
          value={noteContent.content}
          onChange={(e) =>
            setNoteContent((prev) => ({ ...prev, content: e.target.value }))
          }
          required
        />
      </div>
      <div className="flex space-x-2 pb-16">
        <Button type="submit" className="w-full">
          {isEditing ? "Save Changes" : "Create Note"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

// Main Component
const NoteCards = () => {
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
    editingNoteId,
    setEditingNoteId,
  } = useNotes(fakeNotes); // Initialize with an empty array
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  const handleNoteSubmit = (note) => {
    if (editingNoteId) {
      updateNote(editingNoteId, note);
      setEditingNoteId(null);
    } else {
      addNote(note);
    }
    setIsDrawerOpen(false);
  };

  return (
    <div className="container mx-auto min-h-screen p-4 grid md:grid-cols-3 gap-4">
      {/* Search Bar */}
      <div className="relative col-span-full h-10 flex mt-2 space-x-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 flex-1 h-10"
        />
      </div>

      {/* Add Note Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger className="h-52">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed h-52 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground">
              <Plus className="h-10 w-10 mb-2 text-blue-500" />
              <p className="text-lg font-medium">Add New Note</p>
            </CardContent>
          </Card>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold">
              {editingNoteId ? "Edit Note" : "Create a Note"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-5">
            <NoteForm
              onSubmit={handleNoteSubmit}
              onCancel={() => setIsDrawerOpen(false)}
              initialData={
                editingNoteId
                  ? notes.find((note) => note.id === editingNoteId)
                  : null
              }
              isEditing={!!editingNoteId}
            />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Display Notes */}
      <AnimatePresence>
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onEdit={(note) => {
              setEditingNoteId(note.id);
              setIsDrawerOpen(true);
            }}
            onDelete={deleteNote}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NoteCards;