import Container from "@/components/ui/Container";

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <section className="bg-[#0a0f0a] relative pt-24 pb-32">
        <Container size="sm">
          <div className="max-w-4xl">
            <div className="mb-12 flex flex-col md:flex-row justify-between gap-6">
              <div className="h-9 w-36 rounded-full bg-white/10" />
              <div className="flex gap-4">
                <div className="h-7 w-24 rounded-full bg-white/10" />
                <div className="h-7 w-28 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="h-12 w-3/4 rounded-lg bg-white/10" />
          </div>
        </Container>
      </section>

      {/* Content skeleton */}
      <section className="bg-neutral-100 pb-18">
        <Container size="sm">
          <div className="-mt-18 bg-white relative z-20 p-4 rounded-3xl">
            <div className="aspect-[21/9] rounded-2xl bg-slate-200 mb-8" />
            <div className="px-6 space-y-4">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-11/12 rounded bg-slate-200" />
              <div className="h-4 w-10/12 rounded bg-slate-200" />
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="h-4 w-9/12 rounded bg-slate-200" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
