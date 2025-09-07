"use client";

import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/lib/posts';
import { format } from 'date-fns';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// This is a client component, so we fetch data once and handle filtering client-side.
const allPostsData = getSortedPostsData();

// Helper to group posts by month
const getPostsByMonth = () => {
  const postsByMonth: { [key: string]: any[] } = {};
  allPostsData.forEach(post => {
    const month = format(new Date(post.date), 'yyyy-MM');
    if (!postsByMonth[month]) {
      postsByMonth[month] = [];
    }
    postsByMonth[month].push(post);
  });
  return postsByMonth;
};

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const postsByMonth = useMemo(() => getPostsByMonth(), []);
  const months = useMemo(() => Object.keys(postsByMonth).sort().reverse(), [postsByMonth]);

  const filteredPosts = useMemo(() => {
    let posts = allPostsData;

    if (selectedMonth) {
      posts = postsByMonth[selectedMonth] || [];
    }

    if (searchTerm) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return posts;
  }, [searchTerm, selectedMonth, postsByMonth]);

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="md:col-span-1 space-y-8">
              <div className="sticky top-24">
                 <Input
                  type="search"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Archive by Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                       <li>
                        <button
                          onClick={() => setSelectedMonth(null)}
                          className={`w-full text-left text-sm hover:text-primary ${selectedMonth === null ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                        >
                          All Posts
                        </button>
                      </li>
                      {months.map(month => (
                        <li key={month}>
                          <button
                            onClick={() => setSelectedMonth(month)}
                            className={`w-full text-left text-sm hover:text-primary ${selectedMonth === month ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                          >
                            {format(new Date(month), 'MMMM yyyy')} ({postsByMonth[month].length})
                          </button>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </aside>

            {/* Blog Grid */}
            <div className="md:col-span-3">
              {filteredPosts.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredPosts.map(({ slug, date, title, coverImage }) => (
                    <li key={slug} className="group flex flex-col overflow-hidden rounded-lg border shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                      <Link href={`/blog/${slug}`} className="block h-full">
                        <div className="flex flex-col h-full">
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
                          <div className="p-6 bg-card flex-1 flex flex-col justify-between">
                            <div>
                              <h2 className="text-lg font-bold group-hover:text-primary mb-2">
                                {title}
                              </h2>
                            </div>
                            <small className="text-muted-foreground mt-4">
                              {format(new Date(date), 'MMMM d, yyyy')}
                            </small>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                 <div className="flex flex-col items-center justify-center text-center col-span-full h-96">
                    <p className="text-lg font-semibold text-muted-foreground">No posts found.</p>
                    <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filter.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
