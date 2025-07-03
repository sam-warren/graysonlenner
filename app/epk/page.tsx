'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const images = [
  { src: '/images/03.webp', alt: 'EPK Photo 03' },
  { src: '/images/07.webp', alt: 'EPK Photo 07' },
  { src: '/images/13.webp', alt: 'EPK Photo 13' },
  { src: '/images/14.webp', alt: 'EPK Photo 14' },
  { src: '/images/15.webp', alt: 'EPK Photo 15' },
  { src: '/images/16.webp', alt: 'EPK Photo 16' },
  { src: '/images/18.webp', alt: 'EPK Photo 18' },
];

const links = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCumYzg8rjAJA3zX-Hhyr5Pg',
    icon: '/youtube.svg',
  },
  {
    label: 'Linktree',
    href: 'https://linktr.ee/graysonlenner',
    icon: '/globe.svg',
  },
  {
    label: 'Website',
    href: 'https://graysonlenner.com',
    icon: '/globe.svg',
  },
  {
    label: 'Bandcamp',
    href: 'https://graysonlenner.bandcamp.com',
    icon: '/bandcamp.svg',
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/artist/2QwHkQwZ5qX6Ch12eDqOii',
    icon: '/spotify.svg',
  },
  {
    label: 'Apple Music',
    href: 'https://music.apple.com/us/artist/grayson-lenner/1716820032',
    icon: '/apple-music.svg',
  },
  {
    label: 'SoundCloud',
    href: 'https://soundcloud.com/graysonlenner',
    icon: '/soundcloud.svg',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      className='ml-2 px-2 py-1 text-xs bg-slate-100 rounded hover:bg-slate-200 border border-slate-200 transition'
      type='button'
      aria-label='Copy URL'
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function EPKPage() {
  return (
    <main className='min-h-screen bg-white py-12 px-4'>
      <div className='mb-4'>
        <Link
          href='/'
          className='inline-block px-4 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium shadow transition'
        >
          ← Back to Home
        </Link>
      </div>
      <h1 className='text-3xl font-thin mb-4 text-center uppercase tracking-[.35em]'>
        ELECTRONIC PRESS KIT
      </h1>
      <section className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12'>
        {images.map((img) => (
          <div
            key={img.src}
            className='flex flex-col items-center bg-slate-50 rounded-lg shadow p-4'
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={400}
              className='rounded-md object-cover mb-4 w-full h-auto'
            />
            <a
              href={img.src}
              download
              className='mt-2 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition text-sm'
            >
              Download
            </a>
          </div>
        ))}
      </section>
      <div className='text-lg text-slate-900 leading-relaxed drop-shadow-md max-w-2xl mx-auto mb-10 font-thin text-center'>
        Grayson Lenner makes music that balances heart and hook—blending the
        warmth of folk with the energy of indie pop and the depth of alternative
        influences. Inspired by the introspection of Ben Howard and the sonic
        layering of Bon Iver, his songs move between quiet reflection and
        full-band, upbeat moments that stay with you.
        <br />
        <br />
        Based in Victoria, BC, Grayson's debut EP Never Left showcases both
        sides of his sound: emotionally honest songwriting wrapped in rich
        textures, catchy melodies, and dynamic arrangements. The EP has reached
        listeners around the world through Alex Rainbird Music, connecting with
        fans far beyond his hometown.
      </div>
      <section className='flex flex-col items-center'>
        <h2 className='text-xl font-semibold mb-4'>Connect</h2>
        <div className='w-full max-w-2xl mx-auto flex flex-col gap-4'>
          {links.map((link) => (
            <div
              key={link.href}
              className='flex items-center bg-slate-50 rounded-lg px-4 py-3 shadow border'
            >
              <Image
                src={link.icon}
                alt={link.label}
                width={28}
                height={28}
                className='mr-3'
              />
              <span className='font-medium w-32 text-slate-700'>
                {link.label}
              </span>
              <div className='flex-1 flex items-center gap-2'>
                <input
                  type='text'
                  value={link.href}
                  readOnly
                  className='bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs w-full max-w-[260px] truncate mr-2'
                  onFocus={(e) => e.target.select()}
                />
                <CopyButton text={link.href} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
