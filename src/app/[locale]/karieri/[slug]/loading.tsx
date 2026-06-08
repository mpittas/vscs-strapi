import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <section className="bg-[#0a0f0a] relative pt-32 pb-24 border-b border-white/10">
        <Container>
          <div className="max-w-4xl">
            <div className="mb-10 h-9 w-40 rounded-full bg-white/10" />
            <div className="mb-6 h-12 w-3/4 rounded-lg bg-white/10" />
            <div className="flex gap-4">
              <div className="h-7 w-32 rounded-full bg-white/10" />
              <div className="h-7 w-28 rounded-full bg-white/10" />
            </div>
          </div>
        </Container>
      </section>

      {/* Content skeleton */}
      <section className="pb-24 pt-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-8 space-y-4">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-11/12 rounded bg-slate-200" />
              <div className="h-4 w-10/12 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-9/12 rounded bg-slate-200" />
            </div>
            <div className="lg:col-span-4">
              <div className="h-80 w-full rounded-2xl bg-slate-200" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
