import { Heading, Text } from "@/components/ui/Typography";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function ConsultationForm() {
  return (
    <Section paddingY="xl" className="bg-[#001D13] relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: "url('/images/solar-panels-landscape-min.jpg')",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="lg:max-w-lg">
            <Heading as="h2" className="text-white mb-6">
              Започнете своя{" "}
              <span className="text-brand-green">соларен проект</span> днес
            </Heading>

            <Text variant="body-16" className="text-white/70">
              Свържете се с нас за безплатна консултация и научете как можете да
              намалите сметките си за ток с до 90%.
            </Text>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-8">
            <form className="flex flex-col gap-6">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-normal text-slate-700"
                >
                  Имейл
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              {/* Phone Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-normal text-slate-700"
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="+359..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-normal text-slate-700"
                >
                  Съобщение
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" size="md" fullWidth>
                Безплатна консултация
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
