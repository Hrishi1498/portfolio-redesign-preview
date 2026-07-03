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
    'inline-flex w-fit items-center justify-center rounded-full bg-zinc-950 px-8 py-3.5 font-heading text-[0.9375rem] font-medium tracking-[-0.01em] text-white shadow-[0_10px_28px_-14px_rgba(9,9,11,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950'

  const children = <span>{label}</span>

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
