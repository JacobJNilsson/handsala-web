"use client"

import { useState } from 'react'

export default function ContactSection() {
  const [copyFeedback, setCopyFeedback] = useState('')

  const handleCopyPhone = async () => {
    const phoneNumber = '+46722428245'
    try {
      await navigator.clipboard.writeText(phoneNumber)
      setCopyFeedback('Copied!')
      setTimeout(() => setCopyFeedback(''), 2000)
    } catch {
      setCopyFeedback('Failed to copy')
      setTimeout(() => setCopyFeedback(''), 2000)
    }
  }

  return (
    <section id="contact" className="h-screen flex items-center justify-center bg-beige-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-beige-900 mb-12 text-center">
          Let&apos;s Connect
        </h2>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-beige-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-cornflowerBlue mb-4">
                Where You Can Find Me
              </h3>
              <div className="space-y-2 text-beige-800">
                <p>Based in Gothenburg, Sweden</p>
                <p>Usually spotted at local coffee shops with my laptop</p>
                <p>Or trying to debug code while talking to my rubber duck</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-cornflowerBlue mb-4">
                Drop Me a Line
              </h3>
              <div className="space-y-2 text-beige-800">
                <p>
                  <a href="mailto:jacob@handsala.com" className="flex items-center hover:text-cornflowerBlue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email: jacob@handsala.com
                  </a>
                </p>
                <p>
                  <button
                    onClick={handleCopyPhone}
                    className="flex items-center hover:text-cornflowerBlue transition-colors w-full text-left group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone: +46 722 428 245
                    <span className="ml-2 text-sm text-cornflowerBlue opacity-0 group-hover:opacity-100 transition-opacity">
                      (Click to copy)
                    </span>
                    {copyFeedback && (
                      <span className="ml-2 text-sm text-green-600">
                        {copyFeedback}
                      </span>
                    )}
                  </button>
                </p>
                <p>
                  <a href="https://linkedin.com/in/jacob-john-nilsson" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-cornflowerBlue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn: Probably easier to find me there than at networking events
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
