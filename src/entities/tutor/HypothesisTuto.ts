export type HypothesisTuto = {
  id: number
  symptoms: string[]
  hypothesis: { key: string; val: boolean }[]
  reason: string
  threshold: number
}
