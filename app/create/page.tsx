"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import PortfolioForm from "@/components/portfolio-form"

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean, minimalist design perfect for developers and tech professionals",
    preview: "/placeholder.svg?height=300&width=400",
    features: ["Dark/Light mode", "Animated sections", "Mobile responsive", "Clean typography"],
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Bold, colorful design ideal for designers and creative professionals",
    preview: "/placeholder.svg?height=300&width=400",
    features: ["Vibrant colors", "Creative layouts", "Portfolio showcase", "Interactive elements"],
  },
]

export default function CreatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      setShowForm(true)
    }
  }

  if (showForm && selectedTemplate) {
    return <PortfolioForm template={selectedTemplate} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-yellow-700 hover:text-yellow-800 hover:bg-yellow-50"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Choose Your Template
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Template</h2>
          <p className="text-lg text-gray-600">Select a design template that best represents your professional style</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedTemplate === template.id ? "ring-2 ring-indigo-500 shadow-lg" : "hover:shadow-md"
              }`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardHeader>
                <div className="relative">
                  <Image
                    src={template.preview || "/placeholder.svg"}
                    alt={template.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-3"
          >
            Continue with Selected Template
          </Button>
        </div>
      </main>
    </div>
  )
}
