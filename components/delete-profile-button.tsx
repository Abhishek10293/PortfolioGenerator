"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface DeleteProfileButtonProps {
  profileId: string
  profileName: string
  onDelete?: () => void
}

export default function DeleteProfileButton({ profileId, profileName, onDelete }: DeleteProfileButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    setIsDeleting(true)

    try {
      // Remove from localStorage
      localStorage.removeItem(`profile_${profileId}`)

      // Dispatch event to update other components
      window.dispatchEvent(new CustomEvent("profileDeleted", { detail: { profileId } }))

      // Call onDelete callback if provided
      if (onDelete) {
        onDelete()
      }

      // Redirect to home if we're on the profile page
      if (window.location.pathname.includes(`/portfolio/${profileId}`)) {
        router.push("/")
      }
    } catch (error) {
      console.error("Error deleting profile:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  // Don't show delete button for mock profiles
  if (profileId.startsWith("mock-")) {
    return null
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
          disabled={isDeleting}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Portfolio</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{profileName}</strong>'s portfolio? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Portfolio"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
