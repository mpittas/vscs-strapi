'use client';

import Link from 'next/link';

const services = [
  {
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32 8C18.745 8 8 18.745 8 32C8 45.255 18.745 56 32 56"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32 56C45.255 56 56 45.255 56 32C56 18.745 45.255 8 32 8"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        <path
          d="M48 32L56 32M56 32L52 28M56 32L52 36"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 24C32 24 28 28 28 32C28 36 32 40 32 40C32 40 36 36 36 32C36 28 32 24 32 24Z"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 40V48"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Renewable Energy Source',
    href: '#',
  },
  {
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 44C20 44 16 44 16 40C16 36 20 32 20 32"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 48C28 48 20 48 20 40C20 32 28 28 28 28"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 52V28C36 28 44 32 44 40C44 48 36 52 36 52Z"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 24L44 16L48 20"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M48 16L52 24"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M40 12L44 8L48 12"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Environment Protection Plan',
    href: '#',
  },
  {
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="32"
          cy="32"
          r="20"
          stroke="#B8D935"
          strokeWidth="2"
        />
        <path
          d="M32 16V20"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M32 20C32 20 26 26 26 32C26 38 32 44 32 44C32 44 38 38 38 32C38 26 32 20 32 20Z"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 26L24 22"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M36 26L40 22"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Parts and Maintenance',
    href: '#',
  },
  {
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M28 48H24C24 48 20 48 20 44C20 40 24 36 24 36"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 48H40C40 48 48 48 48 40C48 32 40 28 40 28"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 28V16"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M28 20L32 16L36 20"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="28"
          y="48"
          width="8"
          height="8"
          stroke="#B8D935"
          strokeWidth="2"
        />
        <path
          d="M30 56V60"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M34 56V60"
          stroke="#B8D935"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Innovative Green Solutions',
    href: '#',
  },
];

export default function GreenPowerServices() {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: '#0a1628' }}>
      <div className="container">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <div>
            <span 
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
              style={{ color: '#94a3b8' }}
            >
              WHAT WE OFFER
            </span>
            <h2 
              className="text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: '#ffffff' }}
            >
              Our Green Power<br />Services
            </h2>
          </div>
          <div className="lg:pt-8">
            <p style={{ color: '#94a3b8' }} className="mb-4 leading-relaxed">
              Adipiscing elit, sed do euismod tempor incidunt ut labore et dolore 
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
              ullamco.
            </p>
            <p style={{ color: '#94a3b8' }} className="leading-relaxed">
              Adipiscing elit, sed do euismod tempor incidunt ut labore et dolore 
              magna aliqua. Ut enim ad minim veniam.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div key={index} className="group">
              {/* Icon */}
              <div className="mb-6">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 
                className="text-lg font-semibold mb-6 leading-snug"
                style={{ color: '#ffffff' }}
              >
                {service.title}
              </h3>
              
              {/* Arrow Link */}
              <Link 
                href={service.href}
                className="inline-flex items-center transition-transform group-hover:translate-x-1"
                style={{ color: '#B8D935' }}
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
