"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ModernTemplate from "@/components/templates/modern-template"
import CreativeTemplate from "@/components/templates/creative-template"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import DeleteProfileButton from "@/components/delete-profile-button"

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

// Mock data for demonstration - matches homepage mock data
const mockData: { [key: string]: ProfileData } = {
  "mock-1": {
    id: "mock-1",
    template: "modern",
    name: "Emma Foster",
    title: "Full Stack Developer",
    tagline: "Building the future with clean code",
    profileImage: "/placeholder.svg?height=400&width=400",
    bio: "Passionate developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and cloud technologies. I love solving complex problems and creating user-friendly solutions that make a real impact.",
    email: "emma.foster@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/emmafoster" },
      { platform: "GitHub", url: "https://github.com/emmafoster" },
      { platform: "Twitter", url: "https://twitter.com/emmafoster" },
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL", "Docker", "Kubernetes"],
    services: [
      {
        title: "Web Development",
        description:
          "Full-stack web application development using modern technologies like React, Node.js, and cloud platforms.",
      },
      {
        title: "API Development",
        description: "RESTful and GraphQL API development with proper authentication, validation, and documentation.",
      },
      {
        title: "Cloud Solutions",
        description: "Cloud architecture and deployment using AWS, Docker, and Kubernetes for scalable applications.",
      },
    ],
    portfolio: [
      {
        title: "E-commerce Platform",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      },
      {
        title: "Task Management App",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "A collaborative task management application with real-time updates, built using React, Socket.io, and PostgreSQL.",
      },
      {
        title: "Analytics Dashboard",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "A comprehensive analytics dashboard for tracking business metrics, built with React, D3.js, and Express.js.",
      },
    ],
    testimonials: [
      {
        name: "John Smith",
        role: "CTO at TechCorp",
        quote:
          "Emma delivered an exceptional web application that exceeded our expectations. Her attention to detail and technical expertise are outstanding.",
      },
      {
        name: "Sarah Johnson",
        role: "Product Manager at StartupXYZ",
        quote:
          "Working with Emma was a pleasure. She understood our requirements perfectly and delivered a robust solution on time.",
      },
    ],
    blogTitle: "Tech Insights",
    blogSummary: "Sharing insights about web development, cloud technologies, and industry best practices.",
    contactMessage:
      "Let's work together to bring your ideas to life! I'm always excited to take on new challenges and create amazing digital experiences.",
    contactEmail: "emma.foster@example.com",
    contactPhone: "+1 (555) 123-4567",
  },
  "mock-2": {
    id: "mock-2",
    template: "modern",
    name: "Jennifer Park",
    title: "Software Engineer",
    tagline: "Crafting robust backend solutions",
    profileImage: "/placeholder.svg?height=400&width=400",
    bio: "Experienced software engineer with 4+ years specializing in backend systems and API development. I focus on performance optimization and scalable architecture to build systems that can handle millions of users.",
    email: "jennifer.park@example.com",
    phone: "+1 (555) 987-6543",
    location: "Seattle, WA",
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/jenniferpark" },
      { platform: "GitHub", url: "https://github.com/jenniferpark" },
    ],
    skills: ["Python", "Java", "PostgreSQL", "Docker", "Kubernetes", "Redis", "Microservices", "System Design"],
    services: [
      {
        title: "Backend Development",
        description: "Scalable backend systems using Python, Java, and modern database technologies.",
      },
      {
        title: "System Architecture",
        description: "Design and implementation of microservices architecture and distributed systems.",
      },
      {
        title: "Performance Optimization",
        description: "Database optimization, caching strategies, and system performance tuning.",
      },
    ],
    portfolio: [
      {
        title: "Microservices Platform",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "A scalable microservices platform handling 1M+ requests daily, built with Python, Docker, and Kubernetes.",
      },
      {
        title: "Real-time Chat System",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "High-performance real-time messaging system supporting 100K+ concurrent users using WebSockets and Redis.",
      },
      {
        title: "Data Processing Pipeline",
        image: "/placeholder.svg?height=300&width=400",
        description: "Automated data processing pipeline handling TB of data daily using Apache Kafka and Python.",
      },
    ],
    testimonials: [
      {
        name: "Mike Chen",
        role: "Engineering Manager at DataFlow",
        quote:
          "Jennifer's expertise in backend systems is exceptional. She built a system that scaled seamlessly as our user base grew 10x.",
      },
    ],
    blogTitle: "Backend Engineering",
    blogSummary: "Deep dives into backend architecture, performance optimization, and scalable system design.",
    contactMessage:
      "Ready to build scalable systems together? Let's discuss how I can help optimize your backend infrastructure.",
    contactEmail: "jennifer.park@example.com",
    contactPhone: "+1 (555) 987-6543",
  },
  "mock-3": {
    id: "mock-3",
    template: "creative",
    name: "Kevin Brown",
    title: "UI Designer",
    tagline: "Designing experiences that matter",
    profileImage: "/placeholder.svg?height=400&width=400",
    bio: "Creative UI designer with 3+ years of experience creating user-centered designs and beautiful interfaces. I believe great design should be both functional and visually appealing, always putting the user first.",
    email: "kevin.brown@example.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    socials: [
      { platform: "Dribbble", url: "https://dribbble.com/kevinbrown" },
      { platform: "Behance", url: "https://behance.net/kevinbrown" },
      { platform: "LinkedIn", url: "https://linkedin.com/in/kevinbrown" },
    ],
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems", "Wireframing", "UI/UX"],
    services: [
      {
        title: "UI/UX Design",
        description: "Complete user interface and experience design from wireframes to high-fidelity prototypes.",
      },
      {
        title: "Design Systems",
        description: "Creating comprehensive design systems and component libraries for consistent user experiences.",
      },
      {
        title: "User Research",
        description:
          "User interviews, usability testing, and data-driven design decisions to optimize user experience.",
      },
    ],
    portfolio: [
      {
        title: "Mobile Banking App",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Complete UI/UX redesign of a mobile banking app, improving user satisfaction by 40% and reducing support tickets by 60%.",
      },
      {
        title: "SaaS Dashboard",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Modern dashboard design for a SaaS platform with complex data visualization and intuitive navigation.",
      },
      {
        title: "E-learning Platform",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "User-friendly e-learning platform design focused on engagement and accessibility for all age groups.",
      },
    ],
    testimonials: [
      {
        name: "Lisa Rodriguez",
        role: "Product Manager at FinTech Solutions",
        quote:
          "Kevin's design work transformed our app completely. User engagement increased by 50% after implementing his designs.",
      },
      {
        name: "David Kim",
        role: "CEO at EduTech",
        quote:
          "Kevin has an incredible eye for detail and user experience. His designs are both beautiful and highly functional.",
      },
    ],
    blogTitle: "Design Thoughts",
    blogSummary: "Exploring the latest trends in UI/UX design, design systems, and user research methodologies.",
    contactMessage:
      "Let's create something beautiful together! I'm passionate about designing experiences that users love.",
    contactEmail: "kevin.brown@example.com",
    contactPhone: "+1 (555) 456-7890",
  },
  "mock-4": {
    id: "mock-4",
    template: "modern",
    name: "Lisa Wang",
    title: "AI Engineer",
    tagline: "Bringing AI to life",
    profileImage: "/placeholder.svg?height=400&width=400",
    bio: "AI engineer with 6+ years of experience in machine learning and data science. I develop intelligent systems that help businesses make data-driven decisions and automate complex processes using cutting-edge AI technologies.",
    email: "lisa.wang@example.com",
    phone: "+1 (555) 321-0987",
    location: "Austin, TX",
    socials: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/lisawang" },
      { platform: "GitHub", url: "https://github.com/lisawang" },
      { platform: "Kaggle", url: "https://kaggle.com/lisawang" },
    ],
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Machine Learning",
      "Data Science",
      "Deep Learning",
      "NLP",
      "Computer Vision",
    ],
    services: [
      {
        title: "Machine Learning Solutions",
        description:
          "Custom ML models for prediction, classification, and recommendation systems tailored to your business needs.",
      },
      {
        title: "AI Consulting",
        description:
          "Strategic AI consulting to identify opportunities and implement AI solutions that drive business value.",
      },
      {
        title: "Data Science",
        description:
          "End-to-end data science projects from data collection and analysis to model deployment and monitoring.",
      },
    ],
    portfolio: [
      {
        title: "Recommendation Engine",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Built a recommendation engine that increased user engagement by 35% using collaborative filtering and deep learning.",
      },
      {
        title: "Computer Vision System",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Developed a computer vision system for quality control in manufacturing, achieving 99.2% accuracy.",
      },
      {
        title: "NLP Chatbot",
        image: "/placeholder.svg?height=300&width=400",
        description:
          "Created an intelligent chatbot using NLP and transformer models, handling 80% of customer queries automatically.",
      },
    ],
    testimonials: [
      {
        name: "Robert Chen",
        role: "CTO at AI Innovations",
        quote:
          "Lisa's expertise in AI is remarkable. She delivered a machine learning solution that exceeded our performance expectations.",
      },
      {
        name: "Amanda Foster",
        role: "Data Director at RetailTech",
        quote:
          "Working with Lisa was fantastic. Her recommendation system increased our sales by 25% within the first quarter.",
      },
    ],
    blogTitle: "AI Insights",
    blogSummary:
      "Exploring the latest developments in artificial intelligence, machine learning, and their practical applications.",
    contactMessage:
      "Ready to harness the power of AI for your business? Let's discuss how machine learning can solve your challenges.",
    contactEmail: "lisa.wang@example.com",
    contactPhone: "+1 (555) 321-0987",
  },
}

const PortfolioPage = () => {
  const params = useParams()
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = () => {
      try {
        // Try to load from localStorage first
        const stored = localStorage.getItem(`profile_${params.id}`)
        if (stored) {
          setProfileData(JSON.parse(stored))
        } else if (mockData[params.id as string]) {
          // Use mock data if available
          setProfileData(mockData[params.id as string])
        } else {
          // Fallback to first mock profile
          setProfileData(mockData["mock-1"])
        }
      } catch (error) {
        console.error("Error loading profile:", error)
        setProfileData(mockData["mock-1"])
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Not Found</h1>
          <p className="text-gray-600 mb-4">The requested portfolio could not be found.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const renderTemplate = () => {
    switch (profileData.template) {
      case "modern":
        return <ModernTemplate data={profileData} />
      case "creative":
        return <CreativeTemplate data={profileData} />
      default:
        return <ModernTemplate data={profileData} />
    }
  }

  return (
    <div className="relative">
      {/* Floating Action Buttons */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <Link href={`/edit/${profileData.id}`}>
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
        <DeleteProfileButton profileId={profileData.id} profileName={profileData.name} />
      </div>

      {/* Portfolio Content */}
      {renderTemplate()}
    </div>
  )
}

export default PortfolioPage
