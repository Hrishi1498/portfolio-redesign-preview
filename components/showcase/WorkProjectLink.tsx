import Link from 'next/link'

export function WorkProjectLink({
  href,
  label,
  onNavigate,
}: {
  href: string
  label: string
  onNavigate?: () => void
}) {
  const className =
    'inline-flex w-fit items-center justify-center gap-2 rounded-full bg-zinc-950 px-7 py-3 font-heading text-sm font-medium tracking-[-0.01em] text-white shadow-[0_10px_28px_-14px_rgba(9,9,11,0.45)] transition-colors hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950'

  const children = (
    <>
      <span>{label}</span>
      <span aria-hidden className="text-[0.85em] leading-none">
        →
      </span>
    </>
  )

  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  )
}
