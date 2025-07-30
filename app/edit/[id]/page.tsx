"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import PortfolioForm from "@/components/portfolio-form"

interface ProfileData {
  id: string
  template: string
  name: string
  title: string
  tagline: string
  profileImage: string
  bio: string
  email: string
  phone: string
  location: string
  socials: { platform: string; url: string }[]
  skills: string[]
  services: { title: string; description: string }[]
  portfolio: { title: string; image: string; description: string }[]
  testimonials: { name: string; role: string; quote: string }[]
  blogTitle: string
  blogSummary: string
  contactMessage: string
  contactEmail: string
  contactPhone: string
}

export default function EditPage() {
  const params = useParams()
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = () => {
      try {
        const stored = localStorage.getItem(`profile_${params.id}`)
        if (stored) {
          setProfileData(JSON.parse(stored))
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-4">The profile you're trying to edit could not be found.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-yellow-700 hover:text-yellow-800 hover:bg-yellow-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Edit Portfolio
              </h1>
            </div>
            <Link href={`/portfolio/${profileData.id}`}>
              <Button variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent">
                Preview Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <PortfolioForm template={profileData.template} initialData={profileData} isEditing={true} />
    </div>
  )
}
