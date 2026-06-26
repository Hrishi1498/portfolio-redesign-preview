/** Viewport-height scroll runway per card handoff. */
export const WORK_CARD_SEGMENT_HEIGHT = '100svh'

/** Scroll progress (0–1) where the outgoing card begins receding. */
export const WORK_CARD_EXIT_START = 0.2

/** Scroll progress where the outgoing card is fully gone. */
export const WORK_CARD_EXIT_END = 0.92

/** Scroll progress where the incoming card finishes settling in. */
export const WORK_CARD_ENTER_END = 0.14

export const WORK_CARD_EXIT_SCALE = 0.9
export const WORK_CARD_EXIT_BLUR_PX = 6
export const WORK_CARD_EXIT_LIFT_PX = -36

export const WORK_CARD_ENTER_SCALE = 1.02
export const WORK_CARD_ENTER_OFFSET_Y = 28
export const WORK_CARD_ENTER_OPACITY = 0.96

export function getWorkCardExitRange(): [number, number] {
  return [WORK_CARD_EXIT_START, WORK_CARD_EXIT_END]
}

/** Ease-out cubic — holds longer, then settles quickly. */
export function easeOutCubic(t: number): number {
  const clamped = Math.min(Math.max(t, 0), 1)
  return 1 - Math.pow(1 - clamped, 3)
}
