import Fraction from 'fraction.js'

const threads = {
  tpi: function (input) {
    var m = input.match(/^\s*(\d*(?:\d|\.\d*))\s*tpi\s*$/i)
    if (m) return new Fraction(m[1])
    return undefined
  },
  inches: function (input) {
    var m = input.match(/^\s*(\d*(?:\d|\.\d*))\s*(in(ch(es)?)?|")\s*$/i)
    if (m) return new Fraction(m[1]).inverse()
    return undefined
  },
  mm: function (input) {
    var m = input.match(/^\s*(\d*(?:\d|\.\d*))\s*mm\s*$/i)
    if (m) return new Fraction(m[1]).div(24.5).inverse()
    return undefined
  },
  ba: function (input) {
    const lookup = [
      { number: '16', tpi: new Fraction(133.3) },
      { number: '15', tpi: new Fraction(120.5) },
      { number: '14', tpi: new Fraction(109.9) },
      { number: '13', tpi: new Fraction(102) },
      { number: '12', tpi: new Fraction(90.9) },
      { number: '11', tpi: new Fraction(81.9) },
      { number: '10', tpi: new Fraction(72.6) },
      { number: '9', tpi: new Fraction(65.1) },
      { number: '8', tpi: new Fraction(59.1) },
      { number: '7', tpi: new Fraction(52.9) },
      { number: '6', tpi: new Fraction(47.9) },
      { number: '5', tpi: new Fraction(43) },
      { number: '4', tpi: new Fraction(38.5) },
      { number: '3', tpi: new Fraction(34.8) },
      { number: '2', tpi: new Fraction(31.4) },
      { number: '1', tpi: new Fraction(28.2) },
      { number: '0', tpi: new Fraction(25.4) }
    ]
    var m = input.match(/^\s*(\d+)\s*BA\s*$/i)
    if (m) {
      var t = lookup.find(({ number }) => number === m[1])
      if (t) return t.tpi
    }
    return undefined
  }
}

// Returns the thread in TPI or undefined
function parseThread (input) {
  for (var thread in threads) {
    if (!threads.hasOwnProperty(thread)) continue
    var p = threads[thread](input)
    if (p) return p
  }
  return undefined
}

export { parseThread }
