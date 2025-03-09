import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function RenderDocs({ content }) {
  return (
    <div className="prose prose-invert dark:prose-invert max-w-none p-6 prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-strong:text-gray-900 dark:prose-strong:text-gray-50 prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-ul:text-gray-600 dark:prose-ul:text-gray-300 prose-ol:text-gray-600 dark:prose-ol:text-gray-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={dark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h1(props) {
            return <h1 className="text-3xl font-bold mb-4" {...props} />;
          },
          h2(props) {
            return <h2 className="text-2xl font-bold mb-4" {...props} />;
          },
          h3(props) {
            return <h3 className="text-xl font-bold mb-4" {...props} />;
          },
          h4(props) {
            return <h4 className="text-lg font-bold mb-4" {...props} />;
          },
          h5(props) {
            return <h5 className="text-base font-bold mb-4" {...props} />;
          },
          h6(props) {
            return <h6 className="text-sm font-bold mb-4" {...props} />;
          },
          p(props) {
            return <p className="mb-4" {...props} />;
          },
          ul(props) {
            return <ul className="list-disc pl-6 mb-4" {...props} />;
          },
          ol(props) {
            return <ol className="list-decimal pl-6 mb-4" {...props} />;
          },
          li(props) {
            return <li className="mb-2" {...props} />;
          },
          blockquote(props) {
            return (
              <blockquote
                className="border-l-4 border-gray-300 pl-4 mb-4"
                {...props}
              />
            );
          },
          table(props) {
            return <table className="table-auto w-full mb-4" {...props} />;
          },
          thead(props) {
            return <thead className="bg-gray-100" {...props} />;
          },
          tbody(props) {
            return <tbody {...props} />;
          },
          tr(props) {
            return <tr {...props} />;
          },
          th(props) {
            return <th className="px-4 py-2" {...props} />;
          },
          td(props) {
            return <td className="border px-4 py-2" {...props} />;
          },
          img(props) {
            return <img className="mx-auto" {...props} />;
          },
          a(props) {
            return <a className="underline" {...props} />;
          },
          pre(props) {
            return (
              <pre className="bg-gray-800 text-white p-4 rounded" {...props} />
            );
          },
          inlineCode(props) {
            return (
              <code
                className="bg-gray-200 text-gray-800 p-1 rounded"
                {...props}
              />
            );
          },
          strong(props) {
            return <strong className="font-bold" {...props} />;
          },
          em(props) {
            return <em className="italic" {...props} />;
          },
          del(props) {
            return <del className="line-through" {...props} />;
          },
          hr(props) {
            return <hr className="my-4" {...props} />;
          },
          br(props) {
            return <br {...props} />;
          },
          tableCell(props) {
            return <td className="border px-4 py-2" {...props} />;
          },
          tableRow(props) {
            return <tr {...props} />;
          },
          tableHeader(props) {
            return <th className="px-4 py-2" {...props} />;
          },
          tableBody(props) {
            return <tbody {...props} />;
          },
          tableCaption(props) {
            return <caption className="text-center" {...props} />;
          },
          tableHeaderCell(props) {
            return <th className="px-4 py-2" {...props} />;
          },
          tableFooter(props) {
            return <tfoot {...props} />;
          },
          tableFooterRow(props) {
            return <tr {...props} />;
          },
          tableFooterCell(props) {
            return <td className="border px-4 py-2" {...props} />;
          },
          tableSection(props) {
            return <tbody {...props} />;
          },
          tableRowGroup(props) {
            return <tbody {...props} />;
          },
          
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
