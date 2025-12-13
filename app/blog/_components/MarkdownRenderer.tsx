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
            h1: ({ ...props }) => <h1 className="text-3xl font-bold text-slate-800 mb-6 mt-8 font-mono tracking-tight" {...props} />,
            h2: ({ ...props }) => <h2 className="mt-10 mb-4 text-2xl font-bold text-slate-800 font-mono tracking-tight" {...props} />,
            h3: ({ ...props }) => <h3 className="mt-8 mb-3 text-xl font-bold text-slate-800 font-mono tracking-tight" {...props} />,
            p: ({ ...props }) => <p className="text-slate-600 leading-relaxed my-4 text-lg font-light" {...props} />,
            ul: ({ ...props }) => <ul className="my-4 list-disc pl-8 text-slate-600 space-y-2" {...props} />,
            ol: ({ ...props }) => <ol className="my-4 list-decimal pl-8 text-slate-600 space-y-2" {...props} />,
            li: ({ ...props }) => <li className="mb-1" {...props} />,
            a: ({ ...props }) => <a className="text-slate-800 hover:text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors" {...props} />,
            strong: ({ ...props }) => <strong className="font-semibold text-slate-800" {...props} />,
            em: ({ ...props }) => <em className="text-slate-700 italic" {...props} />,
            blockquote: ({ ...props }) => <blockquote className="pl-4 border-l-4 border-slate-200 text-slate-500 italic my-8" {...props} />,
            code: ({ ...props }) => <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200" {...props} />,
            pre: ({ ...props }) => <pre className="bg-slate-50 border border-slate-200 p-4 rounded-md overflow-auto text-slate-800 my-8 font-mono text-sm leading-relaxed" {...props} />,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}
