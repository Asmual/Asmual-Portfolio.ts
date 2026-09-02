"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Copy, 
  Check, 
  Clock
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const subjectPills = [
  "Project Inquiry",
  "Full-time Role",
  "Freelance Work",
  "General Consultation",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("asmualobaidulhoque@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setErrorMessage("Something went wrong. Please check your internet connection.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectSubject = (subj: string) => {
    setFormData((prev) => ({ ...prev, subject: subj }));
  };

  return (
    <section id="contact" className="py-14 sm:py-20 relative bg-background border-t border-border/50 overflow-hidden transition-colors duration-300">
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/5 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contact</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Let&apos;s Build Something <span className="text-accent">Together</span>
          </h2>

          <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
            Have a project in mind, want to discuss a full-stack engineering role, or explore a collaboration? Feel free to reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Direct Email Card with Quick Copy */}
            <div className="p-5 rounded-2xl bg-card-bg border border-border shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Direct Email</h3>
                    <p className="text-xs sm:text-sm font-bold text-foreground">asmualobaidulhoque@gmail.com</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Copy email address"
                  className="p-2 rounded-lg bg-background border border-border hover:border-accent hover:text-accent text-foreground/70 transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-foreground/65 pt-1 border-t border-border/60">
                <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Typically responds within 24 hours</span>
              </div>
            </div>

            {/* Location & Availability Card */}
            <div className="p-5 rounded-2xl bg-card-bg border border-border shadow-sm space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-accent/10 border border-accent/20 text-accent">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/50">Location</h3>
                  <p className="text-xs sm:text-sm font-bold text-foreground">Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-foreground/65 pt-1 border-t border-border/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Available for remote contracts &amp; global full-time roles</span>
              </div>
            </div>

            {/* Social Channels with all 5 platforms */}
            <div className="p-5 rounded-2xl bg-card-bg border border-border shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/70">Connect Online</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-1">
                <a 
                  href="https://github.com/Asmual" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-background border border-border hover:border-accent hover:text-accent text-foreground/80 transition-all flex flex-col items-center justify-center gap-1 group shadow-xs cursor-pointer"
                  title="GitHub Profile"
                >
                  <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-semibold truncate">GitHub</span>
                </a>

                <a 
                  href="https://www.linkedin.com/in/asmual" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-background border border-border hover:border-accent hover:text-accent text-foreground/80 transition-all flex flex-col items-center justify-center gap-1 group shadow-xs cursor-pointer"
                  title="LinkedIn Profile"
                >
                  <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-semibold truncate">LinkedIn</span>
                </a>

                <a 
                  href="https://x.com/Asmual_123" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-background border border-border hover:border-accent hover:text-accent text-foreground/80 transition-all flex flex-col items-center justify-center gap-1 group shadow-xs cursor-pointer"
                  title="X (Twitter) Profile"
                >
                  <FaXTwitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-semibold truncate">X</span>
                </a>

                <a 
                  href="https://leetcode.com/u/Asmual" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-background border border-border hover:border-accent hover:text-accent text-foreground/80 transition-all flex flex-col items-center justify-center gap-1 group shadow-xs cursor-pointer"
                  title="LeetCode Profile"
                >
                  <SiLeetcode className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-semibold truncate">LeetCode</span>
                </a>

                <a 
                  href="https://www.youtube.com/@AsmualObaidulHoque" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-xl bg-background border border-border hover:border-accent hover:text-accent text-foreground/80 transition-all flex flex-col items-center justify-center gap-1 group shadow-xs cursor-pointer"
                  title="YouTube Channel"
                >
                  <FaYoutube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-semibold truncate">YouTube</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Modern Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-7 rounded-2xl bg-card-bg border border-border shadow-lg">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-foreground">Message Sent Successfully!</h3>
                    <p className="text-xs sm:text-sm text-foreground/70 max-w-sm mx-auto">
                      Thank you for reaching out. I have received your message and will reply as soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-5 py-2 text-xs font-semibold rounded-xl bg-accent text-white hover:bg-accent/90 shadow-sm transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-medium text-foreground/80">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-medium text-foreground/80">
                        Your Email <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject & Quick Select Pills */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-medium text-foreground/80">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full-Stack Project Inquiry"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                    />

                    {/* Quick Subject Select Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {subjectPills.map((subj) => (
                        <button
                          key={subj}
                          type="button"
                          onClick={() => handleSelectSubject(subj)}
                          className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            formData.subject === subj
                              ? "bg-accent text-white border-accent shadow-xs"
                              : "bg-background/70 text-foreground/60 hover:text-foreground border-border/70"
                          }`}
                        >
                          {subj}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-medium text-foreground/80">
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project goals, timelines, or role details..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-background border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold rounded-xl bg-accent text-white shadow-md hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}