import Fraction from 'fraction.js'
import bounds from 'binary-search-bounds'

function gearSetAdd (gears, diff) {
  var newGears = []
  var addGear = ({ count, teeth }) => {
    var index = newGears.findIndex(gear => gear.teeth === teeth)
    if (index >= 0) newGears[index].count += count
    else newGears.push({ count: count, teeth: teeth })
  }
  gears.forEach(addGear)
  diff.forEach(addGear)
  return newGears.filter(({ count }) => count > 0)
}

function gearSetNegate (gears) {
  return gears.map(({ teeth, count }) => ({ teeth: teeth, count: -count }))
}

function gearSetRemove (gears, diff) {
  return gearSetAdd(gears, gearSetNegate(diff))
}

function *gearSetChoose (gears, num) {
  if (num === 2) {
    for (var gearSet of gearSetChoose2(gears)) yield gearSet
  } else if (num === 0) yield []
  else {
    while (gears.length > 0) {
      var count = gears[0].count

      var gear = { teeth: gears[0].teeth, count: 1 }
      gears = gearSetRemove(gears, [gear])
      for (var choice of gearSetChoose(gears, num - 1)) {
        yield gearSetAdd(choice, [gear])
      }
      gear.count = count - 1
      if (gear.count > 0) gears = gearSetRemove(gears, [gear])
    }
  }
}

function *gearSetChoose2 (gears) {
  for (var i = 0; i < gears.length; i++) {
    if (gears[i].count >= 2) yield [{ teeth: gears[i].teeth, count: 2 }]
    for (var j = i + 1; j < gears.length; j++) {
      yield [{ teeth: gears[i].teeth, count: 1 }, { teeth: gears[j].teeth, count: 1 }]
    }
  }
}

function *gearSetTeeth (gears) {
  for (var gear of gears) {
    for (var i = 0; i < gear.count; i++) yield gear.teeth
  }
}

const nortonLevers = [
  {name: 'A', ratio: new Fraction(1)},
  {name: 'B', ratio: new Fraction(2)},
  {name: 'C', ratio: new Fraction(4)},
  {name: 'D', ratio: new Fraction(8)}
]

const nortonSlide = [
  {name: '1', ratio: new Fraction(3.75)},
  {name: '2', ratio: new Fraction(3.5)},
  {name: '3', ratio: new Fraction(3.25)},
  {name: '4', ratio: new Fraction(3)},
  {name: '5', ratio: new Fraction(2.75)},
  {name: '6', ratio: new Fraction(2.5)},
  {name: '7', ratio: new Fraction(2.375)},
  {name: '8', ratio: new Fraction(2.25)},
  {name: '9', ratio: new Fraction(2)}
]

function *everyConfig (gears) {
  for (var upper of gearSetChoose(gears, 2)) {
    for (var lower of gearSetChoose(gearSetRemove(gears, upper), 2)) {
      for (var lever of nortonLevers) {
        for (var slide of nortonSlide) {
          yield {
            gears: {upper: upper, lower: lower},
            lever: lever,
            slide: slide
          }
        }
      }
    }
  }
}

function ratio ({gears: {upper, lower}, lever, slide}) {
  var res = lever.ratio.mul(slide.ratio)
  var tooth
  for (tooth of gearSetTeeth(upper)) res = res.mul(tooth)
  for (tooth of gearSetTeeth(lower)) res = res.div(tooth)
  return res
}

function precompute (lathe) {
  var ratios = []
  for (var config of everyConfig(lathe.gears)) {
    ratios.push({ ratio: ratio(config), config: config })
  }
  ratios.sort(({ ratio: a }, { ratio: b }) => a.compare(b))
  /*
  console.log(ratios.length)
  for (config of ratios) {
    var s = ratio(config) + ' upper: '
    for (var tooth of gearSetTeeth(config.gears.upper)) s += tooth + ' '
    s += ' lower: '
    for (tooth of gearSetTeeth(config.gears.lower)) s += tooth + ' '
    s += config.lever.name + ' ' + config.slide.name
    console.log(s)
  }
  */
  return Object.assign({}, lathe, { ratios: ratios.map(({ config }) => config) })
}

function lookup (lathe, desiredRatio) {
  if (lathe.ratios === undefined) lathe = precompute(lathe)
  if (lathe.ratios.length === 0) return []
  var rs = lathe.ratios
  var target = Fraction(desiredRatio).div(lathe.leadscrew)
  var cmp = (a, b) => ratio(a).compare(b)
  var high = ratio(rs[bounds.ge(rs, target, cmp)] || rs[rs.length - 1])
  var low = ratio(rs[bounds.le(rs, target, cmp)] || rs[0])
  if (target.sub(high).abs() < target.sub(low).abs()) low = high
  if (target.sub(low).abs() < target.sub(high).abs()) high = low
  return rs.slice(bounds.ge(rs, low, cmp), bounds.le(rs, high, cmp) + 1)
}

export { gearSetAdd, precompute, lookup, ratio, gearSetTeeth }
