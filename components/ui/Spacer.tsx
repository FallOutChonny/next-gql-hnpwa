import React from 'react'

const Spacer = ({
  height = 10,
  title = '',
}: {
  height?: number
  title?: string
}) => <tr title={title} className={`h-${height}`} />

export default Spacer
