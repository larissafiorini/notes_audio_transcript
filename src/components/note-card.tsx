import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

interface NoteCardProps {
  note: {
    id: string,
    date: Date,
    content: string,
  }
  onNoteDeleted: (id: string) => void;
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>

      <Dialog.Trigger className="rounded-md bg-cyan-700 p-5 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-400 gap-3 flex flex-col text-left">
        <span className="text-small font-medium text-slate-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}

        </span>
        <p className="text-sm leading-6 text-slate-400">
          {note.content}
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyan-950/70 to-cyan-950/5 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black-60 bg-opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col out-line-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-small font-medium text-slate-300">
              {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
            </span>
            <p className="text-sm leading-6 text-slate-400">
              {note.content}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNoteDeleted(note.id)}
            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium"
          >
            Deseja apagar essa nota?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}