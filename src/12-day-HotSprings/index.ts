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
  //   console.log(arrString)
  const parsedArr: any = []
  for (let i = 0; i < arrString.length; i++) {
    const arrayStr = arrString[i].join('|')
    let subArrays = arrayStr.split('| |').map((subArray) => subArray.split('|'))
    parsedArr.push(subArrays)
  }
  for (let j = 0; j < parsedArr.length; j++) {
    const patternArr = parsedArr[j][1]
      .filter((el: string) => el !== ',')
      .map(Number)
    parsedArr[j].pop()
    parsedArr[j].push(patternArr)
  }
  return parsedArr
}

function main(data: any) {
  for (let i = 0; i < data.length; i++) {
    const array = data[i][0]
    const pattern = data[i][1]
    const res = findAllPatterns(array, pattern)
  }
}

function findAllPatterns(array: string[], pattern: number[]) {
  console.log(array, pattern)
}

export async function dayTwelveTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 12`)
  const rawData = await readTextFile('01-test-input.txt')
  const parsedData = parseData(rawData)
  //   console.log(parsedData)
  main(parsedData)
}
