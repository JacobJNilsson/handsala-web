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
      className="min-h-screen py-16 flex items-center justify-center bg-beige-50 z-2 -mt-2"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-cornflowerBlue mb-4 text-center">
            Stuff I&apos;ve Built
          </h2>
          <p className="text-lg sm:text-xl text-beige-800 mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
            Projects that kept me up at night (in a good way)
          </p>

          <div>
            {products.map((product, index) => (
              <Link
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block ${index < products.length - 1 ? 'mb-12' : ''}`}
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-orangeRed hover:shadow-2xl transition-shadow duration-300">
                  <div className="md:grid md:grid-cols-2">
                    <div className="relative h-48 sm:h-64 md:h-full bg-beige-100">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <div className="p-8">
                      <div className="mb-2">
                        <span className={`inline-block ${product.categoryColor} text-white text-sm font-medium px-3 py-1 rounded-full`}>
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-cornflowerBlue mb-4">
                        {product.title}
                      </h3>
                      <p className="text-beige-800 mb-6 leading-relaxed">
                        {product.description}
                      </p>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-medium text-cornflowerBlue mb-2">
                            What Makes It Special
                          </h4>
                          <ul className="list-disc list-inside text-beige-800 space-y-1">
                            {product.features.map((feature, featureIndex) => (
                              <li key={featureIndex}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-cornflowerBlue mb-2">
                            Built with
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className={`bg-beige-100 ${tech.color} px-3 py-1 rounded-full text-sm`}
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
