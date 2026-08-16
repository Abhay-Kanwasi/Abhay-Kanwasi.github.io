import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-slate-700/40 px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 font-mono text-[10px] text-slate-600 sm:flex-row sm:text-xs">
        <span>&copy; {new Date().getFullYear()} Abhay Kanwasi</span>
        <div className="flex items-center gap-4">
          <span className="hidden text-emerald-400/60 sm:inline">Python</span>
          <span className="hidden text-slate-700 sm:inline">|</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden text-slate-700 sm:inline">|</span>
          <div className="flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-cyan-400"
            >
              github
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-cyan-400"
            >
              linkedin
            </a>
            <a
              href={profile.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-cyan-400"
            >
              medium
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
