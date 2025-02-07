import paletteFuncs from './paletteFuncs.js';
import tinycolor from 'tinycolor2';

function getColorStops(pal) {
  let stopFuncs = [getStripesWithTransparencyAllSharpTransitions, getStripesWithTransparencyOneSharpTransition, getStripesNoSharpTransitions]
  let stops = getRandomStops(getRandomIntInclusive(3, 15), Math.random()>.5, Math.random()>.5)
  let colorStops = pick(stopFuncs)(stops, pal)
  colorStops = colorStops.match(/.*?(?=, $|$)/)[0]
  return colorStops

  /*string generators*/
  function getStripesNoSharpTransitions(stops, pal) {
    let colorStops = ""
    for (let i = 0; i < stops.length; i++) {
      colorStops += `${pal[i%pal.length]}  ${stops[i]}%, `
    }
    return colorStops
  }
  function getStripesWithTransparencyOneSharpTransition(stops, pal) {
    let colorStops = ""
    for (let i = 0; i < stops.length - 2; i = i + 3) {
      colorStops += `${pal[i%pal.length]}  ${stops[i]}%, ${pal[i%pal.length]} ${stops[i+1]}%, transparent ${stops[i+1]+1}%, transparent ${stops[i+2]}%, `
    }
    return colorStops
  }
  function getStripesWithTransparencyAllSharpTransitions(stops, pal) {
    let colorStops = ""
    for (let i = 0; i < stops.length - 2; i = i + 2) {
      let color = pal[i % pal.length]
      if (i === 0) {
        colorStops += `${color} ${stops[i]}%, ${color} ${stops[i+1]}%, transparent ${stops[i+1]+1}%, transparent ${stops[i+2]}%, `
      } else {
        colorStops += `${color} ${stops[i]+1}%, ${color} ${stops[i+1]}%, transparent ${stops[i+1]+1}%, transparent ${stops[i+2]}%, `
      }
    }
    return colorStops
  }

}

function getRandomStops(num, startWithZero, endWith100) {
  let stops = []
  stops[0] = startWithZero ? 0 : getRandomIntInclusive(1, 40)
  for (let i = 1; i < num; i++) {
    let next = getRandomIntInclusive(stops[i - 1], stops[i - 1] + 40)
    if (next >= 100) {
      stops[i] = 100
      break
    } else {
      stops[i] = next
    }
  }
  if(endWith100) stops[stops.length - 1] = 100
  return stops
}

function getPalette(seed, palette) {
  if (!palette) palette = pick(paletteFuncs)
  if (!seed) seed = getRandomColor()
  return palette(seed)
}

function bigPalette(multiplier, seed = getRandomColor(), palFunc = pick(paletteFuncs), rotation = getRandomIntInclusive(2, 180)) {
  let bigPalette = []
  let rotateRandomly = !rotation && Math.random() > .5
  for (let i = 1; i <= multiplier; i++) {
    if (rotateRandomly) {
      rotation = getRandomIntInclusive(2, 180)
    } else {
      rotation += rotation
    }
    bigPalette.push(...getPalette(seed.clone().spin(rotation), palFunc))
  }
  return bigPalette
}

function getRandomColor() {
  /*tinycolor's randoms are too dark sometimes*/
  let hue = Math.floor(Math.random() * 360)
  let saturation = Math.floor(Math.random() * (100 - 30) + 30)
  return tinycolor(`hsl(${hue}, ${saturation}, 50%)`)
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomSlice(arr, num) {
  num = num || getRandomIntInclusive(1, arr.length)
  let start = getRandomIntInclusive(0, arr.length - 1)
  while (start + num > arr.length) {
    start--
  }
  return arr.slice(start, start + num)
}

function randomPicks(arr, num) {
  num = num || getRandomIntInclusive(1, arr.length)
  let picks = []
  for (let i = 0; i < num; i++) {
    picks.push(pick(arr))
  }
  return picks
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function flatten(set) {
  let flat = []
  let ranges = set.ranges || [{
    min: set.min,
    max: set.max
  }]
  ranges.forEach(range => {
    for (let i = range.min; i <= range.max; i++) {
      flat.push(i)
    }
  })
  return flat
}

export { getColorStops, getPalette, getRandomColor, getRandomIntInclusive, getRandomStops, randomPicks, randomSlice, flatten, bigPalette, pick };
