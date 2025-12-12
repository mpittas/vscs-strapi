import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  company: [
    { label: 'За Нас', href: '/about' },
    { label: 'Нашият Екип', href: '/about#team' },
    { label: 'Кариери', href: '/careers' },
    { label: 'Контакти', href: '/contact' },
  ],
  services: [
    { label: 'Фотоволтаични Системи', href: '/services/photovoltaic' },
    { label: 'Соларни Паркове', href: '/services/solar-parks' },
    { label: 'Поддръжка', href: '/services/maintenance' },
    { label: 'Консултации', href: '/services/consultation' },
  ],
  resources: [
    { label: 'Блог', href: '/blog' },
    { label: 'Въпроси', href: '/faq' },
    { label: 'Калкулатор', href: '/calculator' },
    { label: 'Референции', href: '/testimonials' },
  ],
};

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M2 4a2 2 0 114 0 2 2 0 01-4 0z' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/logo/vscs-logo-full-hor.svg"
              alt="VSCS Logo"
              width={180}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              Вашият надежден партньор в соларната енергия. Изграждаме бъдеще 
              с чиста и устойчива енергия.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-solar-orange transition-colors group"
                  aria-label={social.label}
                >
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={social.icon}
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-solar-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-solar-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Ресурси</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-solar-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Телефон</p>
                <p className="text-white font-medium">+359 888 123 456</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Имейл</p>
                <p className="text-white font-medium">info@bikocontrol.bg</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                <svg className="w-5 h-5 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-400">Адрес</p>
                <p className="text-white font-medium">София, България</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} БиКо Контрол Строително. Всички права запазени.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors">
              Поверителност
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 transition-colors">
              Условия за ползване
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
