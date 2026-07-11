import React from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogForm } from "@/components/admin/BlogForm";
import { getBlogPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { id: slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const initialValues = {
    ...post,
    tags: post.tags.join(", "),
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AdminHeader 
        title="Edit Post" 
        backHref="/admin/blog"
      />
      <div className="py-6">
        <BlogForm initialValues={initialValues} isEdit />
      </div>
    </div>
  );
}
