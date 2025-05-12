"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
  User,
  Code,
  Briefcase,
  Building,
  MessageSquare,
  GraduationCap,
  MapPin,
  Languages,
  Coffee,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project-card";
import SkillBadge from "@/components/skill-badge";
import ContactForm from "@/components/contact-form";
import { SidebarNav } from "@/components/sidebar-nav";
import { MobileHeader } from "@/components/mobile-header";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollToTop } from "@/components/scroll-to-top";
import AnimateInView from "@/components/animate-in-view";
import StaggeredAnimation, {
  StaggeredItem,
} from "@/components/staggered-animation";
import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { GridBackground } from "@/components/grid-background";
import { Footer } from "@/components/footer";
import ExperienceTimeline from "@/components/experience-timeline";
import TypingAnimation from "@/components/typing-animation";
import { useLoading } from "@/components/providers/loading-provider";
import PercentageLoadingIndicator from "@/components/percentage-loading-indicator";

export default function Home() {
  const [contentLoaded, setContentLoaded] = useState(false);
  const {
    startLoading,
    incrementProgress,
    completeLoading,
    isLoading,
    loadingProgress,
  } = useLoading();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update the simulateDataFetch function to ensure it completes properly

  // Simulate data fetching for demonstration purposes
  const simulateDataFetch = () => {
    setIsRefreshing(true);
    startLoading();

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      incrementProgress(10);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          completeLoading();
          setIsRefreshing(false);
        }, 300);
      }
    }, 300);
  };

  useEffect(() => {
    // Set content as loaded after a short delay
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {contentLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SidebarNav />
          <MobileHeader />
          <ScrollProgress />
          <ScrollToTop />

          {/* Show loading indicator for subsequent data fetching */}
          <PercentageLoadingIndicator
            progress={loadingProgress}
            isVisible={isLoading && !isRefreshing}
          />

          <main className="min-h-screen">
            {/* Hero Section */}
            <section
              id="home"
              className="relative py-20 md:py-28 px-4 overflow-hidden min-h-screen flex items-center"
            >
              <GridBackground
                highlightColor="#8b5cf6"
                interactive
                density="medium"
                showParticles
              />
              <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <AnimateInView animation="scale" duration={0.8} delay={0.3}>
                    <div className="flex justify-center md:justify-start">
                      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 animate-float animate-shadow">
                        <Image
                          src="/images/profile.jpg"
                          alt="Alpin Rezha profile photo"
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </AnimateInView>
                  <AnimateInView animation="slide-right" duration={0.7}>
                    <div className="space-y-6">
                      <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        Hi, I'm{" "}
                        <span className="text-primary relative">
                          Alpin
                          <motion.span
                            className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{
                              duration: 0.8,
                              delay: 0.5,
                              ease: "easeOut",
                            }}
                          />
                        </span>
                      </motion.h1>
                      <p className="text-xl italic">
                        <span className="text-primary font-medium">
                          <TypingAnimation
                            text={[
                              "Website Developer",
                              "Front-end Developer",
                              "Back-end Developer",
                              "UI/UX Enthusiast",
                            ]}
                            speed={80}
                            delay={2000}
                          />
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild>
                          <Link href="#contact">
                            Get in touch <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                      <div className="flex gap-4 pt-2">
                        <Link
                          href="https://github.com/mynameisalvn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                          href="https://linkedin.com/in/mynameisalpin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                          href="https://twitter.com/mynameisalvn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                          <span className="sr-only">Twitter</span>
                        </Link>
                      </div>
                    </div>
                  </AnimateInView>
                </div>
              </div>
            </section>

            {/* Rest of the page content remains the same */}
            {/* ... */}

            {/* About Me Section - Enhanced Design */}
            <section id="about" className="relative py-20 px-4">
              <GridBackground
                className="opacity-50"
                highlightColor="#8b5cf6"
                density="high"
              />
              <div className="container mx-auto max-w-6xl relative z-10">
                <SectionHeading
                  icon={<User className="h-7 w-7" />}
                  title="About Me"
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Bio */}
                  <AnimateInView
                    animation="slide-up"
                    delay={0.2}
                    className="lg:col-span-2"
                  >
                    <div className="bg-background/60 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 shadow-lg relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
                      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>

                      <h3 className="text-2xl font-bold mb-6 text-purple-500">
                        My Profile
                      </h3>

                      <div className="space-y-4 relative">
                        <p className="text-lg leading-relaxed">
                          I'm a passionate in becoming Web Developer. I
                          specialize in JavaScript, PHP, Laravel, and modern web
                          technologies.
                        </p>
                        <p className="text-lg leading-relaxed">
                          My approach to development focuses on creating clean,
                          efficient, and user-friendly solutions. I enjoy
                          tackling complex problems and turning them into
                          simple, beautiful interfaces.
                        </p>

                        <div className="mt-8 pt-6 border-t border-purple-500/20">
                          <h4 className="text-lg font-semibold mb-4">
                            What I bring to the table:
                          </h4>
                          <ul className="space-y-2">
                            <AnimateInView animation="slide-right" delay={0.3}>
                              <li className="flex items-center gap-2">
                                <span className="text-purple-500">
                                  <ChevronRight size={18} />
                                </span>
                                <span>Creative problem-solving skills</span>
                              </li>
                            </AnimateInView>
                            <AnimateInView animation="slide-right" delay={0.4}>
                              <li className="flex items-center gap-2">
                                <span className="text-purple-500">
                                  <ChevronRight size={18} />
                                </span>
                                <span>Attention to detail and clean code</span>
                              </li>
                            </AnimateInView>
                            <AnimateInView animation="slide-right" delay={0.5}>
                              <li className="flex items-center gap-2">
                                <span className="text-purple-500">
                                  <ChevronRight size={18} />
                                </span>
                                <span>
                                  Passion for learning new technologies
                                </span>
                              </li>
                            </AnimateInView>
                            <AnimateInView animation="slide-right" delay={0.6}>
                              <li className="flex items-center gap-2">
                                <span className="text-purple-500">
                                  <ChevronRight size={18} />
                                </span>
                                <span>Collaborative team player mindset</span>
                              </li>
                            </AnimateInView>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AnimateInView>

                  {/* Right Column - Info Cards */}
                  <div className="space-y-6">
                    <StaggeredAnimation staggerDelay={0.15}>
                      <StaggeredItem>
                        <div className="bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                              <GraduationCap size={24} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                Education
                              </h3>
                              <p className="text-muted-foreground">
                                Bachelor of Computer Science, Institute of
                                Business and Technology Indonesia
                              </p>
                            </div>
                          </div>
                        </div>
                      </StaggeredItem>

                      <StaggeredItem>
                        <div className="bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                              <MapPin size={24} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                Location
                              </h3>
                              <p className="text-muted-foreground">
                                Bali, Indonesia
                              </p>
                            </div>
                          </div>
                        </div>
                      </StaggeredItem>

                      <StaggeredItem>
                        <div className="bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                              <Languages size={24} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                Languages
                              </h3>
                              <p className="text-muted-foreground">
                                Indonesia (Native), English (Intermediate)
                              </p>
                            </div>
                          </div>
                        </div>
                      </StaggeredItem>

                      <StaggeredItem>
                        <div className="bg-background/60 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-500/10 p-3 rounded-lg text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                              <Coffee size={24} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                Interests
                              </h3>
                              <p className="text-muted-foreground">
                                Web Development, UI/UX Design, Technology
                              </p>
                            </div>
                          </div>
                        </div>
                      </StaggeredItem>
                    </StaggeredAnimation>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="relative py-20 px-4">
              <GridBackground
                className="opacity-30"
                highlightColor="#8b5cf6"
                density="medium"
              />
              <div className="container mx-auto max-w-6xl relative z-10">
                <SectionHeading
                  icon={<Code className="h-7 w-7" />}
                  title="Skills & Expertise"
                />

                <StaggeredAnimation
                  className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  staggerDelay={0.15}
                >
                  <StaggeredItem>
                    <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border/50">
                      <h3 className="text-xl font-semibold mb-4">
                        Frontend Development
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <SkillBadge name="Bootstrap" />
                        <SkillBadge name="JavaScript" />
                        <SkillBadge name="React" />
                      </div>
                    </div>
                  </StaggeredItem>

                  <StaggeredItem>
                    <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border/50">
                      <h3 className="text-xl font-semibold mb-4">
                        Backend Development
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <SkillBadge name="Node.js" />
                        <SkillBadge name="Laravel" />
                        <SkillBadge name="MySQL" />
                        <SkillBadge name="PHP" />
                      </div>
                    </div>
                  </StaggeredItem>

                  <StaggeredItem>
                    <div className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border/50">
                      <h3 className="text-xl font-semibold mb-4">
                        Tools & Others
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <SkillBadge name="Git" />
                        <SkillBadge name="Figma" />
                      </div>
                    </div>
                  </StaggeredItem>
                </StaggeredAnimation>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="relative py-20 px-4">
              <GridBackground
                className="opacity-50"
                highlightColor="#8b5cf6"
                density="low"
              />
              <div className="container mx-auto max-w-6xl relative z-10">
                <SectionHeading
                  icon={<Building className="h-7 w-7" />}
                  title="Work Experience"
                />

                <div className="max-w-4xl mx-auto">
                  <ExperienceTimeline
                    experiences={[
                      {
                        title: "Web Developer",
                        company: "Gana IT Consultant - Internship",
                        companyUrl: "https://www.ganaitconsultant.com/",
                        location: "Bali, Indonesia",
                        period: "Jan 2022 - Dec 2022",
                        description:
                          "Developed and maintained multiple web applications for clients across various industries. Worked on both frontend and backend aspects of projects.\n\nKey responsibilities included:\n• Building responsive user interfaces\n• Implementing backend functionality\n• Database design and optimization\n• Collaborating with design and product teams",
                        technologies: [
                          "JavaScript",
                          "PHP",
                          "MySQL",
                          "Laravel",
                          "Git",
                        ],
                        logo: "/images/companies/gana-it.png",
                      },
                    ]}
                  />
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="relative py-20 px-4">
              <GridBackground
                className="opacity-30"
                highlightColor="#8b5cf6"
                density="medium"
              />
              <div className="container mx-auto max-w-6xl relative z-10">
                <SectionHeading
                  icon={<Briefcase className="h-7 w-7" />}
                  title="Featured Projects"
                />

                <StaggeredAnimation
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  staggerDelay={0.1}
                >
                  <StaggeredItem>
                    <ProjectCard
                      title="Guess Number Games"
                      description="Simple game about guessing number between 1-20 using JavaScript"
                      image="/images/projects/guess-number-game.png"
                      technologies={["JavaScript", "CSS"]}
                      demoUrl="https://mynameisalvn.github.io/guess-number-games/"
                      codeUrl="https://github.com/mynameisalvn/guess-number-games"
                    />
                  </StaggeredItem>

                  <StaggeredItem>
                    <ProjectCard
                      title="FitSync - Tracking Workout"
                      description="A map tracking workout (Running, Cycling) contain distance, duration, cadence (steps), elev gain (meters)."
                      image="/images/projects/fitsync.jpg"
                      technologies={["Javascript", "CSS", "Leaflet"]}
                      demoUrl="https://fitsync-work.netlify.app/"
                      codeUrl="https://github.com/mynameisalvn/fitsync-workout"
                    />
                  </StaggeredItem>

                  <StaggeredItem>
                    <ProjectCard
                      title="Portfolio Website"
                      description="A responsive portfolio website showcasing projects and skills with a modern design."
                      image="/images/work-in-progress.jpeg"
                      technologies={["Next.js", "TypeScript", "Framer Motion"]}
                      demoUrl="https://example.com"
                      codeUrl="https://github.com"
                    />
                  </StaggeredItem>

                  <StaggeredItem>
                    <ProjectCard
                      title="Weather Dashboard"
                      description="A weather application that displays current and forecasted weather data for any location."
                      image="/images/work-in-progress.jpeg"
                      technologies={["React", "OpenWeather API", "Chart.js"]}
                      demoUrl="https://example.com"
                      codeUrl="https://github.com"
                    />
                  </StaggeredItem>

                  <StaggeredItem>
                    <ProjectCard
                      title="Blog Platform"
                      description="A content management system for creating and publishing blog posts with user authentication."
                      image="/images/work-in-progress.jpeg"
                      technologies={["Node.js", "Express", "MongoDB", "React"]}
                      demoUrl="https://example.com"
                      codeUrl="https://github.com"
                    />
                  </StaggeredItem>

                  <StaggeredItem>
                    <ProjectCard
                      title="Fitness Tracker"
                      description="An application to track workouts, set goals, and visualize progress over time."
                      image="/images/work-in-progress.jpeg"
                      technologies={["React Native", "Redux", "Firebase"]}
                      demoUrl="https://example.com"
                      codeUrl="https://github.com"
                    />
                  </StaggeredItem>
                </StaggeredAnimation>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative py-20 px-4">
              <GridBackground
                className="opacity-50"
                highlightColor="#8b5cf6"
                density="high"
              />
              <div className="container mx-auto max-w-6xl relative z-10">
                <SectionHeading
                  icon={<MessageSquare className="h-7 w-7" />}
                  title="Get In Touch"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AnimateInView
                    animation="slide-up"
                    delay={0.3}
                    className="bg-card/80 backdrop-blur-sm rounded-xl shadow-sm p-8 border border-border/50"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                          Open To Work
                        </div>
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/10 mb-6">
                          <Image
                            src="/images/profile.jpg"
                            alt="Alpin Rezha profile photo"
                            width={160}
                            height={160}
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="text-center mb-8">
                        <p className="text-muted-foreground mb-6">
                          My inbox is always open, if you have a project to work
                          on together or just to say hello. Feel free to contact
                          me and I will get back to you.
                        </p>
                      </div>

                      <div className="flex justify-center gap-6">
                        <Link
                          href="https://github.com/mynameisalvn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Github className="h-6 w-6" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                          href="https://linkedin.com/in/mynameisalpin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Linkedin className="h-6 w-6" />
                          <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link
                          href="https://instagram.com/mynameisalvn"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Twitter className="h-6 w-6" />
                          <span className="sr-only">Instagram</span>
                        </Link>
                        <Link
                          href="mailto:alpinrezhamulyadi07@gmail.com"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Mail className="h-6 w-6" />
                          <span className="sr-only">Email</span>
                        </Link>
                      </div>
                    </div>
                  </AnimateInView>

                  <AnimateInView
                    animation="slide-up"
                    delay={0.5}
                    className="bg-card/80 backdrop-blur-sm rounded-xl shadow-sm p-8 border border-border/50"
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2">
                        Send Me a Message
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Fill out the form below to get in touch with me.
                      </p>
                      <ContactForm />
                    </div>
                  </AnimateInView>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
