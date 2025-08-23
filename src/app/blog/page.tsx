import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import {format} from 'date-fns';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline mb-12 text-center">
            Blog
          </h1>
          <ul className="space-y-8 max-w-4xl mx-auto">
            {allPostsData.map(({ slug, date, title }) => (
              <li key={slug} className="border-b pb-4">
                <h2 className="text-2xl font-bold hover:text-primary">
                  <Link href={`/blog/${slug}`}>{title}</Link>
                </h2>
                <small className="text-muted-foreground">
                  {format(new Date(date), 'MMMM d, yyyy')}
                </small>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
