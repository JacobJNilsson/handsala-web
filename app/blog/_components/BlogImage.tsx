'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
}

export default function BlogImage({ src, alt }: BlogImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 700px"
      className="object-cover"
      priority
      onError={() => setImgSrc('/images/blog/placeholder.jpg')}
    />
  );
}
