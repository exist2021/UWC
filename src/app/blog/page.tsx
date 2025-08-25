import Link from 'next/link';
import Image from 'next/image';
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
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {allPostsData.map(({ slug, date, title, coverImage }) => (
              <li key={slug} className="group flex flex-col overflow-hidden rounded-lg border shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <Link href={`/blog/${slug}`} className="block">
                  <div className="relative aspect-video">
                  {coverImage ? (
                    <Image 
                      src={coverImage}
                      alt={`${title} cover image`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No Image</span>
                    </div>
                  )}
                  </div>
                  <div className="p-6 bg-card flex-1 flex flex-col">
                    <h2 className="text-xl font-bold group-hover:text-primary mb-2">
                      {title}
                    </h2>
                    <small className="text-muted-foreground">
                      {format(new Date(date), 'MMMM d, yyyy')}
                    </small>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
