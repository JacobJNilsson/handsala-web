'use client'

import ReactMarkdown from 'react-markdown'

interface MarkdownRendererProps {
  markdown: string
}

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  return (
    <div className="text-base">
      <div className="text-foreground">
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => <h1 className="text-3xl font-bold text-cornflowerBlue mb-6 mt-2" {...props} />,
            h2: ({ ...props }) => <h2 className="mt-8 mb-4 text-2xl font-bold text-cornflowerBlue" {...props} />,
            h3: ({ ...props }) => <h3 className="mt-6 mb-3 text-xl font-bold text-cornflowerBlue" {...props} />,
            p: ({ ...props }) => <p className="text-beige-800 my-4" {...props} />,
            ul: ({ ...props }) => <ul className="my-4 list-disc pl-8 text-beige-800" {...props} />,
            li: ({ ...props }) => <li className="mb-2" {...props} />,
            a: ({ ...props }) => <a className="text-cornflowerBlue hover:text-cornflowerBlue/80 transition-colors" {...props} />,
            strong: ({ ...props }) => <strong className="font-bold text-beige-900" {...props} />,
            em: ({ ...props }) => <em className="text-beige-800 italic" {...props} />,
            blockquote: ({ ...props }) => <blockquote className="pl-4 border-l-4 border-cornflowerBlue/30 text-beige-700 italic my-6" {...props} />,
            code: ({ ...props }) => <code className="bg-beige-200 text-beige-900 px-1 py-0.5 rounded text-sm" {...props} />,
            pre: ({ ...props }) => <pre className="bg-beige-100 p-4 rounded-md overflow-auto text-beige-900 my-6" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}
