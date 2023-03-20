import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/primitives/alert-dialog";
import { Button } from "@/ui/primitives/button";
import UsernameForm from "../usernameForm";

export default function WelcomeAlert() {
  const [shouldOpen, setShouldOpen] = useState(false);

  useEffect(() => {
    setShouldOpen(true);
  });

  return (
    <AlertDialog open={shouldOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="hidden">Open</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to Scores On The Doors!</AlertDialogTitle>
          <AlertDialogDescription>
            We require just one more step to set up your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <UsernameForm />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
