import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../src/supabaseClient';
import SEO from '../component/SEO';

export default function Resume() {
  const [resume, setResume] = useState({ work_history: [], education: [], certifications: [] });
  const resumeRef = useRef(null);

  useEffect(() => {
    fetchResume();
  }, []);



  async function fetchResume() {
    const { data } = await supabase.from('resume_content').select('*').single();
    if (data) setResume(data);
  }

  async function generatePDF() {
    window.print();
  }

  return (
    <>
      <SEO 
        title="Resume - Sunday Daniel Aniedeh | CV & Work History"
        description="Download Sunday Daniel Aniedeh's resume. View detailed work history, education, certifications, and professional experience."
        keywords="Sunday Daniel Aniedeh Resume, CV Download, Work History, Developer Resume, Professional Experience"
      />
      <section className="bg-black text-white min-h-screen px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-6">Resume</h1>
            <p className="text-gray-400 mb-8">My professional journey and qualifications</p>
            
            <motion.button
              onClick={generatePDF}
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-600 rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Print / Save as PDF
            </motion.button>
          </motion.div>

          <div ref={resumeRef} className="bg-white text-black p-12 rounded-xl">
            {/* Resume Header */}
            <div className="flex gap-8 mb-8 pb-8 border-b-2 border-gray-300">
              {/* Photo */}
              {resume.profile_image && (
                <img 
                  src={resume.profile_image} 
                  alt={resume.full_name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-yellow-600"
                />
              )}
              
              {/* Header Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{resume.full_name || 'Your Name'}</h1>
                <h2 className="text-xl text-yellow-600 font-semibold mb-4">{resume.title || 'Your Title'}</h2>
                
                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {resume.email && (
                    <div className="flex items-center gap-2">
                      <span>📧</span>
                      <span>{resume.email}</span>
                    </div>
                  )}
                  {resume.phone && (
                    <div className="flex items-center gap-2">
                      <span>📱</span>
                      <span>{resume.phone}</span>
                    </div>
                  )}
                  {resume.location && (
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{resume.location}</span>
                    </div>
                  )}
                  {resume.website && (
                    <div className="flex items-center gap-2">
                      <span>🌐</span>
                      <span className="truncate">{resume.website}</span>
                    </div>
                  )}
                  {resume.linkedin && (
                    <div className="flex items-center gap-2">
                      <span>💼</span>
                      <span className="truncate">{resume.linkedin}</span>
                    </div>
                  )}
                  {resume.github && (
                    <div className="flex items-center gap-2">
                      <span>💻</span>
                      <span className="truncate">{resume.github}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            {resume.summary && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-3 text-yellow-600 border-b-2 border-yellow-600 pb-2">Professional Summary</h3>
                <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
              </div>
            )}

          {/* Work History */}
          {resume.work_history && resume.work_history.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-600 border-b-2 border-yellow-600 pb-2">Work Experience</h2>
              <div className="space-y-4">
                {resume.work_history.map((job, i) => (
                  <div key={i} className="border-l-4 border-yellow-600 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold">{job.position}</h3>
                        <p className="text-yellow-600 font-semibold">{job.company}</p>
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">{job.duration}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{job.description}</p>
                    {job.achievements && job.achievements.length > 0 && (
                      <ul className="space-y-1">
                        {job.achievements.map((achievement, j) => (
                          <li key={j} className="text-sm text-gray-700">• {achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Education */}
          {resume.education && resume.education.length > 0 && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-600 border-b-2 border-yellow-600 pb-2">Education</h2>
              <div className="space-y-4">
                {resume.education.map((edu, i) => (
                  <div key={i} className="border-l-4 border-yellow-600 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold">{edu.degree}</h3>
                        <p className="text-yellow-600 font-semibold">{edu.institution}</p>
                        {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-sm text-gray-600 font-semibold">{edu.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-600 border-b-2 border-yellow-600 pb-2">Certifications</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {resume.certifications.map((cert, i) => (
                  <div key={i} className="border-l-4 border-yellow-600 pl-4">
                    <h3 className="font-bold">{cert.name}</h3>
                    <p className="text-yellow-600 text-sm">{cert.issuer}</p>
                    <p className="text-gray-600 text-sm">{cert.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          </div>
        </div>
      </section>
    </>
  );
}
