import { getSortedPostsData } from '@/lib/posts';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import BlogClientPage from './BlogClientPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | ClarityLink Communications',
  description: 'Explore insights on communication, leadership, and vision.',
};


export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
              Blog
            </h1>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Explore insights on communication, leadership, and vision.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground italic">
              Disclaimer: Some essays on this blog are AI-generated explorations of various topics.
            </p>
          </div>
          <BlogClientPage allPostsData={allPostsData} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
