import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SolarTech Solutions - our mission to power a sustainable future with premium solar energy solutions. 15+ years of experience, 10,000+ installations.",
};

// Team members
const team = [
  {
    name: "David Chen",
    role: "CEO & Founder",
    bio: "20+ years in renewable energy, passionate about making solar accessible to everyone.",
  },
  {
    name: "Sarah Martinez",
    role: "Chief Technology Officer",
    bio: "Former Tesla engineer, leads our innovation in solar efficiency and smart monitoring.",
  },
  {
    name: "Michael Thompson",
    role: "Head of Operations",
    bio: "Oversees 200+ certified installers and ensures every project meets our quality standards.",
  },
  {
    name: "Emily Rodriguez",
    role: "Customer Success Director",
    bio: "Dedicated to making the solar journey seamless from consultation to installation.",
  },
];

// Values
const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Quality First",
    description: "We use only premium Tier-1 solar panels and components with industry-leading warranties.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Customer Focus",
    description: "Your satisfaction drives everything we do. We're not done until you're delighted.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Sustainability",
    description: "We're committed to reducing carbon emissions and building a greener future.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Innovation",
    description: "We continuously adopt the latest technologies to deliver maximum efficiency.",
  },
];

// Timeline milestones
const milestones = [
  { year: "2010", title: "Company Founded", description: "Started with a vision to make solar energy accessible to all." },
  { year: "2015", title: "1,000 Installations", description: "Reached our first major milestone in residential solar." },
  { year: "2018", title: "Commercial Expansion", description: "Launched our commercial solar division for businesses." },
  { year: "2021", title: "10,000 Installations", description: "Became the leading solar provider in California." },
  { year: "2024", title: "National Expansion", description: "Expanded operations to 15 states across the US." },
];

// Certifications
const certifications = [
  "NABCEP Certified",
  "Tesla Powerwall Certified",
  "SunPower Elite Dealer",
  "BBB A+ Rating",
  "EPA Green Partner",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solar-orange/10 border border-solar-orange/20 text-solar-orange text-sm font-medium mb-6">
              About SolarTech Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Powering a{" "}
              <span className="text-gradient-solar">Sustainable Future</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl">
              For over 15 years, we&apos;ve been helping homeowners and businesses 
              harness the power of the sun. Our mission is simple: make clean energy 
              accessible, affordable, and reliable for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title mb-6">Our Mission</h2>
              <p className="text-lg text-muted mb-6">
                At SolarTech Solutions, we believe that clean energy isn&apos;t just 
                good for the planet—it&apos;s good for your wallet too. Our mission is 
                to accelerate the transition to sustainable energy by making solar 
                power accessible, affordable, and hassle-free.
              </p>
              <p className="text-lg text-muted mb-8">
                We&apos;re not just installing solar panels; we&apos;re building a 
                movement towards energy independence. Every installation brings us 
                one step closer to a world powered by clean, renewable energy.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="text-4xl font-bold text-gradient-solar mb-2">15+</div>
                  <div className="text-muted">Years Experience</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <div className="text-4xl font-bold text-gradient-solar mb-2">200+</div>
                  <div className="text-muted">Certified Installers</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl gradient-solar p-1">
                <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-6">☀️</div>
                    <p className="text-2xl font-bold text-white mb-2">
                      50+ Million kWh
                    </p>
                    <p className="text-slate-400">
                      Clean energy generated annually
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 rounded-2xl gradient-solar flex items-center justify-center text-white mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Journey</h2>
            <p className="section-subtitle">
              From humble beginnings to industry leaders.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2" />
              
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full gradient-solar transform -translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`pl-20 md:pl-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="card">
                      <div className="text-solar-orange font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                      <p className="text-muted">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Meet Our Leadership</h2>
            <p className="section-subtitle">
              The passionate people behind SolarTech Solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center group">
                <div className="w-24 h-24 rounded-full gradient-solar flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-solar-orange font-medium mb-4">{member.role}</p>
                <p className="text-muted text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Trusted & Certified</h2>
            <p className="section-subtitle">
              Industry-leading certifications and partnerships.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 font-medium text-slate-700 dark:text-slate-300"
              >
                ✓ {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Join the Solar Revolution?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Let&apos;s discuss how solar can work for your home or business.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg">
                Get Started Today
              </Button>
              <Button href="/blog" variant="secondary" size="lg">
                Read Our Blog
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
