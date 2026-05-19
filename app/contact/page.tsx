'use client';

import Navbar from '@/components/navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Loader2, Upload, FileText, X } from 'lucide-react';
import { useRef, useState } from 'react';

const MAX_PDF_BYTES = 10 * 1024 * 1024; // 10 MB

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfError(null);
    const file = e.target.files?.[0];
    if (!file) {
      setPdfFile(null);
      return;
    }
    const isPdfByMime = file.type === 'application/pdf';
    const isPdfByExt = file.name.toLowerCase().endsWith('.pdf');
    if (!isPdfByMime && !isPdfByExt) {
      setPdfError('Only PDF files are accepted.');
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > MAX_PDF_BYTES) {
      setPdfError('PDF must be 10 MB or smaller.');
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setPdfFile(file);
  };

  const clearPdf = () => {
    setPdfFile(null);
    setPdfError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission (would POST FormData with the PDF attached in a real backend)
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
    clearPdf();
    alert('Application submitted! We\'ll contact you shortly.');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-background via-surface-1 to-background pt-32 pb-20">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-10 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'var(--green-primary)' }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-20 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'var(--gold)' }}
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-bold mb-4"
          >
          <span className="text-green-primary">
            Get in Touch
          </span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Talk to Yavigo about visa and immigration partnerships — for your travel agency, corporate, or consultancy.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact info cards */}
          {[
            { icon: Phone, title: 'Call Us', content: '+1 (800) 555-0123' },
            { icon: Mail, title: 'Email', content: 'support@yavigo.com' },
            { icon: MapPin, title: 'Partnerships', content: 'partners@yavigo.com' }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="p-6 bg-surface-2/80 backdrop-blur-sm border border-green-primary/20 rounded-2xl hover:border-green-primary/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <item.icon className="w-8 h-8 text-green-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Office locations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-foreground mb-6">Our Offices</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                city: 'Noida, India',
                line1: 'Sector 62, Noida',
                line2: 'Uttar Pradesh 201301, India',
                hours: 'Mon–Sat · 09:30 – 18:30 IST',
              },
              {
                city: 'Amsterdam, Netherlands',
                line1: 'Amsterdam',
                line2: 'The Netherlands',
                hours: 'Mon–Fri · 09:00 – 18:00 CET',
              },
            ].map((office) => (
              <motion.div
                key={office.city}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-6 bg-surface-2/80 backdrop-blur-sm border border-green-primary/20 rounded-2xl hover:border-green-primary/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-green-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{office.city}</h3>
                    <p className="text-sm text-muted-foreground">{office.line1}</p>
                    <p className="text-sm text-muted-foreground mb-3">{office.line2}</p>
                    <p className="text-xs text-muted-foreground">{office.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main form section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="p-8 bg-surface-2/50 backdrop-blur-sm border border-green-primary/20 rounded-2xl"
          >
            <h2 className="text-2xl font-bold mb-6 text-foreground">Visa Application Form</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-surface-1 border border-green-primary/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-green-primary/50 focus:outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-surface-1 border border-green-primary/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-green-primary/50 focus:outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-surface-1 border border-green-primary/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-green-primary/50 focus:outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Destination Country</label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-surface-1 border border-green-primary/20 rounded-lg text-foreground focus:border-green-primary/50 focus:outline-none transition-all"
                >
                  <option value="">Select destination...</option>
                  <option value="france">France</option>
                  <option value="uk">United Kingdom</option>
                  <option value="germany">Germany</option>
                  <option value="italy">Italy</option>
                  <option value="usa">United States</option>
                  <option value="dubai">Dubai/UAE</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-surface-1 border border-green-primary/20 rounded-lg text-foreground placeholder:text-muted-foreground focus:border-green-primary/50 focus:outline-none transition-all"
                  placeholder="Tell us about your travel plans..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Attach Supporting Document (PDF, optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="document"
                  accept="application/pdf,.pdf"
                  onChange={handlePdfChange}
                  className="sr-only"
                  id="pdf-upload"
                />
                {!pdfFile ? (
                  <label
                    htmlFor="pdf-upload"
                    className="flex flex-col items-center justify-center gap-2 px-4 py-6 bg-surface-1 border-2 border-dashed border-green-primary/30 rounded-lg text-center cursor-pointer hover:border-green-primary/60 hover:bg-surface-1/80 transition-all"
                  >
                    <Upload className="w-5 h-5 text-green-primary" />
                    <span className="text-sm text-foreground font-medium">Click to upload a PDF</span>
                    <span className="text-xs text-muted-foreground">Max 10 MB · PDF only</span>
                  </label>
                ) : (
                  <div className="flex items-center justify-between gap-3 px-4 py-3 bg-surface-1 border border-green-primary/30 rounded-lg">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-5 h-5 text-green-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{pdfFile.name}</p>
                        <p className="text-xs text-muted-foreground">{formatBytes(pdfFile.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearPdf}
                      aria-label="Remove attached PDF"
                      className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {pdfError && (
                  <p className="mt-2 text-xs text-red-500" role="alert">{pdfError}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-primary to-green-bright text-primary-foreground font-semibold rounded-lg hover:shadow-lg shadow-green-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>

          {/* Info section */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Why Choose Yavigo?</h2>
            
            <div className="space-y-4">
              {[
                { title: 'Fast Approvals', desc: 'Get visa decisions in days, not weeks' },
                { title: 'Expert Support', desc: 'Dedicated visa & immigration specialists' },
                { title: 'Secure Process', desc: 'Advanced fraud detection & data protection' },
                { title: 'Online Submission', desc: 'No need to physically submit documents' },
                { title: '100+ Countries', desc: 'We handle visas for destinations worldwide' },
                { title: 'Transparent Pricing', desc: 'No hidden fees, competitive rates' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-green-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* FAQ section */}
        <motion.div
          className="py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { q: 'How long does the visa process take?', a: 'Most visas are processed within 5-15 business days depending on the destination.' },
              { q: 'Do I need to submit my passport physically?', a: 'No! For eligible e-visas, all documents are submitted online.' },
              { q: 'What documents do I need?', a: 'Typically passport, photos, and travel itinerary. Varies by destination.' },
              { q: 'Is my information secure?', a: 'Yes, we use enterprise-grade encryption and comply with all data protection laws.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 bg-surface-2/50 border border-green-primary/20 rounded-xl"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      </main>
    </>
  );
}
