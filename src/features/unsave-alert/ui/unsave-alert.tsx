import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/shared/ui/alert-dialog';
import { useBlocker } from '@tanstack/react-router';

interface UnsaveAlertProps {
  isChanged: boolean;
}

export const UnsaveAlert = ({ isChanged }: UnsaveAlertProps) => {
  const { status, proceed, reset } = useBlocker({
    shouldBlockFn: () => isChanged,
    withResolver: true,
    enableBeforeUnload: () => isChanged
  });

  return (
    <AlertDialog open={status === 'blocked'}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Before you go…</AlertDialogTitle>
          <AlertDialogDescription>Changes aren’t saved yet. Stay and save, or leave anyway?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={reset}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={proceed}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
