import { motion } from 'framer-motion'
import { projects } from '../data/content'
import SectionReveal from './SectionReveal'

const personalProjectGroups = [{
  group: 'Personal Projects',
  projects,
}]

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionReveal>
          <p className="mb-4 font-mono text-sm text-slate-500">
            <span className="text-emerald-400">$</span> ls ./projects
          </p>
          <p className="mb-14 font-mono text-sm text-slate-600">
            <span className="text-slate-500"># </span>
            system, I've designed shipped and work on
          </p>
        </SectionReveal>

        {personalProjectGroups.map((group) => (
          <div key={group.group} className="mb-14">
            <SectionReveal>
              <p className="mb-6 font-mono text-xs text-slate-500">
                <span className="text-emerald-400">~/</span>{group.group.toLowerCase().replace(' ', '_')}
              </p>
            </SectionReveal>
            <div className="grid gap-5 md:grid-cols-2">
          {group.projects.map((project, i) => (
            <SectionReveal key={project.className} delay={i * 0.08} className="h-full">
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group flex h-full flex-col rounded-lg border border-slate-700/50 bg-slate-800/30 font-mono text-sm transition-all duration-300 hover:border-slate-600"
              >
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-slate-700/40 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 text-xs text-slate-500">
                    {project.className.toLowerCase()}.py
                  </span>
                </div>

                {/* Code body */}
                <div className="flex flex-1 flex-col p-5">
                  <p>
                    <span className="text-cyan-400">class</span>{' '}
                    <span className="text-amber-200">{project.className}</span>
                    <span className="text-slate-500">:</span>
                  </p>

                  <div className="mt-1.5 pl-6">
                    <p className="text-emerald-400/80">"""</p>
                    <ul className="list-none space-y-1.5">
                      {project.bullets.map((bullet, j) => (
                        <li key={j} className="flex gap-2 leading-relaxed text-emerald-400/80">
                          <span className="mt-1 shrink-0 text-emerald-500">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-emerald-400/80">"""</p>
                  </div>

                  <div className="mt-auto pt-3 pl-6">
                    <span className="text-slate-300">stack</span>
                    <span className="text-slate-500"> = </span>
                    <span className="text-slate-500">[</span>
                    <span className="text-amber-300">
                      {project.stack.map((t) => `"${t}"`).join(', ')}
                    </span>
                    <span className="text-slate-500">]</span>
                  </div>

                  {(project.liveLink || project.sourceCode) && (
                    <div className="mt-4 flex gap-4 pl-6">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 transition-colors duration-200 hover:text-cyan-400"
                        >
                          <span className="text-cyan-400/70">def</span>{' '}
                          <span className="transition-colors duration-200 group-hover:text-amber-200">demo</span>
                          <span>(self): ...</span>
                        </a>
                      )}
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 transition-colors duration-200 hover:text-cyan-400"
                        >
                          <span className="text-cyan-400/70">def</span>{' '}
                          <span className="transition-colors duration-200 group-hover:text-amber-200">source</span>
                          <span>(self): ...</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
