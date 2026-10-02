import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFilePdf,
  FaDownload,
  FaEye,
  FaShareAlt,
  FaCheck,
  FaFileAlt,
} from 'react-icons/fa';
import Thumbnail from '../../assets/resumethumbnail.png';
const Resume = () => {
  const pdfUrl = '/Yash_Chourey_Resume_A4.pdf';
  const pdfName = 'Yash_Chourey_Resume_A4.pdf';
  const pdfSize = '71 KB';
  const pdfPages = '1 page';

  const [downloaded, setDownloaded] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const handleView = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Yash Chourey — Resume',
          text: 'Check out my resume',
          url: window.location.origin + pdfUrl,
        });
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.origin + pdfUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        alert('Could not copy link');
      }
    }
  };

  return (
    <div
      className="section-surface section-surface--gradient relative z-10 w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-12"
      id="resume"
    >
      <div className="w-full max-w-4xl">

        {/* ── HEADING + DESCRIPTION ── */}
        <div className="text-center mb-8">
          {/* Icon + Heading inline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <FaFileAlt className="w-8 h-8 md:w-10 md:h-10 text-[var(--lime-primary)]" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              My Resume
            </h2>
          </motion.div>

          {/* Description — heading ke neeche, button ke upar */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
          >
            A quick snapshot of my journey — education, experience, skills, and the
            tools I work with. Download or view the full PDF to explore more.
          </motion.p>

          {/* Accent line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-1 bg-[var(--lime-primary)] rounded-full mx-auto mt-6"
          />
        </div>

        {/* ── FILE CARD ── */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">

          {/* ── THUMBNAIL PREVIEW ── */}
          <div className="relative bg-gray-100 border-b border-gray-200 overflow-hidden">
            <div className="relative w-full aspect-[2/1] overflow-hidden">
              <img src={Thumbnail} alt="Resume Thumbnail" className="w-full h-full object-cover" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/70 to-transparent" />
            </div>

            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-500 text-white shadow-md">
              <FaFilePdf className="w-3 h-3" />
              <span className="text-[9px] font-bold uppercase tracking-wider">PDF</span>
            </div>
          </div>

          {/* ── FILE INFO + ACTIONS ── */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center">
                <FaFilePdf className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                  {pdfName}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                  {pdfPages} · PDF · {pdfSize}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-black text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-[var(--lime-primary)] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
              >
                {downloaded ? (
                  <><FaCheck className="w-3.5 h-3.5" /><span>Done</span></>
                ) : (
                  <><FaDownload className="w-3.5 h-3.5" /><span>Download</span></>
                )}
              </button>

              <button
                onClick={handleView}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
              >
                <FaEye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-[11px] sm:text-xs font-bold uppercase tracking-wider hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
              >
                {copied ? (
                  <><FaCheck className="w-3.5 h-3.5 text-[var(--lime-primary)]" /><span>Copied</span></>
                ) : (
                  <><FaShareAlt className="w-3.5 h-3.5" /><span>Share</span></>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resume;