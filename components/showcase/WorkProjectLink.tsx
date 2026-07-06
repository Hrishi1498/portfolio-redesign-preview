import Link from 'next/link'

export function WorkProjectLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  const className =
    'inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-heading text-sm font-medium tracking-[-0.01em] text-zinc-950 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.35)] transition-colors hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

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
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
