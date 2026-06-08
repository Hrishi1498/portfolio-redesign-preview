/** Homepage URL that opens the portfolio section (not the hero). */
export const PORTFOLIO_HOME_HREF = '/?view=portfolio'

export function applyHomeScrollLock() {
  const html = document.documentElement
  const body = document.body

  html.style.overflow = 'hidden'
  html.style.overscrollBehavior = 'none'
  body.style.overflow = 'hidden'
  body.style.height = '100vh'
  body.style.position = 'fixed'
  body.style.width = '100%'
  body.style.top = '0'
}

export function releaseHomeScrollLock() {
  const html = document.documentElement
  const body = document.body

  html.style.overflow = ''
  html.style.overscrollBehavior = ''
  body.style.overflow = ''
  body.style.height = ''
  body.style.position = ''
  body.style.width = ''
  body.style.top = ''
}
