import { getRandomIntInclusive } from './utils.js';
import tinycolor from 'tinycolor2';

function spectrum(seed) {
  let c1 = tinycolor(seed).spin(getRandomIntInclusive(-160, -130)).toHexString()
  let c2 = tinycolor(seed).spin(getRandomIntInclusive(-92, -52)).toHexString()
  let c3 = seed.toHexString()
  let c4 = tinycolor(seed).spin(getRandomIntInclusive(52, 92)).toHexString()
  let c5 = tinycolor(seed).spin(getRandomIntInclusive(130, 160)).toHexString()
  return [c1, c2, c3, c4, c5]
}

function desaturated(seed) {
  const desatFactor = (tinycolor(seed).toHsl().s / 2) * 100
  let isDark = tinycolor(seed).isDark()
  let bigRando = getRandomIntInclusive(10, 30)
  let c1 = isDark ? tinycolor(seed).desaturate(desatFactor).brighten(bigRando).toHexString() : tinycolor(seed).desaturate(desatFactor).darken(bigRando).toHexString()
  let c2 = tinycolor(seed).desaturate(desatFactor).spin(getRandomIntInclusive(100, 140)).toHexString()
  let c3 = tinycolor(seed).desaturate(desatFactor).toHexString()
  let c4 = tinycolor(seed).desaturate(desatFactor).spin(getRandomIntInclusive(10, 50)).lighten(bigRando).toHexString()
  let c5 = tinycolor(seed).desaturate(desatFactor).spin(getRandomIntInclusive(70, 110)).toHexString()
  return [c1, c2, c3, c4, c5]
}

function saturated(seed) {
  const satFactor = (tinycolor(seed).toHsl().s / 2) * 100
  let smallRando = getRandomIntInclusive(0, 20)
  let c1 = tinycolor(seed).spin(30).saturate(satFactor).lighten(smallRando).toHexString()
  let c2 = tinycolor(seed).spin(15).saturate(satFactor).darken(smallRando).toHexString()
  let c3 = tinycolor(seed).saturate(satFactor).toHexString()
  let c4 = tinycolor(seed).saturate(satFactor).spin(getRandomIntInclusive(50, 130)).toHexString()
  let c5 = tinycolor(seed).saturate(satFactor).spin(getRandomIntInclusive(90, 150)).toHexString()
  return [c1, c2, c3, c4, c5]
}

function triads(seed) {
  let smallRando = getRandomIntInclusive(5, 25)
  let c1 = tinycolor(seed).desaturate(smallRando).lighten(smallRando).toHexString()
  let c2 = tinycolor(seed).spin(getRandomIntInclusive(-150, -90)).toHexString()
  let c3 = seed.toHexString()
  let c4 = tinycolor(seed).spin(120).toHexString()
  let c5 = tinycolor(seed).spin(getRandomIntInclusive(90, 150)).saturate(smallRando).darken(smallRando).toHexString()
  return [c1, c2, c3, c4, c5]
}

function analogs(seed) {
  let smallRando = getRandomIntInclusive(0, 20)
  let c1 = tinycolor(seed).spin(getRandomIntInclusive(-30, -15)).toHexString()
  let c2 = tinycolor(seed).spin(getRandomIntInclusive(-15, 0)).saturate(smallRando).darken(smallRando).toHexString()
  let c3 = seed.toHexString()
  let c4 = tinycolor(seed).spin(getRandomIntInclusive(0, 15)).desaturate(smallRando).lighten(smallRando).toHexString()
  let c5 = tinycolor(seed).spin(getRandomIntInclusive(15, 30)).toHexString()
  return [c1, c2, c3, c4, c5]
}

function splitComplements(seed) {
  let smallRando = getRandomIntInclusive(0, 20)
  let c1 = tinycolor(seed).spin(getRandomIntInclusive(-180, -130)).saturate(smallRando).darken(smallRando).toHexString()
  let c2 = tinycolor(seed).spin(-150).toHexString()
  let c3 = seed.toHexString()
  let c4 = tinycolor(seed).spin(getRandomIntInclusive(-180, -130)).toHexString()
  let c5 = tinycolor(seed).spin(150).desaturate(smallRando).lighten(smallRando).toHexString()
  return [c1, c2, c3, c4, c5]
}

function monochrome(seed) {
  let isDark = tinycolor(seed).isDark()
  let smallRando = getRandomIntInclusive(0, 10)
  let biggerRando = getRandomIntInclusive(20, 40)
  let c1 = isDark ? tinycolor(seed).lighten(biggerRando).toHexString() : tinycolor(seed).darken(biggerRando).toHexString()
  let c2 = isDark ? tinycolor(seed).desaturate(getRandomIntInclusive(15, 40)).lighten(smallRando).toHexString() :
    tinycolor(seed).desaturate(getRandomIntInclusive(15, 40)).darken(smallRando).toHexString()
  let c3 = seed.toHexString()
  let c4 = isDark ? tinycolor(seed).saturate(getRandomIntInclusive(15, 40)).lighten(smallRando).toHexString() :
    tinycolor(seed).saturate(getRandomIntInclusive(15, 40)).darken(smallRando).toHexString()
  let c5 = isDark ? tinycolor(seed).lighten(biggerRando).toHexString() :
    tinycolor(seed).darken(biggerRando).toHexString()
  return [c1, c2, c3, c4, c5]
}

function shades(seed) {
  let closest = getRandomIntInclusive(5, 25)
  let farthest = getRandomIntInclusive(20, 40)
  let c1 = tinycolor(seed).lighten(farthest).toHexString()
  let c2 = tinycolor(seed).lighten(closest).toHexString()
  let c3 = seed.toHexString()
  let c4 = tinycolor(seed).darken(closest).toHexString()
  let c5 = tinycolor(seed).darken(farthest).toHexString()
  return [c1, c2, c3, c4, c5]
}

function complements(seed) {
  let isDark = tinycolor(seed).isDark()
  let c1 = tinycolor(seed).saturate(getRandomIntInclusive(5, 15)).darken(getRandomIntInclusive(10, 20)).toHexString()
  let c2 = tinycolor(seed).desaturate(getRandomIntInclusive(0, 20)).lighten(getRandomIntInclusive(5, 25)).toHexString()
  let c3 = seed.toHexString()
  let c4 = tinycolor(seed).spin(180).toHexString()
  let c5 = isDark ? tinycolor(seed).spin(getRandomIntInclusive(160, 200)).desaturate(getRandomIntInclusive(5, 15)).lighten(getRandomIntInclusive(10, 20)).toHexString() :
    tinycolor(seed).spin(getRandomIntInclusive(160, 200)).saturate(getRandomIntInclusive(0, 20)).darken(getRandomIntInclusive(10, 20)).toHexString()
  return [c1, c2, c3, c4, c5]
}

export default [spectrum, desaturated, saturated, triads, analogs, splitComplements, monochrome, shades, complements];

export { spectrum, desaturated, saturated, triads, analogs, splitComplements, monochrome, shades, complements };
