export function timeSince(date: number) {
  let minute = 60
  let hour = minute * 60
  let day = hour * 24
  let month = day * 30
  let year = day * 365

  let suffix = ' ago'

  let elapsed = Math.floor((Date.now() - date * 1000) / 1000)

  if (elapsed < minute) {
    return 'just now'
  }

  // get an array in the form of [number, string]
  let a = (elapsed < hour && [Math.floor(elapsed / minute), 'minute']) ||
    (elapsed < day && [Math.floor(elapsed / hour), 'hour']) ||
    (elapsed < month && [Math.floor(elapsed / day), 'day']) ||
    (elapsed < year && [Math.floor(elapsed / month), 'month']) || [
      Math.floor(elapsed / year),
      'year',
    ]

  // pluralise and append suffix
  return a[0] + ' ' + a[1] + (a[0] === 1 ? '' : 's') + suffix
}

export function getHostname(url: string) {
  return new URL(url).host
}

export function getEnDate(date: Date | number) {
  let d = typeof date === 'number' ? new Date(date * 1000) : date

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  return `${
    {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    }[month]
  } ${day}, ${year}`
}

export function formatDate(date: Date | number, sep: string = '-') {
  let d = typeof date === 'number' ? new Date(date * 1000) : date

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  return [
    year,
    month < 10 ? `0${month}` : month,
    day < 10 ? `0${day}` : day,
  ].join(sep)
}
