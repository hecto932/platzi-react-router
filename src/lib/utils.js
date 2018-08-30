'use strict'

function leftPad(number) {
  const pad = '00'
  return pad.substr(0, pad.length - number.length) + number
}

module.exports = {
  formattedTime (secs) {
    const minutes = parseInt(secs/60, 10)
    const seconds = parseInt(secs%60, 10)
    return `${minutes}:${leftPad(seconds.toString())}`
  }
}
