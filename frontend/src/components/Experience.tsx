import { experiences } from '../data/content'
import SectionReveal from './SectionReveal'

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <p className="mb-4 font-mono text-sm text-slate-500">
            <span className="text-emerald-400">$</span> cat experience.log
          </p>
          <p className="mb-14 font-mono text-sm text-slate-600">
            <span className="text-slate-500"># </span>
            runtime logs from production
          </p>
        </SectionReveal>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-5 font-mono text-sm transition-all duration-300 hover:border-slate-600">
                {/* Log header */}
                <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
                  <span className="text-slate-600">[{exp.timestamp}]</span>
                  <span className="text-emerald-400">{exp.level}</span>
                  <span className="text-slate-200">{exp.role}</span>
                  <span className="text-slate-600">@</span>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
                  >
                    {exp.company}
                  </a>
                </div>

                {/* Period and location */}
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-600">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                </div>

                {/* Description as log lines */}
                <div className="mt-4 space-y-1.5 border-l-2 border-cyan-500/20 pl-4 text-slate-400">
                  {exp.description.split('. ').filter(Boolean).map((line, j) => (
                    <p key={j} className="leading-relaxed">
                      <span className="text-slate-600 select-none">├── </span>
                      {line.endsWith('.') ? line : `${line}.`}
                    </p>
                  ))}
                </div>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-slate-700/50 bg-[#0b0f19]/80 px-2 py-0.5 text-xs text-slate-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
