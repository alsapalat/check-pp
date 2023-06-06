import React from 'react'

type Props = {
  label: string,
  children: React.ReactNode
}

function Info({ label, children }: Props) {
  return (
    <div>
      <div className="mb-1 font-semibold">{label}</div>
      <div className="text-lg font-bold">{children}</div>
    </div>
  )
}

export default Info