import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { experiences, projectGroups } from '../data/content'
import SectionReveal from './SectionReveal'

const allProjects = projectGroups.flatMap((g) => g.projects)

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = experiences[activeIndex]
  const relatedProjects = allProjects.filter((p) => p.company === active.company)

  return (
    <section id="experience" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <p className="mb-4 font-mono text-sm text-slate-500">
            <span className="text-emerald-400">$</span> cat experience.log
          </p>
          <p className="mb-14 font-mono text-sm text-slate-600">
            <span className="text-slate-500"># </span>
            runtime logs from production
          </p>
        </SectionReveal>

        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          {/* Left panel — experience list */}
          <div className="grid gap-2 font-mono text-sm sm:grid-cols-2 md:w-56 md:min-w-[14rem] md:flex md:max-w-[14rem] md:flex-col md:shrink-0">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-lg border px-4 py-3 text-left transition-all duration-200 ${
                  activeIndex === i
                    ? 'border-cyan-500/40 bg-slate-800/60 text-slate-200'
                    : 'border-slate-700/40 bg-slate-800/20 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                }`}
              >
                <p className={`text-[10px] ${activeIndex === i ? 'text-cyan-400' : 'text-slate-600'}`}>
                  [{exp.timestamp}]
                </p>
                <p className="mt-0.5 truncate text-sm sm:text-xs md:text-sm">{exp.company}</p>
                <p className="truncate text-[10px] text-slate-600 md:text-xs">
                  {exp.role.replace('Sr. ', '').replace(' Engineer', ' Eng.')}
                </p>
              </button>
            ))}
          </div>

          {/* Right panel — details + projects */}
          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Experience card */}
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-5 font-mono text-sm">
                  <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
                    <span className="text-slate-600">[{active.timestamp}]</span>
                    <span className="text-emerald-400">{active.level}</span>
                    <span className="text-slate-200">{active.role}</span>
                    <span className="text-slate-600">@</span>
                    <a
                      href={active.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
                    >
                      {active.company}
                    </a>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-600">
                    <span>{active.period}</span>
                    <span>{active.location}</span>
                  </div>
                  <div className="mt-4 space-y-1.5 border-l-2 border-cyan-500/20 pl-4 text-slate-400">
                    {active.description.split('. ').filter(Boolean).map((line, j) => (
                      <p key={j} className="leading-relaxed">
                        <span className="select-none text-slate-600">├── </span>
                        {line.endsWith('.') ? line : `${line}.`}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {active.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-slate-700/50 bg-[#0b0f19]/80 px-2 py-0.5 text-xs text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related projects */}
                {relatedProjects.length > 0 && (
                  <div>
                    <p className="mb-3 font-mono text-xs text-slate-500">
                      <span className="text-emerald-400">~/</span>related_projects
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {relatedProjects.map((project) => (
                        <motion.div
                          key={project.className}
                          whileHover={{ y: -2 }}
                          transition={{ duration: 0.2 }}
                          className="group flex min-w-0 flex-col rounded-lg border border-slate-700/50 bg-slate-800/30 font-mono text-sm transition-all duration-300 hover:border-slate-600"
                        >
                          <div className="flex items-center gap-2 border-b border-slate-700/40 px-4 py-2.5">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                            <span className="ml-2 text-xs text-slate-500">
                              {project.className.toLowerCase()}.py
                            </span>
                          </div>
                          <div className="flex flex-1 flex-col p-4 sm:p-5">
                            <p className="min-w-0 break-all">
                              <span className="text-cyan-400">class</span>{' '}
                              <span className="text-amber-200">{project.className}</span>
                              <span className="text-slate-500">:</span>
                            </p>
                            <div className="mt-1.5 pl-3 sm:pl-6">
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
                            <div className="mt-auto pt-3 pl-3 sm:pl-6">
                              <span className="text-slate-300">stack</span>
                              <span className="text-slate-500"> = </span>
                              <span className="text-slate-500">[</span>
                              <span className="text-amber-300">
                                {project.stack.map((t) => `"${t}"`).join(', ')}
                              </span>
                              <span className="text-slate-500">]</span>
                            </div>
                            {(project.liveLink || project.sourceCode) && (
                              <div className="mt-4 flex flex-wrap gap-4 pl-3 sm:pl-6">
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
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
