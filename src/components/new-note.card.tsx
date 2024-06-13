import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition : SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  function handleStartEditor() {
    setShouldShowOnBoarding(false);
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    if (event.target.value === '') {
      setShouldShowOnBoarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (content === '') {
      return toast.error('A nota não pode ser vazia!')
    }

    onNoteCreated(content)
    setContent('')
    setShouldShowOnBoarding(true)
    toast.success('Nota salva com sucesso!')
  }

  function handleStartRecognition(event: FormEvent) {
    setIsRecording(true)

    const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window

    if (!isSpeechRecognitionSupported) {
      return toast.error('Seu navegador não suporta reconhecimento de voz!')
    }
//https://app.rocketseat.com.br/certificates/8b72d499-d7f2-4239-a383-a427cbd3d8d1
    setShouldShowOnBoarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      console.log(event.results)
      const transcript = Array.from(event.results).reduce((acc, result) => {
        return text.concat(result[[0]].transcript)
      },'')
      setContent(transcript)
    }

    speechRecognition.onerror = (event) => {
      console.error(event.error)
    }
    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
    if (speechRecognition != null) {
    speechRecognition.stop()}
  }

  return (
    <Dialog.Root>

      <Dialog.Trigger className="rounded-md flex bg-cyan-800 p-5 gap-3 flex-col outline-none text-left hover:ring-2 hover:ring-slate-400 ">
        <span className="text-small font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black-60 bg-opacity-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col out-line-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className="flex-1 flex flex-col ">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-small font-medium text-slate-300">
                Adicionar nota
              </span>
              {shouldShowOnBoarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece <button type="button" onClick={handleStartRecognition} className="font-medium hover:underline text-cyan-400">gravando uma nota</button> em áudio ou se preferir <button onClick={handleStartEditor} className="font-medium hover:underline text-cyan-400">utilize apenas texto</button>.
                </p>
              ) : (
                <div>
                  <p>Editor</p>
                  <textarea
                    autoFocus
                    className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                    onChange={handleContentChanged}
                  />
                </div>
              )}
            </div>

            {isRecording ? (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-full bg-cyan-800 py-4 text-center text-sm text-slate-950 outline-none font-medium hover:bg-cyan-100 transition-colors duration-200 ease-in-out"
              >
                Gravando! (clique para interromper)
              </button>
            ) : (
            <button
              type="submit"
              className="w-full bg-cyan-300 py-4 text-center text-sm text-teal-950 outline-none font-medium hover:bg-cyan-400 transition-colors duration-200 ease-in-out"
            >
              Salvar nota
            </button>
            )
            }


          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}