import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
    >
      <path
        d="M10 7.86555V0.42903C10 0.315244 9.9548 0.206119 9.87434 0.12566C9.79388 0.0452003 9.68476 0 9.57097 0H2.13445C2.02066 0 1.91154 0.0452003 1.83108 0.12566C1.75062 0.206119 1.70542 0.315244 1.70542 0.42903C1.70542 0.542816 1.75062 0.651941 1.83108 0.7324C1.91154 0.81286 2.02066 0.858061 2.13445 0.858061H8.53558L0.115147 9.27849C0.039363 9.35982 -0.00189424 9.46739 6.68414e-05 9.57854C0.00202792 9.68969 0.0470542 9.79573 0.12566 9.87434C0.204266 9.95295 0.310314 9.99797 0.421462 9.99993C0.53261 10.0019 0.64018 9.96064 0.721509 9.88485L9.14194 1.46442V7.86555C9.14194 7.97934 9.18714 8.08846 9.2676 8.16892C9.34806 8.24938 9.45718 8.29458 9.57097 8.29458C9.68476 8.29458 9.79388 8.24938 9.87434 8.16892C9.9548 8.08846 10 7.97934 10 7.86555Z"
        fill="currentColor"
      />
    </svg>
  )
}

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
    'group/link inline-flex items-center gap-2 font-body text-base tracking-[-0.01em] text-zinc-950 transition-opacity hover:opacity-60'

  const children = (
    <>
      {label}
      <ArrowIcon />
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
