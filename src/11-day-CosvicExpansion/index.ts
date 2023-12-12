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

function parseData(rawData: string) {
  const arrString = rawData.split('\r\n').map((el) => el.split(''))
  const newArray: number[][] = []
  for (let i = 0; i < arrString.length; i++) {
    const tempArr = arrString[i].map((el) => (el === '.' ? 0 : 1))
    newArray.push(tempArr)
  }
  return newArray
}

function expansion(array: number[][]): number[][] {
  function addRows(): void {
    for (let i = 0; i < array.length; i++) {
      if (array[i].every((val) => val === 0)) {
        const newRow = new Array(array[i].length).fill(0)
        array.splice(i + 1, 0, newRow)
        i++
      }
    }
  }
  function addColumns(): void {
    let columnLength = array.length
    let rowLength = array[0].length

    for (let j = 0; j < rowLength; j++) {
      let isZeroColumn = true

      for (let i = 0; i < columnLength; i++) {
        if (array[i][j] !== 0) {
          isZeroColumn = false
          break
        }
      }

      if (isZeroColumn) {
        for (let i = 0; i < columnLength; i++) {
          array[i].splice(j + 1, 0, 0)
        }
        rowLength++
        j++
      }
    }
  }
  addRows()
  addColumns()
  return array
}

function replaceOnesWithSequence(array: number[][]): number[][] {
  let counter = 1
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] === 1) {
        array[i][j] = counter
        counter++
      }
    }
  }
  return array
}

function findCoords(array: number[][]) {
  const coordsArr: number[][] = []
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] > 0) {
        coordsArr.push([array[i][j], i, j])
      }
    }
  }
  return coordsArr
}

function findPathsBetweenCoords(coords: number[][]) {
  const shortestPaths = []
  for (let i = 0; i < coords.length; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const res = Math.abs(coords[i][1] - coords[j][1])
      const res2 = Math.abs(coords[i][2] - coords[j][2])
      shortestPaths.push(res + res2)
    }
  }
  // console.log(shortestPaths)
  console.log(shortestPaths.reduce((acc, cur) => acc + cur, 0))
}

export async function dayElevenTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 11`)
  const rawData = await readTextFile('01-input.txt')
  const maze = parseData(rawData)
  const expandArray = expansion(maze)
  const arrayWithSequence = replaceOnesWithSequence(expandArray)
  // console.log(arrayWithSequence)
  const coordsArr = findCoords(arrayWithSequence)
  findPathsBetweenCoords(coordsArr)
  // console.log(coordsArr)
}
