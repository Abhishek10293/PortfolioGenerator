"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, ExternalLink, Quote, Sparkles } from "lucide-react"
import Image from "next/image"

interface ProfileData {
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

interface ModernTemplateProps {
  data: ProfileData
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToContact = () => {
    const element = document.getElementById("contact-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 via-green-50 via-yellow-50 to-pink-50">
      {/* Hero Section - Purple Theme */}
      <section
        id="hero-section"
        className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-300/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/30 rounded-full animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Sparkles className="h-8 w-8 mr-2 text-purple-200" />
                <span className="text-purple-200 font-semibold">Professional Portfolio</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                {data.name}
              </h1>
              <h2 className="text-2xl lg:text-3xl mb-6 text-purple-100">{data.title}</h2>
              {data.tagline && <p className="text-xl text-blue-100 mb-8">{data.tagline}</p>}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-purple-50 font-semibold shadow-lg"
                  onClick={scrollToContact}
                >
                  Get In Touch
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent font-semibold"
                  onClick={() => scrollToSection("portfolio-section")}
                >
                  View Work
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <Image
                  src={data.profileImage || "/placeholder.svg?height=400&width=400&query=professional portrait"}
                  alt={data.name}
                  width={400}
                  height={400}
                  className="relative rounded-full object-cover w-80 h-80 border-4 border-white shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Blue Theme */}
      <section id="about-section" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{data.bio}</p>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600 bg-blue-50 rounded-lg p-3">
                  <Mail className="h-5 w-5 mr-3 text-blue-500" />
                  {data.email}
                </div>
                {data.phone && (
                  <div className="flex items-center text-gray-600 bg-blue-50 rounded-lg p-3">
                    <Phone className="h-5 w-5 mr-3 text-cyan-500" />
                    {data.phone}
                  </div>
                )}
                {data.location && (
                  <div className="flex items-center text-gray-600 bg-blue-50 rounded-lg p-3">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                    {data.location}
                  </div>
                )}
              </div>

              {data.socials.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.socials.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                        asChild
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          {social.platform}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-200">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.skills
                  .filter((skill) => skill.trim())
                  .map((skill, index) => (
                    <Badge
                      key={index}
                      className={`text-sm py-2 px-4 ${
                        index % 4 === 0
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : index % 4 === 1
                            ? "bg-cyan-100 text-cyan-700 border-cyan-200"
                            : index % 4 === 2
                              ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                              : "bg-sky-100 text-sky-700 border-sky-200"
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Orange Theme */}
      {data.services.some((service) => service.title.trim()) && (
        <section id="services-section" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                Services
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.services
                .filter((service) => service.title.trim())
                .map((service, index) => (
                  <Card
                    key={index}
                    className={`hover:shadow-xl transition-all duration-300 border-0 ${
                      index % 3 === 0
                        ? "bg-gradient-to-br from-orange-100 to-orange-200"
                        : index % 3 === 1
                          ? "bg-gradient-to-br from-red-100 to-red-200"
                          : "bg-gradient-to-br from-yellow-100 to-yellow-200"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle
                        className={`${
                          index % 3 === 0 ? "text-orange-700" : index % 3 === 1 ? "text-red-700" : "text-yellow-700"
                        }`}
                      >
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section - Indigo Theme */}
      {data.portfolio.some((project) => project.title.trim()) && (
        <section id="portfolio-section" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Portfolio
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.portfolio
                .filter((project) => project.title.trim())
                .map((project, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/90 backdrop-blur-sm"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div
                        className={`absolute inset-0 ${
                          index % 3 === 0
                            ? "bg-gradient-to-br from-indigo-400 to-purple-400"
                            : index % 3 === 1
                              ? "bg-gradient-to-br from-purple-400 to-pink-400"
                              : "bg-gradient-to-br from-blue-400 to-indigo-400"
                        } opacity-20`}
                      ></div>
                      <Image
                        src={project.image || "/placeholder.svg?height=300&width=400&query=project showcase"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle
                        className={`${
                          index % 3 === 0 ? "text-indigo-700" : index % 3 === 1 ? "text-purple-700" : "text-blue-700"
                        }`}
                      >
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section - Pink Theme */}
      {data.testimonials.some((testimonial) => testimonial.quote.trim()) && (
        <section id="testimonials-section" className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
                Testimonials
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.testimonials
                .filter((testimonial) => testimonial.quote.trim())
                .map((testimonial, index) => (
                  <Card
                    key={index}
                    className="relative bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <Quote className={`h-8 w-8 mb-4 ${index % 2 === 0 ? "text-pink-300" : "text-rose-300"}`} />
                      <p className="text-gray-700 mb-4 italic text-lg">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className={`text-sm ${index % 2 === 0 ? "text-pink-600" : "text-rose-600"}`}>
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Section - Teal Theme */}
      {data.blogTitle.trim() && (
        <section id="blog-section" className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-teal-200">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                {data.blogTitle}
              </h2>
              {data.blogSummary && <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">{data.blogSummary}</p>}
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold shadow-lg"
              >
                Explore My Blog
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section - Violet Theme */}
      <section
        id="contact-section"
        className="py-20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-violet-300/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300/30 rounded-full animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          {data.contactMessage && (
            <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">{data.contactMessage}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50 font-semibold shadow-lg" asChild>
              <a href={`mailto:${data.contactEmail || data.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </a>
            </Button>
            {(data.contactPhone || data.phone) && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-violet-600 font-semibold bg-transparent"
                asChild
              >
                <a href={`tel:${data.contactPhone || data.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Me
                </a>
              </Button>
            )}
          </div>

          <div className="text-violet-100">
            <p className="text-lg">{data.contactEmail || data.email}</p>
            {(data.contactPhone || data.phone) && <p className="text-lg">{data.contactPhone || data.phone}</p>}
          </div>
        </div>
      </section>
    </div>
  )
}
