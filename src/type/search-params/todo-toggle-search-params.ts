import { createSearchParamsCache, parseAsBoolean } from 'nuqs/server'

export const todoToggleSearchParamsCache = createSearchParamsCache({
  toggle: parseAsBoolean.withDefault(false),
})
