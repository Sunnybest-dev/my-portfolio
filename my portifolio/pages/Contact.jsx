import { motion } from 'framer-motion';
import { useSiteContent } from '../src/context/SiteContentContext';
import { supabase } from '../src/supabaseClient';
import SEO from '../component/SEO';

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Contact() {
  const { contact } = useSiteContent();
  const contactCards = Array.isArray(contact.contact_cards) ? contact.contact_cards : [];
  const socialLinks = Array.isArray(contact.social_links) ? contact.social_links : [];

  async function handleSubmit(e) {
    e.preventDefault();
    const f = e.target;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: f.name.value, 
            email: f.email.value, 
            message: f.message.value 
          }
        ]);

      if (error) throw error;
      
      alert('Message sent successfully! I\'ll get back to you soon.');
      f.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  }

  return (
    <>
      <SEO 
        title="Contact - Sunday Daniel Aniedeh | Get In Touch"
        description="Contact Sunday Daniel Aniedeh for web development projects, collaborations, or inquiries. Available for freelance and full-time opportunities."
        keywords="Contact Sunday Daniel Aniedeh, Hire Developer, Web Development Services, Freelance Developer, React Developer for Hire"
      />
      <section className="bg-black text-white min-h-screen px-6 py-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-xs uppercase tracking-widest text-yellow-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {contact.subtitle}
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {contact.title}
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {contact.intro_text}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Contact Form */}
          <motion.div
            className="bg-zinc-900 rounded-3xl p-10"
            variants={staggerItem}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <h3 className="text-2xl font-semibold mb-6">{contact.form_heading}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input
                  className="w-full p-4 bg-black rounded-xl border border-zinc-800 focus:border-yellow-600 outline-none transition"
                  placeholder="Your Name"
                  name="name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-4 bg-black rounded-xl border border-zinc-800 focus:border-yellow-600 outline-none transition"
                  placeholder="your@email.com"
                  name="email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  className="w-full p-4 bg-black rounded-xl border border-zinc-800 focus:border-yellow-600 outline-none transition h-32"
                  placeholder="Tell me about your project..."
                  name="message"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-4 rounded-full bg-yellow-600 font-semibold"
                whileHover={{ scale: 1.02, backgroundColor: 'rgb(202 138 4)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {contact.submit_button_text}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div className="space-y-8" variants={staggerContainer}>
            {contactCards.map((card, i) => (
              <motion.div
                key={i}
                className="bg-zinc-900 rounded-3xl p-8"
                variants={staggerItem}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
                <p className="text-gray-400">{card.value}</p>
              </motion.div>
            ))}

            <motion.div
              className="bg-gradient-to-r from-yellow-600/20 to-purple-600/20 rounded-3xl p-8"
              variants={staggerItem}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-semibold mb-4">{contact.follow_heading}</h4>
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.url || '#'}
                    className="px-6 py-3 bg-black rounded-full text-sm"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgb(202 138 4)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </>
  );
}
