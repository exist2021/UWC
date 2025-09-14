import { getSortedPostsData } from '@/lib/posts';
import RSS from 'rss';

const siteUrl = 'https://claritylink.com';

export async function GET() {
  const feed = new RSS({
    title: 'ClarityLink Communications Blog',
    description: 'Insights on communication, leadership, and vision.',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: 'en',
    pubDate: new Date(),
  });

  const posts = getSortedPostsData();
  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.content.substring(0, 200) + '...', // A short description
      url: `${siteUrl}/blog/${post.slug}`,
      guid: post.slug,
      date: post.date,
      author: 'ClarityLink Communications',
    });
  });

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
