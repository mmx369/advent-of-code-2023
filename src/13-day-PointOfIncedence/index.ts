import fsPromises from 'node:fs/promises'
import path from 'node:path'

async function readTextFile(fileName: string): Promise<string> {
  const pathName = path.join(__dirname, 'input', fileName)
  const rawData = fsPromises.readFile(pathName, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error('Error while reading file!')
  })
  return rawData
}

function parseData(rawData: string): string[][] {
  const arrString = rawData.split('\r\n')
  return arrString.reduce(
    (acc: string[][], val: string) => {
      if (val === '') {
        acc.push([])
      } else {
        acc[acc.length - 1].push(val)
      }
      return acc
    },
    [[]]
  )
}

function isVerticalMirror(pattern: string[], index: number) {
  let rows = pattern.length
  let cols = pattern[0].length
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j <= Math.min(index, cols - index - 2); ++j) {
      let j1 = index - j
      let j2 = index + 1 + j
      if (pattern[i][j1] !== pattern[i][j2]) return false
    }
  }
  return true
}

function getVerticalMirrorIndex(pattern: string[]) {
  let cols = pattern[0].length
  for (let j = 0; j <= cols - 2; ++j) {
    if (isVerticalMirror(pattern, j)) return j + 1
  }
  return 0
}

function isHorizontalMirror(pattern: string[], index: number) {
  let rows = pattern.length
  let cols = pattern[0].length
  for (let j = 0; j < cols; ++j) {
    for (let i = 0; i <= Math.min(index, rows - index - 2); ++i) {
      let i1 = index - i
      let i2 = index + 1 + i
      if (pattern[i1][j] !== pattern[i2][j]) return false
    }
  }
  return true
}

function getHorizontalMirrorIndex(pattern: string[]) {
  let rows = pattern.length
  for (let i = 0; i <= rows - 2; ++i) {
    if (isHorizontalMirror(pattern, i)) return i + 1
  }
  return 0
}

function main(allPatterns: string[][]) {
  let res = 0
  let idx = 0

  for (let i = 0; i < allPatterns.length; i++) {
    let vert = getVerticalMirrorIndex(allPatterns[i])
    let hor = getHorizontalMirrorIndex(allPatterns[i])
    res += vert + 100 * hor
    idx++
  }
  return res
}

export async function dayThirteenTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 13`)
  const rawData = await readTextFile('01-input.txt')
  const parsedData = parseData(rawData)
  const result = main(parsedData)
  console.log(result)
}
