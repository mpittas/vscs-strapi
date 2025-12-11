import Link from "next/link";
import Button from "@/components/ui/Button";

// Features data
const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Save Up to 70%",
    description: "Dramatically reduce your monthly electricity bills with our high-efficiency solar panels.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Eco-Friendly",
    description: "Reduce your carbon footprint and contribute to a cleaner, greener planet for future generations.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "25-Year Warranty",
    description: "Industry-leading warranty coverage ensures your investment is protected for decades.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Energy Independence",
    description: "Generate your own clean power and protect yourself from rising utility costs.",
  },
];

// Services data
const services = [
  {
    title: "Residential Solar",
    description: "Custom solar solutions designed for homes of all sizes. From consultation to installation, we handle everything.",
    image: "🏠",
    features: ["Free Energy Assessment", "Custom System Design", "Professional Installation", "Monitoring Setup"],
  },
  {
    title: "Commercial Solar",
    description: "Scalable solar systems for businesses looking to reduce operating costs and boost sustainability.",
    image: "🏢",
    features: ["ROI Analysis", "Project Financing", "Large-Scale Installation", "Maintenance Plans"],
  },
  {
    title: "Solar Maintenance",
    description: "Keep your system running at peak efficiency with our comprehensive maintenance and monitoring services.",
    image: "🔧",
    features: ["Regular Inspections", "Panel Cleaning", "Performance Monitoring", "Rapid Repairs"],
  },
];

// Stats data
const stats = [
  { value: "10,000+", label: "Installations Completed" },
  { value: "70%", label: "Average Energy Savings" },
  { value: "25", label: "Years Warranty" },
  { value: "99.9%", label: "Customer Satisfaction" },
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner, California",
    content: "Switching to solar was the best decision we made. Our electricity bills dropped by 80% and the installation team was incredibly professional.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Business Owner",
    content: "SolarTech helped us reduce our operating costs significantly. The ROI has exceeded our expectations and our customers love our green initiative.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Homeowner, Texas",
    content: "From the initial consultation to the final installation, the entire process was seamless. Highly recommend SolarTech to anyone considering solar!",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solar-orange/10 border border-solar-orange/20 text-solar-orange text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-solar-orange animate-pulse" />
                #1 Solar Provider in California
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Power Your Future with{" "}
                <span className="text-gradient-solar">Clean Solar Energy</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-xl">
                Transform your home or business with premium solar panel solutions. 
                Save up to 70% on energy bills while contributing to a sustainable planet.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Button href="/contact" size="lg">
                  Get Free Quote
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
                <Button href="/about" variant="secondary" size="lg">
                  Learn More
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-solar-orange to-solar-amber border-2 border-slate-800" />
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">10,000+ Happy Customers</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-solar-amber" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-slate-400 text-sm ml-2">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square animate-float">
                {/* Sun illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full gradient-solar animate-glow flex items-center justify-center">
                    <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                {/* Orbiting elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-8 right-8 w-16 h-16 rounded-xl bg-slate-800/80 backdrop-blur flex items-center justify-center text-3xl">
                    🏠
                  </div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 rounded-xl bg-slate-800/80 backdrop-blur flex items-center justify-center text-3xl">
                    ⚡
                  </div>
                  <div className="absolute top-1/2 left-0 w-16 h-16 rounded-xl bg-slate-800/80 backdrop-blur flex items-center justify-center text-3xl">
                    🌱
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient-solar mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Why Choose Solar?</h2>
            <p className="section-subtitle">
              Join thousands of homeowners and businesses who are saving money 
              while making a positive impact on the environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl gradient-solar flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-slate-50 dark:bg-slate-800/50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive solar solutions tailored to your specific needs 
              and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card group">
                <div className="text-6xl mb-6">{service.image}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-eco-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white dark:bg-slate-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Don&apos;t just take our word for it - hear from our satisfied customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-solar-amber" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-solar flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Saving with Solar?
            </h2>
            <p className="text-xl text-slate-300 mb-10">
              Get a free, no-obligation quote today and discover how much you could save 
              with solar power. Our experts are ready to design the perfect system for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg">
                Get Your Free Quote
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button href="tel:1-800-SOLAR-TECH" variant="secondary" size="lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
