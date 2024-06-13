import { Navbar } from "./components/navbar";
import { NewNoteCard } from "./components/new-note.card";
import { NoteCard } from "./components/note-card";
import { SearchNotes } from "./components/search-notes";
import { useState } from "react";

//<a href="https://www.flaticon.com/br/icones-gratis/bloco-de-anotacoes" title="bloco de anotações ícones">Bloco de anotações ícones criados por PIXARTIST - Flaticon</a>

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  });

  function onNoteCreated(content: string) {
    const NewNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const AllNotes = [NewNote, ...notes]
    setNotes(AllNotes)

    localStorage.setItem('notes', JSON.stringify(AllNotes))
  }

  function onNoteDeleted(id: string) {
    const AllNotes = notes.filter(note => note.id !== id)
    setNotes(AllNotes)

    localStorage.setItem('notes', JSON.stringify(AllNotes))
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }

  const filteredNotes = search != ''
  ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))
  : notes

  return (
    <div>
      <Navbar />

      <div className="mx-auto max-w-6xl my-12 space-y-6">

        <form className="w-full">
          <input
            type="text"
            placeholder="Busque em suas notas..."
            className="w-full bg-transparent text-3xl font-semibold tracking-tighter outline-none placeholder:text-gray-400"
            onChange={handleSearch}
          />
        </form>

        <div className="h-px bg-cyan-950" />

        <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">

          <NewNoteCard onNoteCreated={onNoteCreated} />


          {filteredNotes.map(note => {
            return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted}/>
          })}

        </div>
      </div>
    </div>
  )

}

