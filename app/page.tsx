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
          <ul className='flex gap-4 sm:gap-8 lg:gap-16 text-white text-xs sm:text-lg lg:text-xl font-light uppercase tracking-widest'>
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
          <h1 className='text-base sm:text-2xl lg:text-3xl font-thin text-white uppercase tracking-wide drop-shadow-lg'>
            Grayson Lenner
          </h1>
        </div>
      </section>
      {/* Add top padding to sections to prevent overlap with fixed menu */}
      <section
        id='music'
        className='relative py-16 bg-white scroll-mt-24 pt-16 sm:pt-20'
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
            <div className='text-center mb-12'>
              <Badge variant='secondary' className='mb-4 bg-black text-white'>
                Latest Release
              </Badge>
              <h2 className='text-4xl font-bold text-black mb-4'>Never Left</h2>
              <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                The newest EP featuring intimate acoustic melodies and heartfelt
                lyrics that showcase Grayson&apos;s evolving artistry.
              </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <div className='bg-black p-6 rounded-xl'>
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src='https://open.spotify.com/embed/track/7IpoOiJ9lc4sYozH1EXGxL?utm_source=generator'
                    width='100%'
                    height='352'
                    frameBorder='0'
                    allowFullScreen
                    allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                    loading='lazy'
                  />
                </div>
              </div>

              <div className='space-y-6'>
                <Card className='border-2 border-black'>
                  <CardHeader>
                    <CardTitle className='flex items-center'>
                      <Music className='w-5 h-5 mr-2 text-black' />
                      Stream Now
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <Button
                      className='w-full bg-black hover:bg-gray-800 text-white'
                      asChild
                    >
                      <a
                        href='https://open.spotify.com/track/7IpoOiJ9lc4sYozH1EXGxL?si=a19f6df0f6814c09'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center'
                      >
                        <Image
                          src='/spotify.svg'
                          alt='Spotify'
                          width={20}
                          height={20}
                          className='mr-2'
                        />
                        Spotify
                      </a>
                    </Button>
                    <Button
                      className='w-full border-black text-black hover:bg-gray-100'
                      variant='outline'
                      asChild
                    >
                      <a
                        href='https://music.apple.com/us/album/never-left-ep/1783858758'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center'
                      >
                        <Image
                          src='/apple-music.svg'
                          alt='Apple Music'
                          width={20}
                          height={20}
                          className='mr-2'
                        />
                        Apple Music
                      </a>
                    </Button>
                    <Button
                      className='w-full border-black text-black hover:bg-gray-100'
                      variant='outline'
                      asChild
                    >
                      <a
                        href='https://www.youtube.com/watch?v=8AVOiKrPZ6s&ab_channel=GraysonLenner'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center'
                      >
                        <Image
                          src='/youtube.svg'
                          alt='YouTube'
                          width={20}
                          height={20}
                          className='mr-2'
                        />
                        YouTube Music
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className='border-2 border-black'>
                  <CardHeader>
                    <CardTitle>Track Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span>Monthly Listeners</span>
                        <span className='font-semibold'>800+</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Total Plays</span>
                        <span className='font-semibold'>11,178</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Genre</span>
                        <span className='font-semibold'>Folk Pop</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section (placeholder) */}
      <section
        id='videos'
        className='relative py-32 bg-slate-50 scroll-mt-24 pt-16 sm:pt-20'
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
        className='relative py-16 scroll-mt-24 pt-16 sm:pt-20'
      >
        <Image
          src='/images/03.webp'
          alt='About background'
          fill
          className='object-cover object-center z-0'
          priority={false}
        />
        <div className='relative z-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <p className='text-lg text-white leading-relaxed drop-shadow-md'>
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
                <div className='grid grid-cols-2 gap-4 pt-4'>
                  <div className='text-center p-4 bg-black text-white rounded-lg'>
                    <div className='text-2xl font-bold'>5+</div>
                    <div className='text-sm text-gray-300'>Albums & EPs</div>
                  </div>
                  <div className='text-center p-4 bg-black text-white rounded-lg'>
                    <div className='text-2xl font-bold'>800+</div>
                    <div className='text-sm text-gray-300'>
                      Monthly Listeners
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id='contact'
        className='py-16 bg-black text-white scroll-mt-24 pt-16 sm:pt-20'
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold mb-8'>Get In Touch</h2>
            <p className='text-xl text-gray-300 mb-8'>
              Connect with Grayson for collaborations, press inquiries, or just
              to say hello.
            </p>
          </div>

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
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
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
      </section>

      {/* Footer */}
      <footer className='bg-slate-900 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center space-y-8'>
            {/* Social Media Links */}
            <div>
              <h3 className='text-xl font-semibold text-white mb-6'>
                Follow Grayson
              </h3>
              <div className='flex justify-center space-x-6'>
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
              </div>
            </div>

            {/* Copyright */}
            <div className='pt-8 border-t border-slate-700'>
              <p className='text-slate-400'>
                © {new Date().getFullYear()} Grayson Lenner. All rights
                reserved. Victoria, BC, Canada.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
