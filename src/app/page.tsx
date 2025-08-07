import resumePreview from "@/assets/resume-preview.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles, // For AI-powered
  ShieldCheck, // For ATS compliance/professionalism
  LayoutTemplate, // For templates/design
  Workflow, // For effortless workflow
  Lightbulb, // For AI guidance
  FileText, // For cover letter
  Palette, // For themes/colors
  Download, // For PDF extraction
} from "lucide-react"; // Import relevant Lucide icons
import PricingSection from "@/components/premium/PricingSection";

// Define your features with icons, titles, and descriptions
const features = [
  {
    icon: Sparkles,
    title: "AI Keyword Optimization",
    description: "Our AI finds the best keywords to match your skills with job requirements, making your resume highly visible.",
  },
  {
    icon: ShieldCheck,
    title: "ATS-Friendly Designs",
    description: "Create resumes that easily pass Applicant Tracking Systems (ATS), ensuring hiring managers see your application.",
  },
  {
    icon: Lightbulb,
    title: "AI-Powered Content Creation",
    description: "Get smart suggestions and AI assistance to write impactful job descriptions, summaries, and achievements.",
  },
  {
    icon: LayoutTemplate,
    title: "Modern Template Selection",
    description: "Choose from a range of professionally designed, visually appealing templates that leave a strong impression.",
  },
  {
    icon: FileText,
    title: "Automated Cover Letters",
    description: "Generate tailored cover letters instantly, perfectly matching your resume and the job you're applying for.",
  },
  {
    icon: Palette,
    title: "Customizable Themes & Colors",
    description: "Personalize your resume's look with various themes and color options to reflect your unique professional brand.",
  },
  {
    icon: Download,
    title: "Easy PDF Resume Import",
    description: "Convert your existing PDF resumes into an editable format, saving you time and effort in rebuilding.",
  },
  {
    icon: Workflow,
    title: "Fast & Guided Creation",
    description: "Build a polished, professional resume quickly with our intuitive, step-by-step guided process.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 pb-16 text-gray-900">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20 px-5 md:py-28 lg:py-36 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-10 md:flex-row md:text-left lg:gap-16">
          <div className="max-w-xl space-y-6 text-center md:text-left">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Forge Your{" "}
              <span className="inline-block bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                Future-Ready Profile
              </span>{" "}
              in Hyper-Speed
            </h1>
            <p className="text-lg text-purple-100 opacity-90 leading-relaxed">
              Our <span className="font-bold">cutting-edge AI-powered platform</span> revolutionizes your job search, transforming your potential into a strategically optimized, interview-magnet document.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100 hover:text-purple-800 font-semibold shadow-lg">
                <Link href="/resumes">Launch Your Ascent</Link>
              </Button>
            </div>
          </div>
          <div className="relative z-10 p-4 rounded-xl shadow-2xl bg-white/20 backdrop-blur-sm">
            <Image
              src={resumePreview}
              alt="Resume preview"
              width={600}
              height={800}
              className="rounded-lg shadow-xl ring-4 ring-white/50 lg:rotate-[1.5deg] transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-purple-500 opacity-20 blur-3xl z-0"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/3 h-1/3 rounded-full bg-violet-400 opacity-15 blur-3xl z-0"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-5 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-800">
              Your Quantum Leap in the Job Market
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unleash your full potential and dominate the hiring landscape. Our platform ensures every byte of your profile propels you towards your next breakthrough opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="mb-4 p-3 rounded-full bg-purple-100 text-purple-600">
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

      {/* Pricing/Subscription Section */}
      
<PricingSection />
      


      {/* Call to Action Section */}
      <section className="w-full py-16 px-5 bg-purple-50">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-800">
            Your Next Career Chapter Ignites Now
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stop merely applying and start conquering. Generate a resume that truly reflects your unparalleled potential and propels you into the future.
          </p>
          <Button asChild size="lg" className="bg-purple-600 text-white hover:bg-purple-700 hover:shadow-xl transition-all duration-300">
            <Link href="/resumes">Create Your Winning Resume</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}