import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/ui/Button";
import PageTitle from "@/components/ui/PageTitle";
import { Heading, Text } from "@/components/ui/Typography";
import { getBlogPosts } from "@/lib/strapi";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Научете повече за слънчевата енергия, съвети за инвестиции и новини от SolarTech Solutions.",
};

// Fallback blog posts when Strapi is not available
const fallbackPosts = [
  {
    id: 1,
    title:
      "10 причини защо 2025 е най-добрата година за инсталиране на соларна система",
    slug: "10-reasons-go-solar-2025",
    excerpt:
      "С новите данъчни облекчения, подобрената технология и растящите цени на електроенергията, никога не е имало по-добро време за преминаване към слънчева енергия.",
    author: "Сара Мартинез",
    publishedAt: "2025-12-10T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 2,
    title: "Как да изберем правилните слънчеви панели за нашия дом",
    slug: "understanding-solar-panel-efficiency",
    excerpt:
      "Не всички соларни панели са еднакви. Научете как да оценявате ефективността на панелите и какво означават те за вашето производство на енергия.",
    author: "Дейвид Чен",
    publishedAt: "2025-12-08T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 3,
    title: "Батерии за съхранение на енергия: Революция в домашните системи",
    slug: "battery-storage-revolutionizing-home-solar",
    excerpt:
      "Соларните батерии промениха правилата на играта. Открийте как добавянето на батерия може да увеличи спестяванията ви.",
    author: "Майкъл Томпсън",
    publishedAt: "2025-12-05T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 4,
    title: "Пълно ръководство за данъчни кредити и субсидии през 2025",
    slug: "complete-guide-solar-tax-credits-2025",
    excerpt:
      "Държавните и местни стимули могат значително да намалят разходите ви за инсталация. Ето всичко, което трябва да знаете.",
    author: "Емили Родригез",
    publishedAt: "2025-12-01T10:00:00.000Z",
    featuredImage: null,
  },
  {
    id: 5,
    title: "Бизнес решения: Анализ на възвръщаемостта на инвестициите",
    slug: "commercial-solar-roi-analysis",
    excerpt:
      "Мислите за соларна система за вашия бизнес? Разглеждаме числата, времето за възвръщаемост и реалните ползи.",
    author: "Дейвид Чен",
    publishedAt: "2025-11-28T10:00:00.000Z",
    featuredImage: null,
  },
];

export default async function BlogPage() {
  // Try to fetch from Strapi, fall back to static data
  let posts;
  try {
    const strapiPosts = await getBlogPosts();
    posts = strapiPosts.length > 0 ? strapiPosts : fallbackPosts;
  } catch {
    posts = fallbackPosts;
  }

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <>
      <PageTitle
        title="Блог"
        breadcrumbs={[{ label: "НАЧАЛО", href: "/" }, { label: "БЛОГ" }]}
      />

      {/* Featured Post */}
      {posts.length > 0 && (
        <section className="py-20 lg:py-28 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="aspect-[16/10] bg-slate-100 rounded-[24px] overflow-hidden relative shadow-lg group">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.featuredImage ? (
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <svg
                        className="w-20 h-20 text-slate-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 rounded-full bg-brand-green text-white text-sm font-bold shadow-md">
                      Ново
                    </span>
                  </div>
                </Link>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">
                    {featuredPost.author}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="group">
                  <Heading
                    as="h2"
                    className="mb-6 text-3xl lg:text-4xl font-bold text-slate-900 group-hover:text-brand-green transition-colors"
                  >
                    {featuredPost.title}
                  </Heading>
                </Link>

                <Text className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </Text>

                <Button href={`/blog/${featuredPost.slug}`} variant="primary">
                  Прочети статията
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <Heading as="h3" className="text-2xl font-bold text-slate-900">
              Всички статии
            </Heading>
            <div className="text-slate-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
              {remainingPosts.length} статии
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-slate-900 rounded-[32px] p-8 lg:p-16 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <Heading as="h2" className="text-white mb-4">
                Абонирайте се за бюлетина
              </Heading>
              <Text className="text-slate-400 mb-8 max-w-xl mx-auto">
                Получавайте най-новите съвети за енергийна ефективност, новини
                от индустрията и ексклузивни оферти директно във вашата поща.
              </Text>

              <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Вашият email адрес"
                  className="flex-1 px-6 py-4 rounded-xl border border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-green/50 transition-all font-medium"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="whitespace-nowrap"
                >
                  Абонирай се
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
