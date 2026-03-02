import { useState, lazy, Suspense } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { articles, profile } from '../data/content'
import SectionReveal from './SectionReveal'

const articleComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'exception-handling-python': lazy(() => import('./articles/ExceptionHandlingArticle')),
  'google-auth-jwt-django-react': lazy(() => import('./articles/GoogleAuthArticle')),
  'deploying-django-rocky-linux': lazy(() => import('./articles/DeployingDjangoArticle')),
  'configurable-storage-django': lazy(() => import('./articles/ConfigurableStorageArticle')),
}

export default function Articles() {
  const [activeArticle, setActiveArticle] = useState<string | null>(null)
  const ActiveComponent = activeArticle ? articleComponents[activeArticle] : null

  return (
    <section id="articles" className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          {activeArticle && ActiveComponent ? (
            <motion.div
              key="article-content"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="mb-8 inline-flex items-center gap-2 rounded px-3 py-2 font-mono text-sm text-slate-500 transition-colors duration-200 hover:bg-slate-800/70 hover:text-slate-200"
              >
                <ArrowLeft size={14} />
                cd ../articles
              </button>
              <Suspense
                fallback={
                  <div className="py-20 text-center font-mono text-sm text-slate-500">
                    loading...
                  </div>
                }
              >
                <ActiveComponent />
              </Suspense>
            </motion.div>
          ) : (
            <motion.div
              key="article-list"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              <SectionReveal>
                <p className="mb-4 font-mono text-sm text-slate-500">
                  <span className="text-emerald-400">$</span> cat articles.md
                </p>
                <p className="mb-14 font-mono text-sm text-slate-600">
                  <span className="text-slate-500"># </span>
                  I write about stuff I learn
                </p>
              </SectionReveal>

              <div className="space-y-3">
                {articles.map((article, i) => (
                  <SectionReveal key={article.id} delay={i * 0.08}>
                    <button
                      onClick={() => setActiveArticle(article.id)}
                      className="group w-full rounded-lg border border-slate-700/50 bg-slate-800/30 p-5 text-left font-mono text-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs text-slate-600">{article.date}</p>
                          <h3 className="mt-1 text-sm font-semibold text-slate-200 transition-colors group-hover:text-cyan-400">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-slate-400">{article.description}</p>
                          <p className="mt-3 text-xs text-slate-500 transition-colors group-hover:text-cyan-400">
                            {'>>> '}read_article()
                          </p>
                        </div>
                      </div>
                    </button>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={articles.length * 0.08 + 0.1}>
                <div className="mt-8">
                  <a
                    href={profile.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded border border-slate-700 px-4 py-2 font-mono text-sm text-slate-400 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/50 hover:text-slate-200"
                  >
                    <ExternalLink size={14} />
                    medium.open()
                  </a>
                </div>
              </SectionReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
