import { getSortedPostsData } from '@/lib/posts';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://claritylink.com';

  // Get all posts
  const posts = getSortedPostsData();
  const postRoutes = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
  }));

  // Define static routes
  const staticRoutes = [
    '',
    '/blog',
  ].map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));


  return [...staticRoutes, ...postRoutes];
}
