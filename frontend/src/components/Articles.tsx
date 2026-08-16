import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { articles as hardcodedArticles, profile } from '../data/content'
import SectionReveal from './SectionReveal'
import { useArticles } from '../context/ArticlesContext'
import DOMPurify from 'dompurify'

const articleComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'exception-handling-python': lazy(() => import('./articles/ExceptionHandlingArticle')),
  'google-auth-jwt-django-react': lazy(() => import('./articles/GoogleAuthArticle')),
  'deploying-django-rocky-linux': lazy(() => import('./articles/DeployingDjangoArticle')),
  'configurable-storage-django': lazy(() => import('./articles/ConfigurableStorageArticle')),
}

function getSlugFromUrl(): string | null {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get('article')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function Articles() {
  const { articles, loading, error, stale } = useArticles()
  const [selectedSlug, setSelectedSlug] = useState<string | null>(getSlugFromUrl)

  // When RSS fails with no cache, fall back to the hardcoded list
  const isFallback = !loading && !!error && !articles
  const displayArticles = isFallback
    ? hardcodedArticles.map((a) => ({ ...a, slug: a.id, pubDate: a.date, description: a.description, content: '' }))
    : articles

  useEffect(() => {
    function onPopState() {
      setSelectedSlug(getSlugFromUrl())
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function openArticle(slug: string) {
    const url = new URL(window.location.href)
    url.searchParams.set('article', slug)
    window.history.pushState({}, '', url)
    setSelectedSlug(slug)
  }

  function closeArticle() {
    const url = new URL(window.location.href)
    url.searchParams.delete('article')
    window.history.pushState({}, '', url)
    setSelectedSlug(null)
  }

  if (selectedSlug) {
    if (loading) {
      return (
        <section id="articles" className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-sm text-slate-500">loading...</p>
          </div>
        </section>
      )
    }

    // Hardcoded TSX component takes priority if it exists for this slug
    const HardcodedComponent = articleComponents[selectedSlug]
    if (HardcodedComponent) {
      return (
        <section id="articles" className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <button
              onClick={closeArticle}
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
              <HardcodedComponent />
            </Suspense>
          </div>
        </section>
      )
    }

    // Live RSS article
    const selectedArticle = articles?.find((a) => a.slug === selectedSlug)

    if (!selectedArticle) {
      return (
        <section id="articles" className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-sm text-slate-400">
              This article is no longer in the latest feed.
            </p>
            <button
              onClick={closeArticle}
              className="inline-flex items-center gap-2 rounded px-3 py-2 font-mono text-sm text-slate-500 transition-colors duration-200 hover:bg-slate-800/70 hover:text-slate-200"
            >
              <ArrowLeft size={14} />
              cd ../articles
            </button>
          </div>
        </section>
      )
    }

    const pubDate = selectedArticle.pubDate
      ? new Date(selectedArticle.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : ''

    return (
      <section id="articles" className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={closeArticle}
            className="mb-8 inline-flex items-center gap-2 rounded px-3 py-2 font-mono text-sm text-slate-500 transition-colors duration-200 hover:bg-slate-800/70 hover:text-slate-200"
          >
            <ArrowLeft size={14} />
            cd ../articles
          </button>
          <article className="mx-auto max-w-3xl">
            <p className="mb-3 font-mono text-sm text-slate-600">{pubDate}</p>
            <h1 className="mb-6 text-xl font-bold tracking-tight text-slate-100 sm:text-2xl md:text-3xl">
              {selectedArticle.title}
            </h1>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-500/10 font-mono text-xs font-bold text-cyan-400">
                AK
              </div>
              <div>
                <p className="text-sm font-medium text-slate-200">Abhay Kanwasi</p>
                <a
                  href="https://medium.com/@abhaykanwasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-slate-500 transition-colors hover:text-cyan-400"
                >
                  @abhay-kanwasi
                </a>
              </div>
            </div>
            <div
              className="medium-article"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedArticle.content) }}
            />
          </article>
        </div>
      </section>
    )
  }

  return (
    <section id="articles" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
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

            {loading && (
              <p className="font-mono text-sm text-slate-500">loading...</p>
            )}
            {isFallback && (
              <p className="mb-4 font-mono text-xs text-slate-600">
                (showing cached articles — feed unavailable)
              </p>
            )}
            {stale && (
              <p className="mb-4 font-mono text-xs text-slate-600">
                (showing cached articles — feed unavailable)
              </p>
            )}

            <div className="space-y-3">
              {displayArticles?.map((article, i) => (
                <SectionReveal key={article.id} delay={i * 0.08}>
                  <button
                    onClick={() => openArticle(article.slug)}
                    className="group w-full rounded-lg border border-slate-700/50 bg-slate-800/30 p-5 text-left font-mono text-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-600">{article.pubDate?.slice(0, 10)}</p>
                        <h3 className="mt-1 text-sm font-semibold text-slate-200 transition-colors group-hover:text-cyan-400">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-slate-400">{stripHtml(article.description).slice(0, 160)}</p>
                        <p className="mt-3 text-xs text-slate-500 transition-colors group-hover:text-cyan-400">
                          {'>>> '}read_article()
                        </p>
                      </div>
                    </div>
                  </button>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal delay={(displayArticles?.length ?? 0) * 0.08 + 0.1}>
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
        </AnimatePresence>
      </div>
    </section>
  )
}
