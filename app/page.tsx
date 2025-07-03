'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Music,
  MapPin,
  Users,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [activeSection, setActiveSection] = useState('music');
  const menuRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const videoList = [
    {
      src: 'https://www.youtube.com/embed/wC3N7c6lG9o',
      title: 'Grayson Lenner - YouTube Video 1',
    },
    {
      src: 'https://www.youtube.com/embed/o9xXo-mSklI',
      title: 'Grayson Lenner - YouTube Video 2',
    },
  ];
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector('section');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setShowBackToTop(rect.bottom < 0);
      }
      const sections = ['music', 'videos', 'about', 'contact'];
      let found = 'music';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            found = id;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      {/* Sticky Menu - now global */}
      <div
        ref={menuRef}
        className='w-full flex justify-center z-50 fixed top-0 left-0 bg-transparent'
      >
        <nav className='w-full flex justify-center pt-4'>
          <ul className='flex gap-4 sm:gap-8 lg:gap-16 text-white text-xs sm:text-lg lg:text-xl font-light uppercase tracking-widest items-center'>
            <li
              className='mr-2 flex items-center justify-center'
              style={{ width: '2.5rem' }}
            >
              {showBackToTop ? (
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  aria-label='Back to top'
                  className='p-1 sm:p-2 rounded-full bg-black/60 hover:bg-black text-white transition-opacity duration-300 opacity-80 hover:opacity-100 align-middle flex items-center justify-center'
                  style={{ verticalAlign: 'middle' }}
                >
                  <ArrowUp className='w-4 h-4 sm:w-5 sm:h-5' />
                </button>
              ) : (
                <button
                  aria-hidden='true'
                  tabIndex={-1}
                  className='p-1 sm:p-2 rounded-full bg-black/60 text-white opacity-0 pointer-events-none flex items-center justify-center'
                  style={{ verticalAlign: 'middle' }}
                >
                  <ArrowUp className='w-4 h-4 sm:w-5 sm:h-5' />
                </button>
              )}
            </li>
            <li>
              <a
                href='#music'
                className={
                  activeSection === 'music'
                    ? 'border-b-2 border-white pb-1'
                    : 'hover:underline'
                }
              >
                Music
              </a>
            </li>
            <li>
              <a
                href='#videos'
                className={
                  activeSection === 'videos'
                    ? 'border-b-2 border-white pb-1'
                    : 'hover:underline'
                }
              >
                Videos
              </a>
            </li>
            <li>
              <a
                href='#about'
                className={
                  activeSection === 'about'
                    ? 'border-b-2 border-white pb-1'
                    : 'hover:underline'
                }
              >
                About
              </a>
            </li>
            <li>
              <a
                href='#contact'
                className={
                  activeSection === 'contact'
                    ? 'border-b-2 border-white pb-1'
                    : 'hover:underline'
                }
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Hero Section */}
      <section className='relative h-screen'>
        <Image
          src='/images/08.webp'
          alt='Grayson Lenner'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black/20' />
        {/* Title bottom left */}
        <div className='absolute bottom-8 left-4 z-20 sm:bottom-16 sm:left-6'>
          <h1 className='text-base sm:text-2xl lg:text-3xl font-thin text-white uppercase tracking-[.35em] drop-shadow-lg'>
            GRAYSON LENNER
          </h1>
        </div>
      </section>
      {/* Add top padding to sections to prevent overlap with fixed menu */}
      <section
        id='music'
        className='relative min-h-screen py-16 bg-white scroll-mt-16 pt-16 sm:pt-20'
      >
        <Image
          src='/images/06.webp'
          alt='Music background'
          fill
          className='object-cover object-center z-0'
          priority={false}
        />
        <div className='relative z-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='text-center mb-12'></div>

            {/* Releases Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
              {[
                {
                  title: 'Never Left',
                  type: 'EP',
                  spotify:
                    'https://open.spotify.com/album/1FJmU7xuEn15r7co3RHTGX',
                  cover: '/images/13.webp',
                  apple:
                    'https://music.apple.com/us/album/never-left-ep/1783858758',
                  bandcamp:
                    'https://graysonlenner.bandcamp.com/album/never-left',
                  youtube:
                    'https://www.youtube.com/watch?v=8AVOiKrPZ6s&ab_channel=GraysonLenner',
                },
                {
                  title: 'Lost Hearts',
                  type: 'Single',
                  spotify:
                    'https://open.spotify.com/track/5b3DZgjWOxya5KjsRUfxzF',
                  cover: '/images/08.webp',
                  apple:
                    'https://music.apple.com/za/album/lost-hearts-single/1783561822',
                  bandcamp:
                    'https://graysonlenner.bandcamp.com/track/lost-hearts',
                },
                {
                  title: 'Never Left',
                  type: 'Single',
                  spotify:
                    'https://open.spotify.com/track/4GGfa4LFM0W73zEC6v1p03',
                  cover: '/images/11.webp',
                  apple:
                    'https://music.apple.com/za/album/never-left/1771987369?i=1771987370',
                  bandcamp:
                    'https://graysonlenner.bandcamp.com/track/never-left',
                },
                {
                  title: 'Everybody',
                  type: 'Single',
                  spotify:
                    'https://open.spotify.com/track/1T5KW6uHqcwzgMfXD6uWsU',
                  cover: '/images/06.webp',
                  bandcamp:
                    'https://graysonlenner.bandcamp.com/track/everybody',
                },
                {
                  title: 'Anymore',
                  type: 'Single',
                  spotify:
                    'https://open.spotify.com/track/68eAHjXbJvhNyalpxhaJcZ',
                  cover: '/images/01.webp', // Placeholder, update if you have a preferred image
                  bandcamp: 'https://graysonlenner.bandcamp.com/track/anymore',
                },
              ].map((release, idx) => (
                <Card
                  key={release.title + idx}
                  className='bg-white shadow-md flex flex-col items-center p-0 rounded-none border-0'
                >
                  <div className='relative w-full aspect-square overflow-hidden rounded-none'>
                    <Image
                      src={release.cover}
                      alt={release.title + ' cover art'}
                      fill
                      className='object-cover object-center rounded-none'
                      sizes='(max-width: 768px) 100vw, 33vw'
                      priority={idx === 0}
                    />
                  </div>
                  <CardHeader className='w-full text-center pt-4 pb-2 px-0'>
                    <CardTitle className='text-black text-lg font-semibold'>
                      {release.title}
                    </CardTitle>
                    <CardDescription className='text-gray-500 text-xs uppercase tracking-widest'>
                      {release.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className='w-full flex justify-center gap-3 pb-4'>
                    <a
                      href={release.spotify}
                      target='_blank'
                      rel='noopener noreferrer'
                      aria-label='Spotify'
                      className='inline-flex items-center justify-center rounded-full hover:bg-black/10 transition p-2'
                    >
                      <Image
                        src='/spotify.svg'
                        alt='Spotify'
                        width={28}
                        height={28}
                      />
                    </a>
                    {release.apple && (
                      <a
                        href={release.apple}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Apple Music'
                        className='inline-flex items-center justify-center rounded-full hover:bg-black/10 transition p-2'
                      >
                        <Image
                          src='/apple-music.svg'
                          alt='Apple Music'
                          width={28}
                          height={28}
                        />
                      </a>
                    )}
                    {release.bandcamp && (
                      <a
                        href={release.bandcamp}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Bandcamp'
                        className='inline-flex items-center justify-center rounded-full hover:bg-black/10 transition p-2'
                      >
                        <Image
                          src='/bandcamp.svg'
                          alt='Bandcamp'
                          width={28}
                          height={28}
                        />
                      </a>
                    )}
                    {release.youtube && (
                      <a
                        href={release.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='YouTube'
                        className='inline-flex items-center justify-center rounded-full hover:bg-black/10 transition p-2'
                      >
                        <Image
                          src='/youtube.svg'
                          alt='YouTube'
                          width={28}
                          height={28}
                        />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section (placeholder) */}
      <section
        id='videos'
        className='relative min-h-screen py-32 bg-slate-50 scroll-mt-16 pt-16 sm:pt-20'
      >
        <Image
          src='/images/01.webp'
          alt='Videos background'
          fill
          className='object-cover object-center z-0'
          priority={false}
        />
        <div className='relative z-20'>
          <div className='max-w-5xl mx-auto flex items-center justify-center'>
            <button
              aria-label='Previous video'
              onClick={() =>
                setCurrentVideo((prev) =>
                  prev === 0 ? videoList.length - 1 : prev - 1
                )
              }
              className='p-2 rounded-full bg-black/40 hover:bg-black/70 text-white mr-4 transition disabled:opacity-30 disabled:pointer-events-none'
              disabled={videoList.length < 2}
            >
              <ChevronLeft className='w-8 h-8' />
            </button>
            <div className='w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex-shrink-0 bg-black'>
              <iframe
                width='100%'
                height='100%'
                src={videoList[currentVideo].src}
                title={videoList[currentVideo].title}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowFullScreen
                loading='lazy'
                className='w-full h-full'
              />
            </div>
            <button
              aria-label='Next video'
              onClick={() =>
                setCurrentVideo((prev) =>
                  prev === videoList.length - 1 ? 0 : prev + 1
                )
              }
              className='p-2 rounded-full bg-black/40 hover:bg-black/70 text-white ml-4 transition disabled:opacity-30 disabled:pointer-events-none'
              disabled={videoList.length < 2}
            >
              <ChevronRight className='w-8 h-8' />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id='about'
        className='relative min-h-screen py-16 scroll-mt-16 pt-16 sm:pt-20'
      >
        <Image
          src='/images/03.webp'
          alt='About background'
          fill
          className='object-cover object-center z-0'
          priority={false}
        />
        <div className='absolute inset-0 bg-black/20 z-10 pointer-events-none' />
        <div className='relative z-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6 w-full flex flex-col items-center mt-16'>
                <p className='text-lg text-white leading-relaxed drop-shadow-md max-w-2xl mx-auto'>
                  Grayson Lenner makes music that balances heart and
                  hook—blending the warmth of folk with the energy of indie pop
                  and the depth of alternative influences. Inspired by the
                  introspection of Ben Howard and the sonic layering of Bon
                  Iver, his songs move between quiet reflection and full-band,
                  upbeat moments that stay with you.
                  <br />
                  <br />
                  Based in Victoria, BC, Grayson's debut EP Never Left showcases
                  both sides of his sound: emotionally honest songwriting
                  wrapped in rich textures, catchy melodies, and dynamic
                  arrangements. The EP has reached listeners around the world
                  through Alex Rainbird Music, connecting with fans far beyond
                  his hometown.
                </p>
                <div className='flex justify-center space-x-6 mt-8'>
                  <a
                    href='https://www.instagram.com/graysonlennermusic/?hl=en'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group'
                  >
                    <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors'>
                      <Image
                        src='/instagram.svg'
                        alt='Instagram'
                        width={20}
                        height={20}
                        className='group-hover:scale-110 transition-transform'
                      />
                    </div>
                  </a>
                  <a
                    href='https://www.youtube.com/channel/UCumYzg8rjAJA3zX-Hhyr5Pg'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group'
                  >
                    <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors'>
                      <Image
                        src='/youtube.svg'
                        alt='YouTube'
                        width={20}
                        height={20}
                        className='group-hover:scale-110 transition-transform'
                      />
                    </div>
                  </a>
                  <a
                    href='https://www.facebook.com/graysonlennermusic'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group'
                  >
                    <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors'>
                      <Image
                        src='/facebook.svg'
                        alt='Facebook'
                        width={20}
                        height={20}
                        className='group-hover:scale-110 transition-transform'
                      />
                    </div>
                  </a>
                  <a
                    href='https://open.spotify.com/track/7IpoOiJ9lc4sYozH1EXGxL?si=a19f6df0f6814c09'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group'
                  >
                    <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors'>
                      <Image
                        src='/spotify.svg'
                        alt='Spotify'
                        width={20}
                        height={20}
                        className='group-hover:scale-110 transition-transform'
                      />
                    </div>
                  </a>
                  <a
                    href='https://graysonlenner.bandcamp.com/album/never-left'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group'
                  >
                    <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors'>
                      <Image
                        src='/bandcamp.svg'
                        alt='Bandcamp'
                        width={20}
                        height={20}
                        className='group-hover:scale-110 transition-transform'
                      />
                    </div>
                  </a>
                  <a
                    href='https://soundcloud.com/graysonlenner'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group'
                  >
                    <div className='w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors'>
                      <Image
                        src='/soundcloud.svg'
                        alt='SoundCloud'
                        width={20}
                        height={20}
                        className='group-hover:scale-110 transition-transform'
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id='contact'
        className='min-h-screen py-16 bg-black text-white scroll-mt-16 pt-32 sm:pt-40'
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <div className='max-w-2xl mx-auto'>
              <Card className='bg-white border-2 border-white'>
                <CardHeader>
                  <CardTitle className='flex items-center text-black'>
                    <Mail className='w-5 h-5 mr-2' />
                    Send a Message
                  </CardTitle>
                  <CardDescription className='text-gray-600'>
                    Fill out the form below and I&apos;ll get back to you soon.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='name' className='text-black'>
                          Name
                        </Label>
                        <Input
                          id='name'
                          name='name'
                          type='text'
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className='border-gray-300 focus:border-black'
                          placeholder='Your name'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='email' className='text-black'>
                          Email
                        </Label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className='border-gray-300 focus:border-black'
                          placeholder='your@email.com'
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='subject' className='text-black'>
                        Subject
                      </Label>
                      <Input
                        id='subject'
                        name='subject'
                        type='text'
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className='border-gray-300 focus:border-black'
                        placeholder="What's this about?"
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='message' className='text-black'>
                        Message
                      </Label>
                      <Textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className='border-gray-300 focus:border-black resize-none'
                        placeholder='Tell me more...'
                      />
                    </div>

                    {submitStatus === 'success' && (
                      <div className='flex items-center p-3 bg-green-50 border border-green-200 rounded-md'>
                        <CheckCircle className='w-5 h-5 text-green-600 mr-2' />
                        <p className='text-green-800 text-sm'>
                          Message sent successfully! I&apos;ll get back to you
                          soon.
                        </p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className='flex items-center p-3 bg-red-50 border border-red-200 rounded-md'>
                        <AlertCircle className='w-5 h-5 text-red-600 mr-2' />
                        <p className='text-red-800 text-sm'>
                          Sorry, there was an error sending your message. Please
                          try again.
                        </p>
                      </div>
                    )}

                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-black hover:bg-gray-800 text-white'
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className='w-4 h-4 mr-2' />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-black text-white py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center space-y-4'>
            {/* Social Media Links */}
            <div>
              {/* Social Links moved to About section */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
