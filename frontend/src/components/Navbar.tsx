import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, TerminalSquare } from 'lucide-react'
import { navLinks } from '../data/content'

interface NavbarProps {
  onSwitchToTerminal: () => void
}

export default function Navbar({ onSwitchToTerminal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 font-mono text-sm transition-all duration-400 ${
        scrolled
          ? 'border-b border-slate-700/60 bg-[#0b0f19]/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a href="#" className="text-slate-400 transition-colors hover:text-slate-200">
          <span className="text-emerald-400">abhay</span>
          <span className="text-slate-600">@</span>
          <span className="text-cyan-400">dev</span>
          <span className="text-slate-600">:~$</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded px-3 py-1.5 text-slate-500 transition-all duration-200 hover:bg-slate-800/70 hover:text-slate-200"
            >
              ~/{link.label}
            </a>
          ))}
          <button
            onClick={onSwitchToTerminal}
            className="ml-2 rounded border border-slate-700/50 p-1.5 text-slate-500 transition-all duration-200 hover:border-slate-600 hover:text-cyan-400"
            title="Switch to terminal mode"
          >
            <TerminalSquare size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onSwitchToTerminal}
            className="rounded p-2 text-slate-500 transition-colors hover:text-cyan-400"
            title="Terminal mode"
          >
            <TerminalSquare size={18} />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded p-2 text-slate-500 transition-colors hover:text-slate-200"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-700/60 bg-[#0b0f19]/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded px-3 py-2.5 text-slate-500 transition-colors hover:bg-slate-800/70 hover:text-slate-200"
                >
                  <span className="text-emerald-400">$</span> cd ~/{link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
