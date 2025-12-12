"use client";

import Button from "@/components/ui/Button";

export default function ButtonShowcase() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Button Showcase
        </h2>

        <div className="space-y-16">
          {/* Primary Variant */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-slate-200 pb-2">
              Primary Variant (Default)
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                With Icon
              </Button>
            </div>
          </div>

          {/* Secondary Variant */}
          <div className="space-y-6 p-8 bg-slate-800 rounded-xl">
            <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
              Secondary Variant (Dark Bg)
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <Button variant="secondary" size="sm">
                Small
              </Button>
              <Button variant="secondary" size="md">
                Medium
              </Button>
              <Button variant="secondary" size="lg">
                Large
              </Button>
              <Button variant="secondary">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Info
              </Button>
            </div>
          </div>

          {/* Outline Variant */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-slate-200 pb-2">
              Outline Variant
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <Button variant="outline" size="sm">
                Small
              </Button>
              <Button variant="outline" size="md">
                Medium
              </Button>
              <Button variant="outline" size="lg">
                Large
              </Button>
              <Button variant="outline">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Details
              </Button>
            </div>
          </div>

          {/* White Variant */}
          <div className="space-y-6 p-8 bg-gradient-to-r from-green to-emerald-600 rounded-xl">
            <h3 className="text-xl font-semibold text-white border-b border-white/20 pb-2">
              White Variant (Colored Bg)
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              <Button variant="white" size="sm">
                Small
              </Button>
              <Button variant="white" size="md">
                Medium
              </Button>
              <Button variant="white" size="lg">
                Large
              </Button>
              <Button variant="white">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact
              </Button>
            </div>
          </div>

          {/* Full Width */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-slate-200 pb-2">
              Full Width
            </h3>
            <div className="max-w-md space-y-4">
              <Button fullWidth>Full Width Button</Button>
              <Button variant="outline" fullWidth>
                Full Width Outline
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
