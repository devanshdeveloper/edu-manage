import React from 'react';
import { Link } from 'react-router-dom';

export function TableOfContents({ items }) {
  return (
    <div className="w-64 p-4 border-r border-default-200 h-full">
      <h2 className="text-xl font-bold mb-4">Documentation</h2>
      <nav className="space-y-2">
        {items.map((item, index) => (
          <Link
            key={index}
            to={`/docs/${item.slug}`}
            className="block p-2 rounded-lg hover:bg-default-100 transition-colors"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}