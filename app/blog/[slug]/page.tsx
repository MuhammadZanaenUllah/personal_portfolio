import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote"; // Remove this import and use native rendering

interface BlogPostProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const postPath = path.join(process.cwd(), "posts", `${params.slug}.mdx`);
  let source = "";
  try {
    source = fs.readFileSync(postPath, "utf8");
  } catch {
    notFound();
  }
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <article className="prose prose-lg dark:prose-invert max-w-2xl w-full">
        {/* Directly render MDX content using Next.js native support */}
        {/* @ts-expect-error Async Server Component rendering for MDX */}
        {await import(`../../../../posts/${params.slug}.mdx`).then((mod) => <mod.default />)}
      </article>
    </main>
  );
}