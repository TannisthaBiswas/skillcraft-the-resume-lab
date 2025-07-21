import resumePreview from "@/assets/resume-preview.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles, // For AI-powered
  ShieldCheck, // For ATS compliance/professionalism
  LayoutTemplate, // For templates/design
  Workflow, // For effortless workflow
} from "lucide-react"; // Import relevant Lucide icons

// Define your features with icons, titles, and descriptions
const features = [
  {
    icon: Sparkles,
    title: "Strategic AI Matching",
    description: "Our intelligent AI uncovers hidden keyword opportunities, perfectly aligning your skills with job requirements.",
  },
  {
    icon: ShieldCheck,
    title: "ATS Domination",
    description: "Get past the bots and straight to human eyes with professionally crafted, Applicant Tracking System-friendly designs.",
  },
  {
    icon: LayoutTemplate,
    title: "Designer-Quality Aesthetics",
    description: "Choose from a curated collection of modern, visually stunning templates that make an unforgettable impression.",
  },
  {
    icon: Workflow,
    title: "Accelerated Creation",
    description: "Go from a blank page to a polished, professional resume in record time, with an intuitive, guided process.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 pb-16 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20 px-5 md:py-28 lg:py-36 bg-gradient-to-br from-indigo-700 to-violet-600 text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-10 md:flex-row md:text-left lg:gap-16">
          <div className="max-w-xl space-y-6 text-center md:text-left">
            {/* Logo (if uncommented) */}
            {/* <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="mx-auto md:mx-0"
            /> */}
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Unlock Your{" "}
              <span className="inline-block bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                Interview-Winning Profile
              </span>{" "}
              in Minutes
            </h1>
            <p className="text-lg text-indigo-100 opacity-90 leading-relaxed">
              Our <span className="font-bold">AI-powered resume builder</span> transforms your experience into a strategically optimized document, giving you an unfair advantage in every job application.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 hover:text-indigo-800 font-semibold shadow-lg">
                <Link href="/resumes">Launch Your Career</Link>
              </Button>
              {/* <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-700 font-semibold shadow-lg">
                <Link href="/editor">Witness the AI</Link>
              </Button> */}
            </div>
          </div>
          <div className="relative z-10 p-4 rounded-xl shadow-2xl bg-white/20 backdrop-blur-sm"> {/* Added some styling to the image container */}
            <Image
              src={resumePreview}
              alt="Resume preview"
              width={600}
              height={800} // Added height for better aspect ratio control
              className="rounded-lg shadow-xl ring-4 ring-white/50 lg:rotate-[1.5deg] transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        {/* Abstract background shapes/gradients for visual interest (optional) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-indigo-500 opacity-20 blur-3xl z-0"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/3 h-1/3 rounded-full bg-violet-400 opacity-15 blur-3xl z-0"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-5 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-800">
              Your Unfair Advantage in the Job Market
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your potential into undeniable proof. Our platform ensures every word counts towards your next big opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-4 p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional: Call to Action Section (if needed, otherwise hero CTA is sufficient) */}
      <section className="w-full py-16 px-5 bg-indigo-50">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-800">
            Your Next Career Chapter Starts Now
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stop passively applying and start actively winning. Generate a resume that truly reflects your potential.
          </p>
          <Button asChild size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl transition-all duration-300">
            <Link href="/resumes">Create Your Winning Resume</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}