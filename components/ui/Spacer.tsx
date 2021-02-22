import React from 'react'

const Spacer = ({
  height = 10,
  title = '',
}: {
  height?: number
  title?: string
}) => <tr title={title} className={`height-${height}`} />

export default Spacer
