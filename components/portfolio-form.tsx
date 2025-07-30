"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight, Plus, Trash2, Save, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface PortfolioFormProps {
  template: string
  initialData?: FormData
  isEditing?: boolean
}

interface FormData {
  id?: string
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

const initialFormData: FormData = {
  name: "",
  title: "",
  tagline: "",
  profileImage: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  socials: [{ platform: "", url: "" }],
  skills: [""],
  services: [
    { title: "", description: "" },
    { title: "", description: "" },
    { title: "", description: "" },
  ],
  portfolio: [
    { title: "", image: "", description: "" },
    { title: "", image: "", description: "" },
    { title: "", image: "", description: "" },
  ],
  testimonials: [{ name: "", role: "", quote: "" }],
  blogTitle: "",
  blogSummary: "",
  contactMessage: "",
  contactEmail: "",
  contactPhone: "",
}

const sections = [
  { id: "hero", title: "Hero Section", description: "Your main introduction" },
  { id: "about", title: "About Me", description: "Personal information and bio" },
  { id: "skills", title: "Skills", description: "Your technical and soft skills" },
  { id: "services", title: "Services", description: "What you offer to clients" },
  { id: "portfolio", title: "Portfolio", description: "Showcase your best work" },
  { id: "testimonials", title: "Testimonials", description: "Client feedback and reviews" },
  { id: "blog", title: "Blog", description: "Optional blog section" },
  { id: "contact", title: "Contact", description: "How people can reach you" },
]

export default function PortfolioForm({ template, initialData, isEditing = false }: PortfolioFormProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialData || initialFormData)
  const [uploadingImage, setUploadingImage] = useState(false)
  const router = useRouter()

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: keyof FormData, item: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as any[]), item],
    }))
  }

  const removeArrayItem = (field: keyof FormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }))
  }

  const updateArrayItem = (field: keyof FormData, index: number, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as any[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  // Image upload handler
  const handleImageUpload = async (file: File, field: string, index?: number) => {
    setUploadingImage(true)
    try {
      // Create a data URL for the image
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        if (index !== undefined) {
          // For portfolio images
          const currentPortfolio = [...formData.portfolio]
          currentPortfolio[index] = { ...currentPortfolio[index], image: imageUrl }
          updateFormData("portfolio", currentPortfolio)
        } else {
          // For profile image
          updateFormData(field, imageUrl)
        }
        setUploadingImage(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error("Error uploading image:", error)
      setUploadingImage(false)
    }
  }

  const handleSubmit = () => {
    const profileId = isEditing ? formData.id : Date.now().toString()
    const profileData = { ...formData, template, id: profileId }

    localStorage.setItem(`profile_${profileId}`, JSON.stringify(profileData))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("profileCreated"))

    router.push(`/portfolio/${profileId}`)
  }

  const ImageUploadComponent = ({
    currentImage,
    onUpload,
    label,
    className = "w-32 h-32",
  }: {
    currentImage: string
    onUpload: (file: File) => void
    label: string
    className?: string
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center space-x-4">
        {currentImage && (
          <div className={`${className} relative rounded-lg overflow-hidden border-2 border-yellow-200`}>
            <Image src={currentImage || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            <Button
              type="button"
              size="sm"
              variant="destructive"
              className="absolute top-1 right-1 h-6 w-6 p-0"
              onClick={() => onUpload(null as any)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onUpload(file)
            }}
            className="hidden"
            id={`upload-${label}`}
          />
          <Label htmlFor={`upload-${label}`}>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-transparent"
              asChild
            >
              <span>
                <Upload className="h-4 w-4 mr-2" />
                {currentImage ? "Change Image" : "Upload Image"}
              </span>
            </Button>
          </Label>
        </div>
      </div>
    </div>
  )

  const renderHeroSection = () => (
    <div className="space-y-6 bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">👤</span>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Hero Information
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-purple-700 font-semibold">
              Full Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              placeholder="John Doe"
              className="border-purple-300 focus:ring-purple-500 focus:border-purple-500 bg-white/80"
            />
          </div>
          <div>
            <Label htmlFor="title" className="text-purple-700 font-semibold">
              Professional Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              placeholder="Full Stack Developer"
              className="border-purple-300 focus:ring-purple-500 focus:border-purple-500 bg-white/80"
            />
          </div>
          <div>
            <Label htmlFor="tagline" className="text-purple-700 font-semibold">
              Tagline
            </Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => updateFormData("tagline", e.target.value)}
              placeholder="Building the future, one line of code at a time"
              className="border-purple-300 focus:ring-purple-500 focus:border-purple-500 bg-white/80"
            />
          </div>
        </div>
        <div className="bg-white/60 p-4 rounded-lg border border-purple-200">
          <ImageUploadComponent
            currentImage={formData.profileImage}
            onUpload={(file) => file && handleImageUpload(file, "profileImage")}
            label="Profile Image"
            className="w-40 h-40"
          />
        </div>
      </div>
    </div>
  )

  const renderAboutSection = () => (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border-2 border-blue-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">ℹ️</span>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          About Information
        </h3>
      </div>
      <div>
        <Label htmlFor="bio" className="text-blue-700 font-semibold">
          Bio *
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => updateFormData("bio", e.target.value)}
          placeholder="Tell us about yourself..."
          rows={4}
          className="border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/60 p-4 rounded-lg border border-blue-200">
          <Label htmlFor="email" className="text-blue-700 font-semibold">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="john@example.com"
            className="border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
          />
        </div>
        <div className="bg-white/60 p-4 rounded-lg border border-blue-200">
          <Label htmlFor="phone" className="text-blue-700 font-semibold">
            Phone
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
          />
        </div>
      </div>
      <div className="bg-white/60 p-4 rounded-lg border border-blue-200">
        <Label htmlFor="location" className="text-blue-700 font-semibold">
          Location
        </Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => updateFormData("location", e.target.value)}
          placeholder="San Francisco, CA"
          className="border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
        />
      </div>
      <div className="bg-white/60 p-4 rounded-lg border border-blue-200">
        <Label className="text-blue-700 font-semibold">Social Media Links</Label>
        {formData.socials.map((social, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <Input
              placeholder="Platform (e.g., LinkedIn)"
              value={social.platform}
              onChange={(e) => updateArrayItem("socials", index, { ...social, platform: e.target.value })}
              className="border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
            />
            <Input
              placeholder="URL"
              value={social.url}
              onChange={(e) => updateArrayItem("socials", index, { ...social, url: e.target.value })}
              className="border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem("socials", index)}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem("socials", { platform: "", url: "" })}
          className="mt-2 border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Social Link
        </Button>
      </div>
    </div>
  )

  const renderSkillsSection = () => (
    <div className="space-y-6 bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border-2 border-green-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">🚀</span>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Skills & Expertise
        </h3>
      </div>
      <div className="bg-white/60 p-4 rounded-lg border border-green-200">
        <Label className="text-green-700 font-semibold">Skills *</Label>
        {formData.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <Input
              placeholder="Enter a skill"
              value={skill}
              onChange={(e) => updateArrayItem("skills", index, e.target.value)}
              className="border-green-300 focus:ring-green-500 focus:border-green-500 bg-white/80"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem("skills", index)}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayItem("skills", "")}
          className="mt-2 border-green-300 text-green-700 hover:bg-green-50"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
    </div>
  )

  const renderServicesSection = () => (
    <div className="space-y-6 bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border-2 border-orange-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">💼</span>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Services Offered
        </h3>
      </div>
      <Label className="text-orange-700 font-semibold">Services (3 services)</Label>
      {formData.services.map((service, index) => (
        <Card key={index} className="border-orange-200 bg-gradient-to-r from-orange-100/50 to-red-100/50">
          <CardContent className="pt-4">
            <div className="space-y-2">
              <Input
                placeholder="Service Title"
                value={service.title}
                onChange={(e) => updateArrayItem("services", index, { ...service, title: e.target.value })}
                className="border-orange-300 focus:ring-orange-500 focus:border-orange-500 bg-white/80"
              />
              <Textarea
                placeholder="Service Description"
                value={service.description}
                onChange={(e) => updateArrayItem("services", index, { ...service, description: e.target.value })}
                rows={3}
                className="border-orange-300 focus:ring-orange-500 focus:border-orange-500 bg-white/80"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderPortfolioSection = () => (
    <div className="space-y-6 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border-2 border-indigo-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">🎨</span>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Portfolio Projects
        </h3>
      </div>
      <Label className="text-indigo-700 font-semibold">Portfolio Projects (3 projects)</Label>
      {formData.portfolio.map((project, index) => (
        <Card key={index} className="border-indigo-200 bg-gradient-to-r from-indigo-100/50 to-purple-100/50">
          <CardContent className="pt-4">
            <div className="space-y-4">
              <Input
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => updateArrayItem("portfolio", index, { ...project, title: e.target.value })}
                className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80"
              />
              <div className="bg-white/60 p-4 rounded-lg border border-indigo-200">
                <ImageUploadComponent
                  currentImage={project.image}
                  onUpload={(file) => file && handleImageUpload(file, "portfolio", index)}
                  label={`Project ${index + 1} Image`}
                  className="w-full h-32"
                />
              </div>
              <Textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => updateArrayItem("portfolio", index, { ...project, description: e.target.value })}
                rows={3}
                className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 bg-white/80"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderTestimonialsSection = () => (
    <div className="space-y-6 bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-lg border-2 border-pink-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">💬</span>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Client Testimonials
        </h3>
      </div>
      <Label className="text-pink-700 font-semibold">Client Testimonials</Label>
      {formData.testimonials.map((testimonial, index) => (
        <Card key={index} className="border-pink-200 bg-gradient-to-r from-pink-100/50 to-rose-100/50">
          <CardContent className="pt-4">
            <div className="space-y-2">
              <Input
                placeholder="Client Name"
                value={testimonial.name}
                onChange={(e) => updateArrayItem("testimonials", index, { ...testimonial, name: e.target.value })}
                className="border-pink-300 focus:ring-pink-500 focus:border-pink-500 bg-white/80"
              />
              <Input
                placeholder="Client Role/Company"
                value={testimonial.role}
                onChange={(e) => updateArrayItem("testimonials", index, { ...testimonial, role: e.target.value })}
                className="border-pink-300 focus:ring-pink-500 focus:border-pink-500 bg-white/80"
              />
              <Textarea
                placeholder="Testimonial Quote"
                value={testimonial.quote}
                onChange={(e) => updateArrayItem("testimonials", index, { ...testimonial, quote: e.target.value })}
                rows={3}
                className="border-pink-300 focus:ring-pink-500 focus:border-pink-500 bg-white/80"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeArrayItem("testimonials", index)}
              className="mt-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => addArrayItem("testimonials", { name: "", role: "", quote: "" })}
        className="border-pink-300 text-pink-700 hover:bg-pink-50"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Testimonial
      </Button>
    </div>
  )

  const renderBlogSection = () => (
    <div className="space-y-6 bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-lg border-2 border-teal-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">📝</span>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
          Blog Information
        </h3>
      </div>
      <div className="space-y-4">
        <div className="bg-white/60 p-4 rounded-lg border border-teal-200">
          <Label htmlFor="blogTitle" className="text-teal-700 font-semibold">
            Blog Title (Optional)
          </Label>
          <Input
            id="blogTitle"
            value={formData.blogTitle}
            onChange={(e) => updateFormData("blogTitle", e.target.value)}
            placeholder="My Tech Blog"
            className="border-teal-300 focus:ring-teal-500 focus:border-teal-500 bg-white/80"
          />
        </div>
        <div className="bg-white/60 p-4 rounded-lg border border-teal-200">
          <Label htmlFor="blogSummary" className="text-teal-700 font-semibold">
            Blog Summary (Optional)
          </Label>
          <Textarea
            id="blogSummary"
            value={formData.blogSummary}
            onChange={(e) => updateFormData("blogSummary", e.target.value)}
            placeholder="Brief description of your blog..."
            rows={3}
            className="border-teal-300 focus:ring-teal-500 focus:border-teal-500 bg-white/80"
          />
        </div>
      </div>
    </div>
  )

  const renderContactSection = () => (
    <div className="space-y-6 bg-gradient-to-br from-violet-50 to-purple-50 p-6 rounded-lg border-2 border-violet-200">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold text-lg">📞</span>
        </div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Contact Information
        </h3>
      </div>
      <div className="space-y-4">
        <div className="bg-white/60 p-4 rounded-lg border border-violet-200">
          <Label htmlFor="contactMessage" className="text-violet-700 font-semibold">
            Contact Message
          </Label>
          <Textarea
            id="contactMessage"
            value={formData.contactMessage}
            onChange={(e) => updateFormData("contactMessage", e.target.value)}
            placeholder="Let's work together! Feel free to reach out..."
            rows={3}
            className="border-violet-300 focus:ring-violet-500 focus:border-violet-500 bg-white/80"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/60 p-4 rounded-lg border border-violet-200">
            <Label htmlFor="contactEmail" className="text-violet-700 font-semibold">
              Contact Email
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => updateFormData("contactEmail", e.target.value)}
              placeholder="contact@example.com"
              className="border-violet-300 focus:ring-violet-500 focus:border-violet-500 bg-white/80"
            />
          </div>
          <div className="bg-white/60 p-4 rounded-lg border border-violet-200">
            <Label htmlFor="contactPhone" className="text-violet-700 font-semibold">
              Contact Phone
            </Label>
            <Input
              id="contactPhone"
              value={formData.contactPhone}
              onChange={(e) => updateFormData("contactPhone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="border-violet-300 focus:ring-violet-500 focus:border-violet-500 bg-white/80"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderCurrentSection = () => {
    switch (sections[currentSection].id) {
      case "hero":
        return renderHeroSection()
      case "about":
        return renderAboutSection()
      case "skills":
        return renderSkillsSection()
      case "services":
        return renderServicesSection()
      case "portfolio":
        return renderPortfolioSection()
      case "testimonials":
        return renderTestimonialsSection()
      case "blog":
        return renderBlogSection()
      case "contact":
        return renderContactSection()
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={isEditing ? "/" : "/create"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-yellow-700 hover:text-yellow-800 hover:bg-yellow-50"
                  onClick={() => {
                    if (isEditing) {
                      router.push("/")
                    } else {
                      router.back()
                    }
                  }}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {isEditing ? "Edit Portfolio" : "Portfolio Form"}
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Step {currentSection + 1} of {sections.length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar with rainbow gradient */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentSection + 1) / sections.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-yellow-500 via-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Section - Remove the Card wrapper since each section has its own styling */}
        <div className="mb-8">{renderCurrentSection()}</div>

        {/* Navigation buttons with matching colors */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentSection((prev) => Math.max(0, prev - 1))}
            disabled={currentSection === 0}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentSection === sections.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={uploadingImage}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? "Update Portfolio" : "Create Portfolio"}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentSection((prev) => Math.min(sections.length - 1, prev + 1))}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
