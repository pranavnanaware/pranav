import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";
import fetchBlogs from "@/pages/api/fetch-blogs";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  const blogs = await fetchBlogs();
  const allBlogs = blogs.data;

  return allBlogs
    .filter((p: any) => p.attributes.published)
    .map((p: any) => ({
      slug: p.attributes.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const blogs = await fetchBlogs();
  const allBlogs = blogs.data;

  const slug = params?.slug;

  const blog = allBlogs.find((blog: any) => blog.attributes.slug === slug);
  if (!blog) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "blogs", slug].join(":"))) ?? 0;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header blog={blog.attributes} views={views} />
      <ReportView slug={blog.attributes.slug} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={blog.attributes.body} />
      </article>
    </div>
  );
}
