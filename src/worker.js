/* eslint-env worker */
import { precompute, lookup, ratio } from './lathe'

var lathe = null

onmessage = function ({ data: message }) {
  console.log('Worker received', message)
  if (message.type === 'PRECOMPUTE') {
    lathe = precompute(message.lathe)
    postMessage({ type: 'DONE' })
  } else if (message.type === 'LOOKUP') {
    var results = lookup(lathe, message.thread)
    var error
    if (results.length > 0) {
      var abserr = ratio(results[0]).mul(lathe.leadscrew).sub(message.thread)
      error = abserr.div(message.thread).mul(100).round([2]) + '%'
    }
    postMessage({
      type: 'RESULTS',
      results: lookup(lathe, message.thread),
      error: error
    })
  }
}
