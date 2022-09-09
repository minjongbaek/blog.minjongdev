import { ExtendedRecordMap } from 'notion-types'
import { uuidToId, getBlockTitle } from 'notion-utils'

export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
): string | null {
  if (!pageId || !recordMap) return null

  const id = uuidToId(pageId)
  const block = recordMap.block[pageId]?.value

  if (block) {
    const title = normalizeTitle(getBlockTitle(block, recordMap))

    if (title) {
      if (uuid) {
        return `${title}-${id}`
      } else {
        return title
      }
    }
  }

  return id
}

export const normalizeTitle = (title: string | null): string => {
  return (
    (title || '')
      .replace(/ /g, '-')
      .replace(/--/g, '-')
      .replace(/-$/, '')
      .replace(/^-/, '')
      .trim()
  )
}
