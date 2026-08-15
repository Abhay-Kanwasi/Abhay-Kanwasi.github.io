const MEDIUM_USERNAME = 'abhaykanwasi'
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export interface MediumArticle {
  id: string
  slug: string
  title: string
  description: string
  content: string
  pubDate: string
  link: string
  thumbnail: string
  guid: string
}

export async function fetchMediumFeed(): Promise<MediumArticle[]> {
  const res = await fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(FEED_URL),
  )
  const data = await res.json()
  if (data.status !== 'ok') {
    throw new Error('Failed to fetch Medium feed')
  }

  const seenSlugs = new Set<string>()
  return data.items.map((item: MediumArticle & { guid: string }) => {
    let slug = slugify(item.title)
    if (seenSlugs.has(slug)) {
      slug = `${slug}-${item.guid.slice(-6)}`
    }
    seenSlugs.add(slug)

    return {
      ...item,
      id: item.guid,
      slug,
    }
  })
}
