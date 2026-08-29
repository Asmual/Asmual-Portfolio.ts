"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-10 sm:py-14 relative bg-background border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground"
          >
            Get In <span className="text-accent">Touch</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-1 text-xs sm:text-sm text-foreground/75"
          >
            Have a project in mind or want to collaborate? Feel free to reach out.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="p-5 rounded-xl bg-card-bg border border-border/60 shadow-sm space-y-4">
              <div>
                <h3 className="text-base font-bold text-foreground">Contact Information</h3>
                <p className="text-xs text-foreground/70 mt-0.5">
                  Open for freelance roles, full-time positions, or web development projects.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Email</h4>
                    <a href="mailto:asmualobaidulhoque@gmail.com" className="text-xs font-medium text-foreground hover:text-accent transition-colors">
                      asmualobaidulhoque@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Phone</h4>
                    <p className="text-xs font-medium text-foreground">+880 1800-000000</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50">Location</h4>
                    <p className="text-xs font-medium text-foreground">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-border/60">
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-foreground/50 mb-2">Social Profiles</h4>
                <div className="flex gap-2">
                  <a 
                    href="https://github.com/Asmual" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-background border border-border text-foreground/80 hover:text-accent hover:border-accent transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-background border border-border text-foreground/80 hover:text-accent hover:border-accent transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin className="w-3.5 h-3.5" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="p-2 rounded-lg bg-background border border-border text-foreground/80 hover:text-accent hover:border-accent transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="p-5 rounded-xl bg-card-bg border border-border/60 shadow-sm">
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-accent mx-auto" />
                  <h3 className="text-base font-bold text-foreground">Message Sent Successfully!</h3>
                  <p className="text-xs text-foreground/70 max-w-xs mx-auto">
                    Thank you for reaching out. I will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 px-4 py-1.5 text-xs font-semibold rounded-lg bg-accent text-white hover:opacity-90 transition-opacity"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-[11px] font-medium text-foreground/80">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-[11px] font-medium text-foreground/80">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-3 py-1.5 text-xs rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="subject" className="text-[11px] font-medium text-foreground/80">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="message" className="text-[11px] font-medium text-foreground/80">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg bg-background border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-5 py-1.5 text-xs font-semibold rounded-lg bg-accent text-white shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <Send className="w-3 h-3" />
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