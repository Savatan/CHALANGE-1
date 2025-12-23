import NewsClient from './News';

type Post = {
  id: number;
  title: string;
  body: string;
};

export default async function NewsServer() {
  const res = await fetch('https://dummyjson.com/posts?limit=15', {
    cache: 'no-store',
  });

  const data = await res.json();

  const posts: Post[] = data?.posts ?? [];

  return <NewsClient posts={posts} />;
}
