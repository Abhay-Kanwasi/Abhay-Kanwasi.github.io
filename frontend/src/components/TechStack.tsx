import { techStack } from '../data/content'
import SectionReveal from './SectionReveal'

export default function TechStack() {
  return (
    <section id="tech-stack" className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <p className="mb-4 font-mono text-sm text-slate-500">
            <span className="text-emerald-400">$</span> tech_stack --list
          </p>
          <p className="mb-12 font-mono text-sm text-slate-600">
            <span className="text-slate-500"># </span>
            technical proficiency
          </p>
        </SectionReveal>

        <div className="space-y-5">
          {techStack.map((group, i) => (
            <SectionReveal key={group.category} delay={i * 0.08}>
              <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-4 font-mono text-sm transition-all duration-300 hover:border-slate-600">
                <span className="mb-3 block text-slate-500">
                  {group.category}<span className="text-slate-600">:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-slate-700/60 bg-[#0b0f19]/80 px-3 py-1.5 text-slate-300 transition-colors duration-200 hover:border-cyan-500/40 hover:text-cyan-300"
                    >
                      {item}
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
