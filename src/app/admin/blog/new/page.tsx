import React from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { BlogForm } from "@/components/admin/BlogForm";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <AdminHeader 
        title="Write Post" 
        backHref="/admin/blog"
      />
      <div className="py-6">
        <BlogForm />
      </div>
    </div>
  );
}
