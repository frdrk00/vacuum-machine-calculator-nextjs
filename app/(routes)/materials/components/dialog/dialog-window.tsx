import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog'
  
import CreateMaterial from './create-material'

const DialogWindow = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Create</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Material</DialogTitle>
        <DialogDescription>
          Create a new material for your recipes
        </DialogDescription>
      </DialogHeader>
      <CreateMaterial />
    </DialogContent>
  </Dialog>
)
}

export default DialogWindow