import fsPromises from 'node:fs/promises'

async function readTextFile(path: string): Promise<string> {
  const rawData = fsPromises.readFile(path, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error(err)
  })
  return rawData
}

function removeNonLetters(str: string): string {
  return str.replace(/[^A-Za-z]/g, '')
}

function removeBrackets(str: string): string {
  return str.replace(/[()]/g, '')
}

function parseData(rawData: string): Record<string, string[]> {
  const data1 = rawData.split('\r\n') as string[]
  const pathInstruction = data1.shift()?.split('')
  const pathMap = {}
  pathMap['way'] = pathInstruction
  data1.shift()
  for (let i = 0; i < data1.length; i++) {
    const tempArr = data1[i].split('=')
    const objKey = tempArr[0].trim()
    const tempDir = tempArr[1].split(',')
    const newPath = [] as string[]
    for (let j = 0; j < tempDir.length; j++) {
      const cleanPath = removeNonLetters(tempDir[j])
      newPath.push(cleanPath)
    }
    pathMap[objKey] = newPath
  }
  return pathMap
}

function parseDataPartTwo(rawData: string) {
  const data1 = rawData.split('\r\n') as string[]
  console.log(data1)
  const pathInstruction = data1.shift()?.split('')
  console.log(pathInstruction)
  const pathMap = {}
  pathMap['way'] = pathInstruction
  data1.shift()
  console.log(data1)
  for (let i = 0; i < data1.length; i++) {
    const tempArr = data1[i].split('=')
    console.log(tempArr)
    const objKey = tempArr[0].trim()
    console.log(objKey)
    const tempDir = tempArr[1].split(',')
    console.log(tempDir)
    const newPath = [] as string[]
    for (let j = 0; j < tempDir.length; j++) {
      console.log(tempDir[j])
      //   const cleanPath = removeNonLetters(tempDir[j])
      //   newPath.push(cleanPath)
    }
    // pathMap[objKey] = newPath
  }
}

function findWay(
  parsedData: Record<string, string[]>,
  startPoint: string,
  endPoint: string
) {
  const { way } = parsedData
  console.log('My way: ', way)
  let initPoint = startPoint
  let stepCounter = 0

  let positionCounter = 0
  const wayLength = way.length - 1
  console.log('Way Length = ', wayLength)
  while (initPoint !== endPoint) {
    const currentPoint = parsedData[initPoint]
    console.log('Current point: ', currentPoint)
    if (way[positionCounter] === 'R') {
      initPoint = currentPoint[1]
    } else if (way[positionCounter] === 'L') {
      initPoint = currentPoint[0]
    }
    console.log(initPoint)
    // initPoint = 'ZZZ'
    if (positionCounter < wayLength) {
      positionCounter++
    } else if (positionCounter === wayLength) {
      positionCounter = 0
    }
    stepCounter++
  }
  console.log('Steps: ', stepCounter)
}

export async function dayEightTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 8`)
  const rawData = await readTextFile('08-day-test-input-02.txt')
  //   const parsedData = parseData(rawData)
  const parsedData = parseDataPartTwo(rawData)
  console.log(parsedData)
  //   findWay(parsedData, 'AAA', 'ZZZ')
  // console.log(99999999, sorted)
  // const finalSort = secondSort(sorted)
  // //   console.log(989898, finalSort)
  // const res = finalCount(finalSort)
  // console.log(res)
}
