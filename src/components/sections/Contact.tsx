import { contactInfo } from "@/data/homepage";
import { LocationIcon, PhoneIcon, EmailIcon } from "@/components/ui/Icons";

export default function Contact() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-solar-orange font-semibold text-sm uppercase tracking-wider">Контакти</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-2">
            Свържете се с нас
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-solar-orange/10 flex items-center justify-center text-solar-orange flex-shrink-0">
                <LocationIcon />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Адрес</h3>
                <p className="text-slate-600">{contactInfo.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-solar-orange/10 flex items-center justify-center text-solar-orange flex-shrink-0">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Телефон</h3>
                <p className="text-slate-600">{contactInfo.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-solar-orange/10 flex items-center justify-center text-solar-orange flex-shrink-0">
                <EmailIcon />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Имейл</h3>
                <p className="text-slate-600">{contactInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full rounded-xl overflow-hidden bg-slate-200 min-h-[300px]">
            <iframe
              src={contactInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
