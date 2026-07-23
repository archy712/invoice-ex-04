"use client"

import { useMediaQuery as useMediaQueryImpl } from "react-responsive"

/**
 * Tailwind's default breakpoints, mirrored here so components can match
 * the same responsive thresholds used in className utilities.
 */
export const breakpoints = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
} as const

export type Breakpoint = keyof typeof breakpoints

export function useMediaQuery(query: string) {
  return useMediaQueryImpl({ query })
}

export function useBreakpoint(breakpoint: Breakpoint) {
  return useMediaQueryImpl({ query: breakpoints[breakpoint] })
}
