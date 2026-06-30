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
    'group/link relative inline-flex w-fit items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-8 py-3.5 font-heading text-[0.9375rem] font-medium tracking-[-0.01em] text-white shadow-[0_10px_28px_-14px_rgba(9,9,11,0.45)] transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-800 hover:shadow-[0_14px_36px_-12px_rgba(9,9,11,0.5)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950'

  const children = (
    <>
      <span className="relative z-10">{label}</span>
      <div
        aria-hidden
        className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/link:translate-x-[200%]"
      />
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
