import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TableOfContents } from "./components/TableOfContents";
import { RenderDocs } from "./components/RenderDocs";

export function DocsPage() {
  const { slug = "register-your-institute" } = useParams();
  const [content, setContent] = useState("");
  const [docs, setDocs] = useState([]);

  console.log({ docs });

  useEffect(() => {
    // Load the documentation items
    const loadDocs = async () => {
      try {
        const docsContext = import.meta.glob("./markdown/*.md", {
          eager: true,
        });
        console.log({ docsContext });

        const items = Object.entries(docsContext).map(([path, module]) => {
          const fileName = path.split("/").pop().replace(".md", "");
          const title = fileName
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
          return {
            slug: fileName.toLowerCase(),
            title,
            content: module.markdown,
          };
        });
        setDocs(items);

        // Find and set the current document content
        const currentDoc = items.find((doc) => doc.slug === slug);
        if (currentDoc) {
          setContent(currentDoc.content);
        }
      } catch (error) {
        console.error("Error loading documentation:", error);
      }
    };

    loadDocs();
  }, [slug]);

  return (
    <div className="min-h-screen flex">
      <TableOfContents items={docs} />
      <main className="flex-1 overflow-auto bg-default-100">
        <RenderDocs content={content} />
      </main>
    </div>
  );
}
