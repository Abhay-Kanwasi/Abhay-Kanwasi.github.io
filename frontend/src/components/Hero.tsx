import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'

function useTyping(text: string, speed = 70, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      let i = 0
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(delayTimer)
  }, [text, speed, startDelay])

  return { displayed, done }
}

export default function Hero() {
  const { displayed, done } = useTyping(profile.name, 80, 800)
  const [showContent, setShowContent] = useState(false)

  const onTypingDone = useCallback(() => {
    if (done) {
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    }
  }, [done])

  useEffect(() => {
    return onTypingDone()
  }, [onTypingDone])

  return (
    <section id="whoami" className="flex min-h-screen items-center px-6 pt-14">
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 font-mono text-sm text-slate-500"
        >
          <span className="text-emerald-400">$</span> whoami
        </motion.div>

        <div className="font-mono">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
            {displayed}
            <span
              className={`ml-0.5 inline-block w-[3px] bg-cyan-400 align-middle ${done ? 'animate-blink' : ''}`}
              style={{ height: '1.1em' }}
            />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 space-y-1 text-sm"
          >
            <p>
              <span className="text-slate-500">role</span>
              <span className="text-slate-600"> = </span>
              <span className="text-amber-300">"{profile.role}"</span>
            </p>
            <p>
              <span className="text-slate-500">company</span>
              <span className="text-slate-600"> = </span>
              <span className="text-amber-300">"</span>
              <a
                href={profile.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 underline decoration-amber-300/30 underline-offset-2 transition-colors hover:text-amber-200"
              >
                {profile.company.name}
              </a>
              <span className="text-amber-300">"</span>
            </p>
            <p>
              <span className="text-slate-500">location</span>
              <span className="text-slate-600"> = </span>
              <span className="text-amber-300">"{profile.location}"</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 16 }}
          transition={{ duration: 0.5 }}
        >
          <p className="mt-8 max-w-xl text-base leading-relaxed text-slate-400">
            I build backend systems that scale. Focused on Python, cloud infrastructure, and
            intelligent automation — from scalable APIs to AI-driven pipelines, one module at a time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 font-mono text-sm">
            <a
              href="#contact"
              className="group rounded-md border border-cyan-500/30 bg-cyan-500/10 px-5 py-2.5 text-cyan-400 transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-500/20"
            >
              <span className="text-slate-500">{'>>> '}</span>
              get_in_touch()
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-700 px-5 py-2.5 text-slate-400 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-200"
            >
              <span className="text-slate-500">{'>>> '}</span>
              github.open()
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
