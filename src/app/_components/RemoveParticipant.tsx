import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { getEmojiFromString } from '@/lib/functions/getEmojiFromString'
import { Expenses } from '@/types'
import { X } from 'lucide-react'

interface Props {
  name: string
  participants: Expenses
  setParticipants: React.Dispatch<React.SetStateAction<Expenses>>
}

export const RemoveParticipant = ({ name, participants, setParticipants }: Props) => {
  const handleRemoveParticipant = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [name]: _, ...remainingParticipants } = participants

    setParticipants(remainingParticipants)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <X className='size-[18px] text-gray-500' />
      </DialogTrigger>
      <DialogContent
        onPointerDownOutside={(e) => e.preventDefault()}
        className={`min-w-fit w-[80vw] max-w-[400px] flex rounded-xl text-gray-700`}
      >
        <DialogHeader>
          <DialogTitle className='text-center font-normal text-balance leading-7 mt-3'>
            ¿Quieres eliminar a {getEmojiFromString(name)}
            <strong className='font-semibold'>{name}</strong> de la lista?
          </DialogTitle>
          <DialogDescription>
            <div className='flex items-center justify-center gap-10 mt-4'>
              <Button variant='outline' onClick={handleRemoveParticipant}>
                Si
              </Button>
              <DialogClose asChild>
                <Button>No</Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
