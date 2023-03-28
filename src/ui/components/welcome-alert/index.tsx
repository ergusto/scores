import { useState, useEffect } from "react"
import { signOut } from "next-auth/react";
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
import UsernameForm from "../change-username-form";

export default function WelcomeAlert() {
  const [shouldOpen, setShouldOpen] = useState(false);

  useEffect(() => {
    setShouldOpen(true);
  }, []);

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
          <div className="basis-full">
            <UsernameForm />
            <div className="mt-3 text-xs font-semibold">Or <a className="underline hover:cursor-pointer" onClick={() => void signOut({ redirect: false })}>Sign out</a></div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
