import { createContext, useContext, useEffect, useState } from 'react'
import { fetchMediumFeed, type MediumArticle } from '../lib/fetchMediumFeed'

interface ArticlesContextValue {
  articles: MediumArticle[] | null
  loading: boolean
  error: Error | null
  stale: boolean
}

const ArticlesContext = createContext<ArticlesContextValue | null>(null)
const TTL_MS = 5 * 60 * 1000
const STORAGE_KEY = 'medium_articles'

export function ArticlesProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<MediumArticle[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [stale, setStale] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadArticles() {
      let cachedData: { items: MediumArticle[]; fetchedAt: number } | null = null
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY)
        cachedData = raw ? JSON.parse(raw) : null
      } catch {
        cachedData = null
      }

      const isFresh = cachedData && Date.now() - cachedData.fetchedAt < TTL_MS

      if (isFresh) {
        if (!cancelled) {
          setArticles(cachedData!.items)
          setLoading(false)
        }
        return
      }

      try {
        const items = await fetchMediumFeed()
        if (cancelled) return

        setArticles(items)
        setStale(false)
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ items, fetchedAt: Date.now() }))
      } catch (err) {
        if (cancelled) return

        if (cachedData) {
          setArticles(cachedData.items)
          setStale(true)
        } else {
          setError(err as Error)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadArticles()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <ArticlesContext.Provider value={{ articles, loading, error, stale }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export function useArticles() {
  const ctx = useContext(ArticlesContext)
  if (!ctx) throw new Error('useArticles must be used within an ArticlesProvider')
  return ctx
}
