"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Music,
  MapPin,
  Users,
  Star,
  Mail,
  ExternalLink,
  Play,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <Image
          src="/images/09.webp"
          alt="Grayson Lenner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="bg-white text-black border-white"
              >
                <MapPin className="w-3 h-3 mr-1" />
                Victoria, BC
              </Badge>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight">
                Grayson
                <span className="block text-white">Lenner</span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Acoustic guitars, harmonies, and captivating melodies that
                resonate with authenticity and emotion. Drawing from pop, folk,
                and alternative genres.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-200 text-black text-lg px-8 py-4"
                asChild
              >
                <a
                  href="https://open.spotify.com/track/7IpoOiJ9lc4sYozH1EXGxL?si=a19f6df0f6814c09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Music className="w-5 h-5 mr-2" />
                  Listen to "Never Left"
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-8 text-white/80">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-lg font-semibold">
                  800+ Monthly Listeners
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Single Spotlight */}
      <section id="music" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-black text-white">
              Latest Release
            </Badge>
            <h2 className="text-4xl font-bold text-black mb-4">Never Left</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The newest EP featuring intimate acoustic melodies and heartfelt
              lyrics that showcase Grayson's evolving artistry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-black p-6 rounded-xl">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/track/7IpoOiJ9lc4sYozH1EXGxL?utm_source=generator"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Music className="w-5 h-5 mr-2 text-black" />
                    Stream Now
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                                    <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white" 
                    asChild
                  >
                    <a 
                      href="https://open.spotify.com/track/7IpoOiJ9lc4sYozH1EXGxL?si=a19f6df0f6814c09" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Image
                        src="/spotify.svg"
                        alt="Spotify"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Spotify
                    </a>
                  </Button>
                  <Button
                    className="w-full border-black text-black hover:bg-gray-100"
                    variant="outline"
                    asChild
                  >
                    <a
                      href="https://music.apple.com/us/album/never-left-ep/1783858758"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Image
                        src="/apple-music.svg"
                        alt="Apple Music"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      Apple Music
                    </a>
                  </Button>
                  <Button
                    className="w-full border-black text-black hover:bg-gray-100"
                    variant="outline"
                    asChild
                  >
                    <a
                      href="https://www.youtube.com/watch?v=8AVOiKrPZ6s&ab_channel=GraysonLenner"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      <Image
                        src="/youtube.svg"
                        alt="YouTube"
                        width={20}
                        height={20}
                        className="mr-2"
                      />
                      YouTube Music
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle>Track Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Monthly Listeners</span>
                      <span className="font-semibold">800+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Plays</span>
                      <span className="font-semibold">11,178</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Genre</span>
                      <span className="font-semibold">Folk Pop</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-900">
                About Grayson
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Rooted in Victoria, BC, Grayson Lenner's music is characterized
                by acoustic guitars, harmonies, rich textures, and captivating
                melodies. His sound draws inspiration from the diverse worlds of
                pop, folk, and alternative genres.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                With a uniquely authentic voice that resonates with emotion,
                Grayson's performances create intimate connections with
                audiences, delivering genuine, memorable musical experiences.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-black text-white rounded-lg">
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-sm text-gray-300">Albums & EPs</div>
                </div>
                <div className="text-center p-4 bg-black text-white rounded-lg">
                  <div className="text-2xl font-bold">800+</div>
                  <div className="text-sm text-gray-300">Monthly Listeners</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/03.webp"
                    alt="Grayson Lenner"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image
                    src="/images/04.webp"
                    alt="Grayson Lenner performing"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <Image
                    src="/images/05.webp"
                    alt="Grayson Lenner"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/images/06.webp"
                    alt="Grayson Lenner"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect with Grayson for collaborations, press inquiries, or just
              to say hello.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="bg-white border-2 border-white">
              <CardHeader>
                <CardTitle className="flex items-center text-black">
                  <Mail className="w-5 h-5 mr-2" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and I'll get back to you soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-black">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-black"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-black">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border-gray-300 focus:border-black"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-black">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 focus:border-black"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-black">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="border-gray-300 focus:border-black resize-none"
                      placeholder="Tell me more..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <p className="text-green-800 text-sm">
                        Message sent successfully! I'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                      <p className="text-red-800 text-sm">
                        Sorry, there was an error sending your message. Please
                        try again.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-gray-800 text-white"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
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
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Follow Grayson</h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.instagram.com/graysonlennermusic/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Image
                      src="/instagram.svg"
                      alt="Instagram"
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCumYzg8rjAJA3zX-Hhyr5Pg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Image
                      src="/youtube.svg"
                      alt="YouTube"
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                </a>
                <a
                  href="https://www.facebook.com/graysonlennermusic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Image
                      src="/facebook.svg"
                      alt="Facebook"
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                </a>
                <a
                  href="https://open.spotify.com/track/7IpoOiJ9lc4sYozH1EXGxL?si=a19f6df0f6814c09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Image
                      src="/spotify.svg"
                      alt="Spotify"
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                </a>
                <a
                  href="https://graysonlenner.bandcamp.com/album/never-left"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Image
                      src="/bandcamp.svg"
                      alt="Bandcamp"
                      width={20}
                      height={20}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-slate-700">
              <p className="text-slate-400">
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
