export const WORK_CARD_STACK_PEEK_PX = 14
export const WORK_CARD_STACK_WIDTH_STEP_PCT = 2
const MIN_STACK_CARD_WIDTH_PCT = 88

export function getStackTop(stackIndex: number): number {
  return stackIndex * WORK_CARD_STACK_PEEK_PX
}

export function getStackLayerWidth(stackIndex: number, totalLayers: number): string {
  const layersFromFront = Math.max(0, totalLayers - 1 - stackIndex)
  const widthPct = Math.max(
    MIN_STACK_CARD_WIDTH_PCT,
    100 - layersFromFront * WORK_CARD_STACK_WIDTH_STEP_PCT
  )
  return `${widthPct}%`
}
