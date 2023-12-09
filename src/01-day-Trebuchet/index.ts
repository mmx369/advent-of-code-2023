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

function parseData(rawData: string): string[] {
  return rawData.split('\r\n')
}

function findNumbersInStringPartOne(str: string): string[] | null {
  return str.match(/\d+/g)
}

function countSumPartOne(data: string[]): number {
  let sum = 0
  for (let i = 0; i < data.length; i++) {
    let num = findNumbersInStringPartOne(data[i])?.join().split('')
    if (num) {
      sum += parseInt(num[0] + num[num.length - 1], 10)
    }
  }
  return sum
}

function countSumPartTwo(data: string[]): number {
  let totalNumber = 0
  for (let i = 0; i < data.length; i++) {
    const res = findNumbersPartTwo(data[i])
    totalNumber += res
  }
  return totalNumber
}

function findNumbersPartTwo(str: string): number {
  const reverseStr = str.split('').reverse().join('')
  const textNumbers = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ]
  const textNumbersReversed = textNumbers.map((num) =>
    num.split('').reverse().join('')
  )

  let startNumber: string = ''
  let endNumber: string = ''
  let tempStr: string = ''
  let tempStrRev: string = ''

  for (let i = 0; i < str.length; i++) {
    let isNumber = !isNaN(Number(str[i]))
    const res = textNumbers.filter((el) => tempStr.includes(el))
    if (res.length === 0) {
      tempStr += str[i]
      if (isNumber) {
        startNumber = String(str[i])
        break
      }
    } else {
      const index = textNumbers.indexOf(res[0])
      startNumber = String(index + 1)
      break
    }
  }

  for (let j = 0; j < reverseStr.length; j++) {
    let isNumber = !isNaN(Number(reverseStr[j]))
    const resRev = textNumbersReversed.filter((el) => tempStrRev.includes(el))
    if (resRev.length === 0) {
      tempStrRev = tempStrRev + reverseStr[j]
      if (isNumber) {
        endNumber = String(reverseStr[j])
        break
      }
    } else {
      const index = textNumbersReversed.indexOf(resRev[0])
      endNumber = String(index + 1)
      break
    }
  }
  return parseInt(startNumber + endNumber, 10)
}

export async function dayOneTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 1`)
  const rawData = await readTextFile('01-input.txt')
  const parsedData = parseData(rawData)
  const sumPartOne = countSumPartOne(parsedData)
  console.log('Part I result is ', sumPartOne)

  const sumPartTwo = countSumPartTwo(parsedData)
  console.log('Part II result is ', sumPartTwo)
}
