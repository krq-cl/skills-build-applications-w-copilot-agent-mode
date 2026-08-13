const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function extractCollection(payload, collectionName) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [
    payload?.[collectionName],
    payload?.results,
    payload?.items,
    payload?.data,
    payload?.data?.[collectionName],
    payload?.data?.results,
    payload?.data?.items,
  ]

  return candidates.find(Array.isArray) ?? []
}

export async function fetchCollection(collectionName) {
  const response = await fetch(`${apiBaseUrl}/api/${collectionName}/`)

  if (!response.ok) {
    throw new Error(`Unable to load ${collectionName}`)
  }

  return extractCollection(await response.json(), collectionName)
}