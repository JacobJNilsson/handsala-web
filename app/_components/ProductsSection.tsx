"use client"

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { products } from '@/lib/products';

export default function ProductsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="products"
      className="py-24 bg-beige-50 z-10 relative"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-slate-800 mb-4 tracking-tighter">
              Selected Work
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-light">
              Recent experiments and full-scale applications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {products.map((product) => (
              <Link
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="bg-white overflow-hidden shadow-none border border-[#e2e0d6] hover:border-slate-400 transition-all duration-300">
                  <div className="md:grid md:grid-cols-2">
                    <div className="relative h-56 md:h-full bg-[#e6e4dc] overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-center">
                      <div className="mb-3">
                        <span className={`inline-block ${product.categoryColor} text-white text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider`}>
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-600 transition-colors font-mono tracking-tight">
                        {product.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed font-light text-sm">
                        {product.description}
                      </p>

                      <div className="space-y-4">
                        <div>
                          <ul className="space-y-1">
                            {product.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-start text-xs text-slate-600 font-mono">
                                <span className="mr-2 text-slate-400">-</span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1.5">
                            {product.technologies.slice(0, 4).map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="bg-[#e6e4dc] text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-mono border border-[#dcdad0]"
                              >
                                {tech.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
