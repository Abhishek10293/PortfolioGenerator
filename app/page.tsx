"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, User, Briefcase, Code, Star, Edit, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import DeleteProfileButton from "@/components/delete-profile-button"

interface Profile {
  id: string
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  profileImage: string
  skills: string[]
  template: string
  tagline: string
  experience?: string
  projects?: string
  rating?: number
}

export default function HomePage() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [skillFilter, setSkillFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  // Mock data for demonstration
  const mockProfiles: Profile[] = [
    {
      id: "mock-1",
      name: "Emma Foster",
      title: "Full Stack Developer",
      bio: "Passionate developer with expertise in React, Node.js, and cloud technologies. I love creating scalable web applications that solve real-world problems.",
      email: "emma.foster@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      profileImage: "/placeholder.svg?height=200&width=200",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      template: "modern",
      tagline: "Building the future with clean code",
      experience: "5+ years",
      projects: "25+",
      rating: 4.8,
    },
    {
      id: "mock-2",
      name: "Jennifer Park",
      title: "Software Engineer",
      bio: "Experienced software engineer specializing in backend systems and API development. Focused on performance optimization and scalable architecture.",
      email: "jennifer.park@example.com",
      phone: "+1 (555) 987-6543",
      location: "Seattle, WA",
      profileImage: "/placeholder.svg?height=200&width=200",
      skills: ["Python", "Java", "PostgreSQL", "Docker", "Kubernetes"],
      template: "modern",
      tagline: "Crafting robust backend solutions",
      experience: "4+ years",
      projects: "18+",
      rating: 4.6,
    },
    {
      id: "mock-3",
      name: "Kevin Brown",
      title: "UI Designer",
      bio: "Creative UI designer with a passion for user-centered design and beautiful interfaces. I create designs that are both functional and visually appealing.",
      email: "kevin.brown@example.com",
      phone: "+1 (555) 456-7890",
      location: "New York, NY",
      profileImage: "/placeholder.svg?height=200&width=200",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
      template: "creative",
      tagline: "Designing experiences that matter",
      experience: "3+ years",
      projects: "30+",
      rating: 4.7,
    },
    {
      id: "mock-4",
      name: "Lisa Wang",
      title: "AI Engineer",
      bio: "AI engineer focused on machine learning and data science. I develop intelligent systems that help businesses make data-driven decisions.",
      email: "lisa.wang@example.com",
      phone: "+1 (555) 321-0987",
      location: "Austin, TX",
      profileImage: "/placeholder.svg?height=200&width=200",
      skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Data Science"],
      template: "modern",
      tagline: "Bringing AI to life",
      experience: "6+ years",
      projects: "12+",
      rating: 4.9,
    },
  ]

  // Load profiles from localStorage on component mount
  useEffect(() => {
    const loadProfiles = () => {
      const allProfiles: Profile[] = []

      // Get all keys from localStorage that start with 'profile_'
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith("profile_")) {
          try {
            const profileData = localStorage.getItem(key)
            if (profileData) {
              const profile = JSON.parse(profileData)
              allProfiles.push({
                ...profile,
                experience: profile.experience || "2+ years",
                projects: profile.projects || "15+",
                rating: profile.rating || 4.5 + Math.random() * 0.5,
              })
            }
          } catch (error) {
            console.error("Error parsing profile:", error)
          }
        }
      }

      // If no real profiles exist, show mock data
      if (allProfiles.length === 0) {
        setProfiles(mockProfiles)
      } else {
        // Combine real profiles with mock data
        setProfiles([...allProfiles, ...mockProfiles])
      }
    }

    loadProfiles()

    // Listen for storage changes to update profiles in real-time
    const handleStorageChange = () => {
      loadProfiles()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("profileCreated", handleStorageChange)
    window.addEventListener("profileDeleted", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("profileCreated", handleStorageChange)
      window.removeEventListener("profileDeleted", handleStorageChange)
    }
  }, [refreshKey])

  // Get all unique skills and roles for filters
  const allSkills = [...new Set(profiles.flatMap((p) => p.skills || []))]
  const allRoles = [...new Set(profiles.map((p) => p.title))]

  // Filter profiles
  const filteredProfiles = profiles.filter((profile) => {
    const matchesSkill =
      !skillFilter ||
      (profile.skills && profile.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase())))
    const matchesRole = !roleFilter || profile.title.toLowerCase().includes(roleFilter.toLowerCase())
    return matchesSkill && matchesRole
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Portfolio Hub
              </h1>
            </div>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold">
                <Plus className="h-4 w-4 mr-2" />
                Create Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Professionals
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Browse through our collection of talented professionals and find the perfect match for your project needs.
          </p>
          <Link href="/create">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold text-lg px-8 py-3"
            >
              Join Our Community
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 items-center bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 text-yellow-600" />
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="border border-yellow-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">All Skills</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-orange-600" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-yellow-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="">All Roles</option>
              {allRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          {(skillFilter || roleFilter) && (
            <Button
              variant="outline"
              onClick={() => {
                setSkillFilter("")
                setRoleFilter("")
              }}
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProfiles.map((profile) => (
            <Card
              key={profile.id}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-4">
                  <Image
                    src={profile.profileImage || "/placeholder.svg?height=80&width=80&query=professional portrait"}
                    alt={profile.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-3 border-white shadow-lg"
                  />
                </div>
                <CardTitle className="text-lg font-bold text-white">{profile.name}</CardTitle>
                <CardDescription className="text-yellow-100 font-medium">{profile.title}</CardDescription>

                {/* Rating */}
                <div className="flex items-center justify-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(profile.rating || 4.5) ? "text-yellow-200 fill-current" : "text-yellow-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-yellow-100">{(profile.rating || 4.5).toFixed(1)}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-yellow-100 text-sm mb-4 line-clamp-2">{profile.bio}</p>

                {/* Stats */}
                <div className="flex justify-between text-xs text-yellow-100 mb-4">
                  <div className="text-center">
                    <div className="font-bold text-white">{profile.experience}</div>
                    <div>Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white">{profile.projects}</div>
                    <div>Projects</div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {(profile.skills || []).slice(0, 2).map((skill) => (
                      <Badge key={skill} className="bg-white/20 text-white text-xs border-0 hover:bg-white/30">
                        {skill}
                      </Badge>
                    ))}
                    {(profile.skills || []).length > 2 && (
                      <Badge className="bg-white/20 text-white text-xs border-0">
                        +{(profile.skills || []).length - 2}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link href={`/portfolio/${profile.id}`} className="flex-1">
                    <Button className="w-full bg-white text-yellow-600 hover:bg-yellow-50 font-semibold text-sm py-2">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/edit/${profile.id}`}>
                    <Button className="bg-white/20 text-white hover:bg-white/30 border-0 px-3 py-2">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </Link>
                  <DeleteProfileButton
                    profileId={profile.id}
                    profileName={profile.name}
                    onDelete={() => setRefreshKey((prev) => prev + 1)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Profiles Found</h3>
            <p className="text-gray-500 text-lg mb-6">
              {profiles.length === 0
                ? "No portfolios have been created yet. Be the first to create one!"
                : "No profiles match your current filters."}
            </p>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold">
                Create First Portfolio
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
