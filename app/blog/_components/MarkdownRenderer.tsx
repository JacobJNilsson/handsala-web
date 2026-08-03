"use client"

import ReactMarkdown from "react-markdown"

export default function MarkdownRenderer({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <h1 className="font-display mb-6 mt-12 text-4xl font-medium tracking-tight text-ink" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="font-display mb-4 mt-12 text-3xl font-medium tracking-tight text-ink" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="font-display mb-3 mt-10 text-2xl font-medium tracking-tight text-ink" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="my-5 text-lg leading-relaxed text-ink-soft" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul className="my-5 list-disc space-y-2 pl-6 text-lg text-ink-soft marker:text-vermillion" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="my-5 list-decimal space-y-2 pl-6 text-lg text-ink-soft marker:text-vermillion" {...props} />
        ),
        li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
        a: ({ ...props }) => (
          <a
            className="text-ink underline decoration-vermillion/50 decoration-2 underline-offset-4 transition-colors hover:text-vermillion hover:decoration-vermillion"
            {...props}
          />
        ),
        strong: ({ ...props }) => <strong className="font-semibold text-ink" {...props} />,
        em: ({ ...props }) => <em className="italic" {...props} />,
        blockquote: ({ ...props }) => (
          <blockquote
            className="font-display my-10 max-w-2xl text-2xl font-light italic leading-snug text-ink"
            {...props}
          />
        ),
        code: ({ ...props }) => (
          <code
            className="border border-ink/15 bg-vellum-deep px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
            {...props}
          />
        ),
        pre: ({ ...props }) => (
          <pre
            className="my-8 overflow-auto bg-ink p-6 font-mono text-sm leading-relaxed text-vellum [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
            {...props}
          />
        ),
        hr: ({ ...props }) => <hr className="my-12 border-ink/20" {...props} />,
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}
