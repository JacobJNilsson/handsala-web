"use client"

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactSection() {
  const [copyFeedback, setCopyFeedback] = useState('')
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-beige-50 relative pb-20"
      ref={sectionRef}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-none border border-[#e2e0d6] p-8 sm:p-12"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-mono font-bold text-slate-800 mb-6 tracking-tighter">
                Let&apos;s talk
              </h2>
              <div className="text-slate-600 font-light leading-relaxed space-y-4">
                <p>
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
                <div className="pt-4 space-y-2">
                  <p className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-3"></span>
                    Based in Gothenburg, Sweden
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-slate-400 mr-3"></span>
                    Available for remote work
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-4 font-mono">Contact Details</h3>
                <div className="space-y-4">
                  <a href="mailto:jacob@handsala.com" className="flex items-center p-3 -mx-3 rounded-lg hover:bg-slate-50 transition-colors group">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#e6e4dc] text-slate-600 group-hover:bg-[#dcdad0] group-hover:text-slate-800 transition-colors mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="text-slate-800 font-medium">jacob@handsala.com</p>
                    </div>
                  </a>

                  <button onClick={handleCopyPhone} className="w-full flex items-center p-3 -mx-3 rounded-lg hover:bg-slate-50 transition-colors group text-left">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#e6e4dc] text-slate-600 group-hover:bg-[#dcdad0] group-hover:text-slate-800 transition-colors mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-slate-500">Phone</p>
                        {copyFeedback && <span className="text-xs text-green-600 font-medium">{copyFeedback}</span>}
                      </div>
                      <p className="text-slate-800 font-medium">+46 722 428 245</p>
                    </div>
                  </button>

                  <a href="https://linkedin.com/in/jacob-john-nilsson" target="_blank" rel="noopener noreferrer" className="flex items-center p-3 -mx-3 rounded-lg hover:bg-slate-50 transition-colors group">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#e6e4dc] text-slate-600 group-hover:bg-[#dcdad0] group-hover:text-slate-800 transition-colors mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Social</p>
                      <p className="text-slate-800 font-medium">LinkedIn</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

