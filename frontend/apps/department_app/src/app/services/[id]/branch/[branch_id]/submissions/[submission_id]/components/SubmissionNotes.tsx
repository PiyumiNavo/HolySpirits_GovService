'use client';

import { useState } from 'react';
import { Card, Button, TextArea } from '@myorg/ui';
import { SubmissionNote } from '../types/submission-details.types';
import { useSubmissionActions } from '../hooks/useSubmissionActions';

interface SubmissionNotesProps {
  notes: SubmissionNote[];
  submissionId: string;
  onNoteAdded: () => void;
}

export function SubmissionNotes({ notes, submissionId, onNoteAdded }: SubmissionNotesProps) {
  const [newNote, setNewNote] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  const { addNote, loading, error } = useSubmissionActions({
    submissionId,
    onSuccess: () => {
      onNoteAdded();
      setNewNote('');
      setShowAddNote(false);
    }
  });

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await addNote(newNote);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-900">
          Notes ({notes.length})
        </h3>
        
        <Button
          onClick={() => setShowAddNote(!showAddNote)}
          className="text-sm bg-primary-600 hover:bg-primary-700 text-white"
        >
          {showAddNote ? 'Cancel' : 'Add Note'}
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-md">
          <p className="text-error-700 text-sm">{error}</p>
        </div>
      )}

      {showAddNote && (
        <div className="mb-6 p-4 bg-border-50 border border-border-200 rounded-md">
          <TextArea
            id="new-note"
            label="Add a Note"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your note here..."
            rows={3}
          />
          
          <div className="flex justify-end space-x-3 mt-3">
            <Button
              onClick={() => {
                setShowAddNote(false);
                setNewNote('');
              }}
              disabled={loading}
              className="bg-border-300 hover:bg-border-400 text-text-700"
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleAddNote}
              disabled={loading || !newNote.trim()}
              className="bg-primary-600 hover:bg-primary-700 text-white disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Note'}
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="text-text-500 text-center py-8">
            No notes have been added yet.
          </p>
        ) : (
          notes
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((note) => (
              <div
                key={note.id}
                className="border border-border-200 rounded-md p-4 bg-background-50"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-text-900">
                      {note.userName}
                    </h4>
                    <p className="text-sm text-text-600">
                      {formatDate(note.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-2">
                  <p className="text-text-800 whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              </div>
            ))
        )}
      </div>
    </Card>
  );
}
