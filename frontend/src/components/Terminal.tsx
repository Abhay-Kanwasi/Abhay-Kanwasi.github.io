import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { profile, techStack, projects, experiences, articles } from '../data/content'

const articleComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'exception-handling-python': lazy(() => import('./articles/ExceptionHandlingArticle')),
  'google-auth-jwt-django-react': lazy(() => import('./articles/GoogleAuthArticle')),
  'deploying-django-rocky-linux': lazy(() => import('./articles/DeployingDjangoArticle')),
  'configurable-storage-django': lazy(() => import('./articles/ConfigurableStorageArticle')),
}

// ─── Types ──────────────────────────────────────────────────────────

interface TerminalLine {
  id: number
  type: 'input' | 'output'
  content: React.ReactNode
  cwd?: string[]
}

type FSNode =
  | { type: 'dir'; children: Record<string, FSNode> }
  | { type: 'file'; render: () => React.ReactNode }

interface CommandResult {
  output?: React.ReactNode
  clear?: boolean
  gui?: boolean
  newCwd?: string[]
}

let lineId = 1

// ─── Virtual Filesystem ─────────────────────────────────────────────

const ARTICLE_URLS: Record<string, string> = {
  'exception-handling-python': profile.medium,
  'google-auth-jwt-django-react':
    'https://medium.com/@abhaykanwasi/building-google-authentication-with-jwt-in-django-and-react-a2f71ec02432',
  'deploying-django-rocky-linux':
    'https://medium.com/@abhaykanwasi/the-complete-guide-to-deploying-django-on-rocky-linux-10-from-zero-to-production-1806a82cb06d',
  'configurable-storage-django':
    'https://medium.com/@abhaykanwasi/configurable-storage-in-django-seamlessly-switch-between-local-and-cloud-cf2070bc05a5',
}

function buildFS(): FSNode {
  const articleChildren: Record<string, FSNode> = {}
  articles.forEach((a) => {
    const LazyArticle = articleComponents[a.id]
    articleChildren[`${a.id}.md`] = {
      type: 'file',
      render: () =>
        LazyArticle ? (
          <Suspense fallback={<p className="text-slate-500">loading article...</p>}>
            <LazyArticle />
          </Suspense>
        ) : (
          renderArticleFallback(a)
        ),
    }
  })

  const projectChildren: Record<string, FSNode> = {}
  projects.forEach((p) => {
    projectChildren[p.className] = {
      type: 'dir',
      children: {
        'README.md': { type: 'file', render: () => renderProjectReadme(p) },
      },
    }
  })

  return {
    type: 'dir',
    children: {
      'about.txt': { type: 'file', render: renderWhoami },
      'skills.conf': { type: 'file', render: renderSkills },
      'experience.log': { type: 'file', render: renderExperience },
      'contact.py': { type: 'file', render: renderContact },
      articles: { type: 'dir', children: articleChildren },
      projects: { type: 'dir', children: projectChildren },
    },
  }
}

const ROOT = buildFS()

function resolvePath(cwd: string[], input: string): string[] {
  let segments: string[]
  if (input === '~' || input === '') return []
  if (input.startsWith('~/')) segments = input.slice(2).split('/').filter(Boolean)
  else if (input === '/') return []
  else segments = [...cwd, ...input.split('/').filter(Boolean)]

  const resolved: string[] = []
  for (const seg of segments) {
    if (seg === '..') resolved.pop()
    else if (seg !== '.') resolved.push(seg)
  }
  return resolved
}

function getNode(path: string[]): FSNode | null {
  let current: FSNode = ROOT
  for (const seg of path) {
    if (current.type !== 'dir' || !current.children[seg]) return null
    current = current.children[seg]
  }
  return current
}

function promptPath(cwd: string[]): string {
  return cwd.length === 0 ? '~' : '~/' + cwd.join('/')
}

// ─── Shared Components ──────────────────────────────────────────────

function Prompt({ cwd }: { cwd: string[] }) {
  return (
    <>
      <span className="text-emerald-400">abhay</span>
      <span className="text-slate-600">@</span>
      <span className="text-cyan-400">dev</span>
      <span className="text-slate-600">:</span>
      <span className="text-blue-400">{promptPath(cwd)}</span>
      <span className="text-slate-600">$&nbsp;</span>
    </>
  )
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-400 underline decoration-cyan-400/30 underline-offset-2 transition-colors hover:text-cyan-300"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  )
}

// ─── Output Renderers ───────────────────────────────────────────────

function renderWelcome(): React.ReactNode {
  return (
    <div className="mb-2 text-slate-500">
      <p className="text-slate-600">Last login: {new Date().toDateString()}</p>
      <p className="mt-2 text-slate-300">
        Welcome to <span className="text-emerald-400">abhay</span>
        <span className="text-slate-600">@</span>
        <span className="text-cyan-400">dev</span>{' '}
        <span className="text-slate-500">— portfolio v2.0</span>
      </p>
      <div className="mt-3">
        <p>Navigate this portfolio like a real filesystem:</p>
        <div className="mt-1.5 space-y-0.5 pl-2">
          <p>
            <span className="inline-block w-28 text-cyan-400">ls</span>
            <span className="text-slate-600">list files & directories</span>
          </p>
          <p>
            <span className="inline-block w-28 text-cyan-400">cd &lt;dir&gt;</span>
            <span className="text-slate-600">enter a directory</span>
          </p>
          <p>
            <span className="inline-block w-28 text-cyan-400">cat &lt;file&gt;</span>
            <span className="text-slate-600">read a file</span>
          </p>
          <p>
            <span className="inline-block w-28 text-cyan-400">help</span>
            <span className="text-slate-600">all commands</span>
          </p>
        </div>
        <p className="mt-2 text-slate-600">
          Try: <span className="text-cyan-400">ls</span> then{' '}
          <span className="text-cyan-400">cat about.txt</span>
        </p>
      </div>
    </div>
  )
}

function renderHelp(): React.ReactNode {
  const cmds = [
    ['ls [path]', 'List directory contents'],
    ['cd <dir>', 'Change directory'],
    ['cd ..', 'Go up one level'],
    ['cat <file>', 'Read a file'],
    ['pwd', 'Print working directory'],
    ['whoami', 'About me (shortcut)'],
    ['skills', 'Tech stack (shortcut)'],
    ['projects', 'List projects (shortcut)'],
    ['experience', 'Work history (shortcut)'],
    ['contact', 'Contact info (shortcut)'],
    ['neofetch', 'System info'],
    ['clear', 'Clear terminal'],
    ['gui', 'Switch to visual mode'],
  ]
  return (
    <div className="text-slate-400">
      <p className="mb-2 text-slate-500">Available commands:</p>
      <div className="space-y-0.5">
        {cmds.map(([cmd, desc]) => (
          <p key={cmd}>
            <span className="inline-block w-24 text-cyan-400">{cmd}</span>
            <span className="text-slate-500">{desc}</span>
          </p>
        ))}
      </div>
      <p className="mt-3 text-slate-600">Tip: ↑↓ for history, Tab to autocomplete, Ctrl+L to clear</p>
    </div>
  )
}

function renderWhoami(): React.ReactNode {
  return (
    <div className="text-slate-400">
      <p className="text-lg font-bold text-slate-200">{profile.name}</p>
      <div className="mt-1 space-y-0.5">
        <p>
          <span className="text-slate-500">role     = </span>
          <span className="text-amber-300">"{profile.role}"</span>
        </p>
        <p>
          <span className="text-slate-500">company  = </span>
          <span className="text-amber-300">"</span>
          <Link href={profile.company.url}>{profile.company.name}</Link>
          <span className="text-amber-300">"</span>
        </p>
        <p>
          <span className="text-slate-500">location = </span>
          <span className="text-amber-300">"{profile.location}"</span>
        </p>
      </div>
      <p className="mt-3 max-w-lg leading-relaxed text-slate-400">
        I build backend systems that scale. Focused on Python, cloud infrastructure, and intelligent
        automation — from scalable APIs to AI-driven pipelines, one module at a time.
      </p>
      <div className="mt-3 space-y-0.5 text-slate-500">
        <p>
          <span className="inline-block w-14">github</span>{' '}
          <Link href={profile.github}>github.com/Abhay-Kanwasi</Link>
        </p>
        <p>
          <span className="inline-block w-14">linkedin</span>{' '}
          <Link href={profile.linkedin}>linkedin.com/in/abhay-kanwasi</Link>
        </p>
        <p>
          <span className="inline-block w-14">medium</span>{' '}
          <Link href={profile.medium}>medium.com/@abhaykanwasi</Link>
        </p>
      </div>
    </div>
  )
}

function renderSkills(): React.ReactNode {
  return (
    <div className="text-slate-400">
      {techStack.map((group) => (
        <p key={group.category} className="mt-1 first:mt-0">
          <span className="inline-block w-36 text-slate-500 sm:w-44">{group.category}:</span>
          <span className="text-slate-300">{group.items.join(', ')}</span>
        </p>
      ))}
    </div>
  )
}

function renderExperience(): React.ReactNode {
  return (
    <div className="space-y-4 text-slate-400">
      {experiences.map((exp, i) => (
        <div key={i}>
          <p>
            <span className="text-slate-600">[{exp.timestamp}]</span>{' '}
            <span className="text-emerald-400">{exp.level}</span>{' '}
            <span className="text-slate-200">{exp.role}</span>{' '}
            <span className="text-slate-600">@</span>{' '}
            <Link href={exp.companyUrl}>{exp.company}</Link>
          </p>
          <p className="text-xs text-slate-600">
            {exp.period} · {exp.location}
          </p>
          <div className="mt-1">
            {exp.description
              .split('. ')
              .filter(Boolean)
              .slice(0, 3)
              .map((line, j) => (
                <p key={j} className="text-slate-500">
                  <span className="text-slate-600 select-none">├── </span>
                  {line.endsWith('.') ? line : `${line}.`}
                </p>
              ))}
          </div>
          <p className="mt-1 text-xs text-slate-600">[{exp.skills.join(', ')}]</p>
        </div>
      ))}
    </div>
  )
}

function renderContact(): React.ReactNode {
  return (
    <div className="text-slate-400">
      <p className="text-slate-500">Ready to build something? Let's connect.</p>
      <div className="mt-3 space-y-1">
        <p>
          <span className="inline-block w-14 text-slate-500">email</span>{' '}
          <Link href="mailto:abhaykanwasi@gmail.com">abhaykanwasi@gmail.com</Link>
        </p>
        <p>
          <span className="inline-block w-14 text-slate-500">github</span>{' '}
          <Link href={profile.github}>github.com/Abhay-Kanwasi</Link>
        </p>
        <p>
          <span className="inline-block w-14 text-slate-500">linkedin</span>{' '}
          <Link href={profile.linkedin}>linkedin.com/in/abhay-kanwasi</Link>
        </p>
        <p>
          <span className="inline-block w-14 text-slate-500">medium</span>{' '}
          <Link href={profile.medium}>medium.com/@abhaykanwasi</Link>
        </p>
      </div>
    </div>
  )
}

function renderArticleFallback(article: (typeof articles)[number]): React.ReactNode {
  const url = ARTICLE_URLS[article.id]
  return (
    <div className="text-slate-400">
      <p className="font-bold text-slate-200">{article.title}</p>
      <p className="text-slate-600">{article.date} · Abhay Kanwasi</p>
      <p className="mt-2 leading-relaxed">{article.description}</p>
      {url && (
        <p className="mt-3">
          <Link href={url}>→ Read full article on Medium</Link>
        </p>
      )}
      <p className="mt-1 text-slate-600">
        Tip: type <span className="text-cyan-400">gui</span> to read with full formatting and syntax
        highlighting.
      </p>
    </div>
  )
}

function renderProjectReadme(project: (typeof projects)[number]): React.ReactNode {
  return (
    <div className="text-slate-400">
      <p className="font-bold text-cyan-400"># {project.className}</p>
      <ul className="mt-1 list-none space-y-1">
        {project.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 leading-relaxed text-emerald-400/80">
            <span className="mt-1 shrink-0 text-emerald-500">•</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-slate-500">## Stack</p>
      <p className="text-amber-300">[{project.stack.map((t) => `"${t}"`).join(', ')}]</p>
      <div className="mt-3 space-y-0.5">
        {project.liveLink && (
          <p>
            <span className="text-slate-500">demo:   </span>
            <Link href={project.liveLink}>{project.liveLink}</Link>
          </p>
        )}
        {project.sourceCode && (
          <p>
            <span className="text-slate-500">source: </span>
            <Link href={project.sourceCode}>{project.sourceCode}</Link>
          </p>
        )}
      </div>
    </div>
  )
}

function renderNeofetch(): React.ReactNode {
  const totalSkills = techStack.reduce((sum, g) => sum + g.items.length, 0)
  return (
    <div className="text-slate-400">
      <p className="text-slate-200">
        <span className="text-emerald-400">abhay</span>
        <span className="text-slate-600">@</span>
        <span className="text-cyan-400">dev</span>
      </p>
      <p className="text-slate-700">─────────────────────</p>
      <p><span className="inline-block w-16 text-cyan-400">OS</span> Portfolio v2.0</p>
      <p><span className="inline-block w-16 text-cyan-400">Shell</span> bash</p>
      <p><span className="inline-block w-16 text-cyan-400">Role</span> {profile.role}</p>
      <p><span className="inline-block w-16 text-cyan-400">Company</span> {profile.company.name}</p>
      <p><span className="inline-block w-16 text-cyan-400">Stack</span> Python, Django, FastAPI, React</p>
      <p><span className="inline-block w-16 text-cyan-400">Uptime</span> 2+ years experience</p>
      <p><span className="inline-block w-16 text-cyan-400">Packages</span> {totalSkills} skills loaded</p>
      <div className="mt-2 flex gap-1">
        {['bg-red-400', 'bg-amber-400', 'bg-emerald-400', 'bg-cyan-400', 'bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-slate-400'].map(
          (c) => <span key={c} className={`inline-block h-3 w-3 rounded-sm ${c}`} />,
        )}
      </div>
    </div>
  )
}

function renderLs(cwd: string[], arg?: string): React.ReactNode {
  const targetPath = arg ? resolvePath(cwd, arg) : cwd
  const node = getNode(targetPath)

  if (!node) return <p className="text-red-400">ls: cannot access '{arg}': No such file or directory</p>
  if (node.type === 'file') {
    const name = arg || targetPath[targetPath.length - 1] || ''
    return <p className="text-slate-300">{name}</p>
  }

  const entries = Object.entries(node.children)
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-slate-400">
      {entries.map(([name, child]) => (
        <span key={name} className={child.type === 'dir' ? 'font-bold text-cyan-400' : 'text-slate-300'}>
          {name}{child.type === 'dir' ? '/' : ''}
        </span>
      ))}
    </div>
  )
}

// ─── Easter Eggs ────────────────────────────────────────────────────

function getEasterEgg(cmd: string): React.ReactNode | null {
  const lower = cmd.toLowerCase()
  if (lower.startsWith('sudo'))
    return <p className="text-red-400">Permission denied. You're not root on this portfolio.</p>
  if (lower.startsWith('rm '))
    return <p className="text-red-400">rm: cannot remove: this portfolio is read-only.</p>
  if (lower === 'exit' || lower === 'quit')
    return <p className="text-slate-500">There's no escape. Type <span className="text-cyan-400">gui</span> for visual mode.</p>
  if (lower === 'python' || lower === 'python3')
    return (
      <div className="text-slate-400">
        <p>Python 3.12.0</p>
        <p className="text-slate-500">{'>>> '}import abhay</p>
        <p className="text-slate-500">{'>>> '}abhay.status()</p>
        <p className="text-amber-300">'Building systems at {profile.company.name}'</p>
      </div>
    )
  if (lower.startsWith('pip install'))
    return <p className="text-emerald-400">Successfully installed all skills. Run <span className="text-cyan-400">cat skills.conf</span> to verify.</p>
  if (lower.startsWith('docker'))
    return <p className="text-cyan-400">All containers running. See <span className="text-cyan-400">cat experience.log</span>.</p>
  if (lower === 'git status')
    return (
      <div className="text-slate-400">
        <p>On branch <span className="text-emerald-400">main</span></p>
        <p className="text-emerald-400">All changes deployed to production ✓</p>
      </div>
    )
  if (lower === 'date') return <p className="text-slate-400">{new Date().toString()}</p>
  if (lower.startsWith('echo '))
    return <p className="text-slate-400">{cmd.slice(5).replace(/^["']|["']$/g, '')}</p>
  if (lower === 'mkdir' || lower.startsWith('mkdir '))
    return <p className="text-red-400">mkdir: read-only file system</p>
  if (lower === 'touch' || lower.startsWith('touch '))
    return <p className="text-red-400">touch: read-only file system</p>
  if (lower === 'vim' || lower === 'nano' || lower === 'vi')
    return <p className="text-slate-500">No editors needed. This portfolio is already perfect.</p>
  return null
}

// ─── Command Processor ──────────────────────────────────────────────

function processCommand(raw: string, cwd: string[]): CommandResult {
  const trimmed = raw.trim()
  if (!trimmed) return {}

  const parts = trimmed.split(/\s+/)
  const cmd = parts[0].toLowerCase()
  const args = parts.slice(1).join(' ')

  if (cmd === 'clear') return { clear: true }
  if (cmd === 'gui') return { gui: true }
  if (cmd === 'help') return { output: renderHelp() }
  if (cmd === 'pwd') return { output: <p className="text-slate-400">/home/abhay/portfolio/{cwd.join('/')}</p> }

  // Filesystem commands
  if (cmd === 'cd') {
    if (!args || args === '~') return { newCwd: [] }
    const target = resolvePath(cwd, args)
    const node = getNode(target)
    if (!node) return { output: <p className="text-red-400">cd: {args}: No such file or directory</p> }
    if (node.type === 'file') return { output: <p className="text-red-400">cd: {args}: Not a directory</p> }
    return { newCwd: target }
  }

  if (cmd === 'ls') return { output: renderLs(cwd, args || undefined) }

  if (cmd === 'cat') {
    if (!args) return { output: <p className="text-red-400">cat: missing file operand</p> }
    const target = resolvePath(cwd, args)
    const node = getNode(target)
    if (!node) return { output: <p className="text-red-400">cat: {args}: No such file or directory</p> }
    if (node.type === 'dir') return { output: <p className="text-red-400">cat: {args}: Is a directory</p> }
    return { output: node.render() }
  }

  // Shortcuts (still work from anywhere)
  if (cmd === 'whoami' || cmd === 'about') return { output: renderWhoami() }
  if (cmd === 'skills' || cmd === 'tech_stack') return { output: renderSkills() }
  if (cmd === 'projects') return { output: renderLs([], 'projects') }
  if (cmd === 'experience') return { output: renderExperience() }
  if (cmd === 'articles') return { output: renderLs([], 'articles') }
  if (cmd === 'contact') return { output: renderContact() }
  if (cmd === 'neofetch') return { output: renderNeofetch() }

  const egg = getEasterEgg(trimmed)
  if (egg) return { output: egg }

  return {
    output: (
      <p className="text-red-400">
        command not found: {cmd}. Type <span className="text-cyan-400">help</span> for available commands.
      </p>
    ),
  }
}

// ─── Main Component ─────────────────────────────────────────────────

export default function Terminal({ onSwitchToGui }: { onSwitchToGui: () => void }) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, type: 'output', content: renderWelcome(), cwd: [] },
  ])
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState<string[]>([])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [maximized, setMaximized] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim()
      const result = processCommand(trimmed, cwd)

      if (result.gui) {
        onSwitchToGui()
        return
      }

      if (result.clear) {
        setLines([])
        setInput('')
        if (trimmed) setCmdHistory((prev) => [trimmed, ...prev])
        setHistoryIdx(-1)
        return
      }

      const newLines: TerminalLine[] = [
        { id: lineId++, type: 'input', content: trimmed, cwd: [...cwd] },
      ]
      if (result.output) {
        newLines.push({ id: lineId++, type: 'output', content: result.output })
      }

      if (result.newCwd !== undefined) setCwd(result.newCwd)

      setLines((prev) => [...prev, ...newLines])
      setInput('')
      if (trimmed) setCmdHistory((prev) => [trimmed, ...prev])
      setHistoryIdx(-1)
    },
    [cwd, onSwitchToGui],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        executeCommand(input)
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (cmdHistory.length === 0) return
        const next = Math.min(historyIdx + 1, cmdHistory.length - 1)
        setHistoryIdx(next)
        setInput(cmdHistory[next])
        return
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIdx <= 0) {
          setHistoryIdx(-1)
          setInput('')
          return
        }
        const next = historyIdx - 1
        setHistoryIdx(next)
        setInput(cmdHistory[next])
        return
      }

      if (e.key === 'Tab') {
        e.preventDefault()
        const parts = input.split(/\s+/)
        const currentNode = getNode(cwd)
        if (!currentNode || currentNode.type !== 'dir') return

        if (parts.length <= 1) {
          const partial = parts[0]?.toLowerCase() || ''
          const matches = COMPLETABLE_CMDS.filter((c) => c.startsWith(partial))
          if (matches.length === 1) setInput(matches[0])
          else if (matches.length > 1) {
            setLines((prev) => [
              ...prev,
              { id: lineId++, type: 'input', content: input, cwd: [...cwd] },
              { id: lineId++, type: 'output', content: <p className="text-slate-500">{matches.join('  ')}</p> },
            ])
          }
        } else {
          const cmd = parts[0].toLowerCase()
          const partial = parts.slice(1).join(' ')
          const pathParts = partial.split('/')
          const dirPart = pathParts.slice(0, -1).join('/')
          const filePart = pathParts[pathParts.length - 1].toLowerCase()

          const lookupPath = dirPart ? resolvePath(cwd, dirPart) : cwd
          const lookupNode = getNode(lookupPath)
          if (!lookupNode || lookupNode.type !== 'dir') return

          const names = Object.entries(lookupNode.children)
            .filter(([name]) => name.toLowerCase().startsWith(filePart))
            .filter(([, node]) => {
              if (cmd === 'cd') return node.type === 'dir'
              return true
            })
            .map(([name, node]) => name + (node.type === 'dir' ? '/' : ''))

          if (names.length === 1) {
            const prefix = dirPart ? dirPart + '/' : ''
            setInput(`${cmd} ${prefix}${names[0]}`)
          } else if (names.length > 1) {
            setLines((prev) => [
              ...prev,
              { id: lineId++, type: 'input', content: input, cwd: [...cwd] },
              { id: lineId++, type: 'output', content: <p className="text-slate-500">{names.join('  ')}</p> },
            ])
          }
        }
        return
      }

      if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault()
        setLines([])
      }
    },
    [input, cmdHistory, historyIdx, cwd, executeCommand],
  )

  const COMPLETABLE_CMDS = ['help', 'whoami', 'about', 'skills', 'projects', 'experience', 'articles', 'contact', 'clear', 'gui', 'neofetch', 'ls', 'cat', 'cd', 'pwd']

  const quickCmds = ['ls', 'cat about.txt', 'cd projects', 'cd articles', 'whoami', 'help', 'cd ..']

  return (
    <div className={`flex min-h-screen items-center justify-center transition-all duration-300 ${maximized ? 'p-0' : 'p-2 sm:p-6'}`}>
      <div
        className={`flex w-full flex-col overflow-hidden bg-[#0d1117] transition-all duration-300 ${
          maximized
            ? 'h-screen max-w-none rounded-none border-0'
            : 'h-[95vh] max-w-4xl rounded-lg border border-slate-700/50 shadow-2xl shadow-black/50 sm:h-[85vh] sm:rounded-xl'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-700/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onSwitchToGui()
              }}
              className="group relative h-3 w-3 rounded-full bg-red-400/70 transition-colors hover:bg-red-400"
              title="Close — switch to visual mode"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold leading-none text-transparent group-hover:text-red-900">✕</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setMaximized(false)
              }}
              className="group relative h-3 w-3 rounded-full bg-amber-400/70 transition-colors hover:bg-amber-400"
              title="Minimize — windowed mode"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold leading-none text-transparent group-hover:text-amber-900">−</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setMaximized(true)
              }}
              className="group relative h-3 w-3 rounded-full bg-emerald-400/70 transition-colors hover:bg-emerald-400"
              title="Maximize — full screen"
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold leading-none text-transparent group-hover:text-emerald-900">+</span>
            </button>
            <span className="ml-3 font-mono text-xs text-slate-500">
              abhay@dev: {promptPath(cwd)}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSwitchToGui()
            }}
            className="rounded border border-slate-700/50 px-2.5 py-1 font-mono text-xs text-slate-500 transition-colors hover:border-slate-600 hover:text-slate-300"
          >
            gui mode
          </button>
        </div>

        {/* Terminal body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <div className="font-mono text-sm leading-relaxed">
            {lines.map((line) => (
              <div key={line.id} className={line.type === 'output' ? 'mb-4 mt-1' : ''}>
                {line.type === 'input' ? (
                  <p>
                    <Prompt cwd={line.cwd || []} />
                    <span className="text-slate-300">{line.content}</span>
                  </p>
                ) : (
                  line.content
                )}
              </div>
            ))}

            {/* Active input */}
            <div className="flex items-center">
              <Prompt cwd={cwd} />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-w-0 flex-1 bg-transparent text-slate-200 caret-cyan-400 outline-none"
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
          </div>
        </div>

        {/* Mobile quick commands */}
        <div className="shrink-0 border-t border-slate-700/40 px-3 py-2 sm:hidden">
          <div className="flex gap-1.5 overflow-x-auto">
            {quickCmds.map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation()
                  executeCommand(cmd)
                }}
                className="shrink-0 rounded border border-slate-700/50 px-2 py-1.5 font-mono text-xs text-slate-500 transition-colors active:border-cyan-500/40 active:text-cyan-400"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
