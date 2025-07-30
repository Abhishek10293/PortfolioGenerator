"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, ExternalLink, Quote, Sparkles, Heart, Zap } from "lucide-react"
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

interface CreativeTemplateProps {
  data: ProfileData
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 via-blue-50 via-green-50 via-yellow-50 to-orange-50">
      {/* Hero Section - Rainbow Theme */}
      <section id="hero-section" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-orange-500 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-300/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300/40 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-green-300/50 rounded-full animate-ping"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Sparkles className="h-8 w-8 mr-2 text-yellow-300 animate-pulse" />
                <span className="text-yellow-300 font-semibold">Creative Professional</span>
                <Heart className="h-6 w-6 ml-2 text-pink-300 animate-pulse" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
                {data.name}
              </h1>
              <h2 className="text-2xl lg:text-3xl mb-6 text-pink-100">{data.title}</h2>
              {data.tagline && <p className="text-xl text-purple-100 mb-8">{data.tagline}</p>}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-yellow-100 font-semibold shadow-xl transform hover:scale-105 transition-all"
                  onClick={scrollToContact}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Let's Create Together
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent font-semibold shadow-xl transform hover:scale-105 transition-all"
                  onClick={() => scrollToSection("portfolio-section")}
                >
                  View My Work
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-400 via-purple-400 via-blue-400 to-green-400 rounded-full blur-lg opacity-75 animate-spin"></div>
                <Image
                  src={
                    data.profileImage || "/placeholder.svg?height=400&width=400&query=creative professional portrait"
                  }
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

      {/* About Section - Colorful Cards */}
      <section id="about-section" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{data.bio}</p>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600 bg-white/80 rounded-lg p-3 shadow-sm border border-purple-200">
                  <Mail className="h-5 w-5 mr-3 text-purple-500" />
                  {data.email}
                </div>
                {data.phone && (
                  <div className="flex items-center text-gray-600 bg-white/80 rounded-lg p-3 shadow-sm border border-pink-200">
                    <Phone className="h-5 w-5 mr-3 text-pink-500" />
                    {data.phone}
                  </div>
                )}
                {data.location && (
                  <div className="flex items-center text-gray-600 bg-white/80 rounded-lg p-3 shadow-sm border border-orange-200">
                    <MapPin className="h-5 w-5 mr-3 text-orange-500" />
                    {data.location}
                  </div>
                )}
              </div>

              {data.socials.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Let's Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.socials.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className={`${
                          index % 4 === 0
                            ? "border-purple-300 text-purple-600 hover:bg-purple-50"
                            : index % 4 === 1
                              ? "border-pink-300 text-pink-600 hover:bg-pink-50"
                              : index % 4 === 2
                                ? "border-blue-300 text-blue-600 hover:bg-blue-50"
                                : "border-green-300 text-green-600 hover:bg-green-50"
                        } bg-transparent transform hover:scale-105 transition-all`}
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

            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.skills
                  .filter((skill) => skill.trim())
                  .map((skill, index) => (
                    <Badge
                      key={index}
                      className={`text-sm py-2 px-4 transform hover:scale-105 transition-all shadow-sm ${
                        index % 6 === 0
                          ? "bg-purple-100 text-purple-700 border border-purple-300"
                          : index % 6 === 1
                            ? "bg-pink-100 text-pink-700 border border-pink-300"
                            : index % 6 === 2
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : index % 6 === 3
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : index % 6 === 4
                                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                  : "bg-orange-100 text-orange-700 border border-orange-300"
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

      {/* Services Section - Vibrant Cards */}
      {data.services.some((service) => service.title.trim()) && (
        <section id="services-section" className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
                What I Offer
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.services
                .filter((service) => service.title.trim())
                .map((service, index) => (
                  <Card
                    key={index}
                    className={`hover:shadow-xl transition-all duration-300 border-0 transform hover:-translate-y-2 hover:scale-105 ${
                      index % 3 === 0
                        ? "bg-gradient-to-br from-purple-100 to-purple-200 shadow-purple-200"
                        : index % 3 === 1
                          ? "bg-gradient-to-br from-pink-100 to-pink-200 shadow-pink-200"
                          : "bg-gradient-to-br from-orange-100 to-orange-200 shadow-orange-200"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle
                        className={`${
                          index % 3 === 0 ? "text-purple-700" : index % 3 === 1 ? "text-pink-700" : "text-orange-700"
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

      {/* Projects Section - Creative Grid */}
      {data.portfolio.some((project) => project.title.trim()) && (
        <section id="portfolio-section" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Featured Projects
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.portfolio
                .filter((project) => project.title.trim())
                .map((project, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border-0 bg-white shadow-lg"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <div
                        className={`absolute inset-0 ${
                          index % 3 === 0
                            ? "bg-gradient-to-br from-purple-400 to-pink-400"
                            : index % 3 === 1
                              ? "bg-gradient-to-br from-pink-400 to-orange-400"
                              : "bg-gradient-to-br from-orange-400 to-yellow-400"
                        } opacity-20`}
                      ></div>
                      <Image
                        src={project.image || "/placeholder.svg?height=300&width=400&query=creative project showcase"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle
                        className={`${
                          index % 3 === 0 ? "text-purple-700" : index % 3 === 1 ? "text-pink-700" : "text-orange-700"
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

      {/* Testimonials Section - Colorful Quotes */}
      {data.testimonials.some((testimonial) => testimonial.quote.trim()) && (
        <section id="testimonials-section" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                What People Say
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.testimonials
                .filter((testimonial) => testimonial.quote.trim())
                .map((testimonial, index) => (
                  <Card
                    key={index}
                    className={`relative border-0 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                      index % 2 === 0
                        ? "bg-gradient-to-br from-green-100 to-blue-100"
                        : "bg-gradient-to-br from-blue-100 to-purple-100"
                    }`}
                  >
                    <CardContent className="pt-6">
                      <Quote className={`h-8 w-8 mb-4 ${index % 2 === 0 ? "text-green-400" : "text-blue-400"}`} />
                      <p className="text-gray-700 mb-4 italic text-lg">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className={`text-sm ${index % 2 === 0 ? "text-green-600" : "text-blue-600"}`}>
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

      {/* Blog Section - Gradient Card */}
      {data.blogTitle.trim() && (
        <section id="blog-section" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl p-12 shadow-xl border-2 border-teal-200">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                {data.blogTitle}
              </h2>
              {data.blogSummary && <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">{data.blogSummary}</p>}
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold shadow-lg transform hover:scale-105 transition-all"
              >
                Explore My Blog
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section - Rainbow Finale */}
      <section
        id="contact-section"
        className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 via-red-600 via-orange-600 via-yellow-600 via-green-600 via-blue-600 to-indigo-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-300/30 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-green-300/20 rounded-full animate-ping"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Something Amazing?</h2>
          {data.contactMessage && (
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">{data.contactMessage}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-yellow-100 font-semibold shadow-xl transform hover:scale-105 transition-all"
              asChild
            >
              <a href={`mailto:${data.contactEmail || data.email}`}>
                <Mail className="h-4 w-4 mr-2" />
                Let's Talk
              </a>
            </Button>
            {(data.contactPhone || data.phone) && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 font-semibold bg-transparent shadow-xl transform hover:scale-105 transition-all"
                asChild
              >
                <a href={`tel:${data.contactPhone || data.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Me
                </a>
              </Button>
            )}
          </div>

          <div className="text-purple-100">
            <p className="text-lg">{data.contactEmail || data.email}</p>
            {(data.contactPhone || data.phone) && <p className="text-lg">{data.contactPhone || data.phone}</p>}
          </div>
        </div>
      </section>
    </div>
  )
}
