import { getPostData, getAllPostSlugs } from '@/lib/posts';
import {format} from 'date-fns';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map(p => ({slug: p.params.slug}));
}

export default async function Post({ params }: Props) {
  const { slug } = params;
  const postData = await getPostData(slug);

  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12 md:py-24 lg:py-32">
            <article className="container mx-auto px-4 md:px-6 prose dark:prose-invert max-w-4xl">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline mb-4">
                    {postData.title}
                </h1>
                <div className="text-muted-foreground mb-8">
                    {format(new Date(postData.date), 'MMMM d, yyyy')}
                </div>
                {postData.coverImage && (
                    <Image
                        src={postData.coverImage}
                        alt={`${postData.title} cover image`}
                        width={1200}
                        height={630}
                        className="rounded-lg mb-8 aspect-video object-cover"
                    />
                )}
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </main>
        <Footer />
    </div>
  );
}
