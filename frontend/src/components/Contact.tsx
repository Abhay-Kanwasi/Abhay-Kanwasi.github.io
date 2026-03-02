import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import SectionReveal from './SectionReveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-xl">
        <SectionReveal>
          <p className="mb-4 font-mono text-sm text-slate-500">
            <span className="text-emerald-400">$</span> contact --init
          </p>
          <p className="mb-10 font-mono text-sm text-slate-600">
            <span className="text-slate-500"># </span>
            ready to build something? initialize a connection.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mb-6 flex flex-wrap gap-3 font-mono text-sm">
            <a
              href="mailto:abhaykanwasi@gmail.com"
              className="rounded border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-400 transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-500/20"
            >
              <span className="text-slate-500">{'>>> '}</span>
              send_mail()
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-slate-700 px-4 py-2 text-slate-400 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-200"
            >
              <span className="text-slate-500">{'>>> '}</span>
              linkedin.connect()
            </a>
            <a
              href={profile.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-slate-700 px-4 py-2 text-slate-400 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-200"
            >
              <span className="text-slate-500">{'>>> '}</span>
              medium.open()
            </a>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 font-mono text-sm">
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-slate-700/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-xs text-slate-500">message.py</span>
            </div>

            <form
              className="space-y-4 p-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <p className="text-slate-600"># drop a message below</p>

              <div>
                <label className="mb-1.5 block text-slate-500">name =</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded border border-slate-700 bg-[#0b0f19]/80 px-3 py-2.5 text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-cyan-500/50"
                  placeholder='"Your name"'
                />
              </div>

              <div>
                <label className="mb-1.5 block text-slate-500">email =</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded border border-slate-700 bg-[#0b0f19]/80 px-3 py-2.5 text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-cyan-500/50"
                  placeholder='"your@email.com"'
                />
              </div>

              <div>
                <label className="mb-1.5 block text-slate-500">message =</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full resize-none rounded border border-slate-700 bg-[#0b0f19]/80 px-3 py-2.5 text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-cyan-500/50"
                  placeholder='"Your message..."'
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full rounded border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-cyan-400 transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-500/20"
              >
                {'>>> '}send_message()
              </motion.button>
            </form>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
