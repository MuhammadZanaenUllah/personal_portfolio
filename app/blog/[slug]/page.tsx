import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

interface BlogPostProps {
  params: { slug: string };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);
  
  return filenames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => ({
      slug: name.replace(/\.mdx$/, ""),
    }));
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const postPath = path.join(process.cwd(), "posts", `${params.slug}.mdx`);
  
  let source = "";
  try {
    source = fs.readFileSync(postPath, "utf8");
  } catch {
    notFound();
  }

  const mdxSource = await serialize(source);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <article className="prose prose-lg dark:prose-invert max-w-2xl w-full">
        <MDXRemote {...mdxSource} />
      </article>
    </main>
  );
}