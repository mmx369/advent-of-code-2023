import fsPromises from 'node:fs/promises'

async function readTextFile(path: string): Promise<string> {
  const rawData = fsPromises.readFile(path, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error('Error while reading file!')
  })
  return rawData
}

function transformData(rawData: string): string[] {
  return rawData.split('\r\n')
}

function findNumbersInStringPartOne(str: string): string[] | null {
  return str.match(/\d+/g)
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

  let startNumber
  let endNumber
  let tempStr = ''
  let tempStrRev = ''

  for (let i = 0; i < str.length; i++) {
    let isNumber = !isNaN(Number(str[i]))
    const res = textNumbers.filter((el) => tempStr.includes(el))
    if (res.length === 0) {
      tempStr = tempStr + str[i]
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

export async function dayOneTaskOne(): Promise<void> {
  console.log(`It's advent of code challenge. Day 1`)
  const rawDataFirstTask = await readTextFile('01-input.txt')
  const dataFirstTask = transformData(rawDataFirstTask)
  const resFirstTask = countSumPartOne(dataFirstTask)
  console.log(`First Task Answer is ${resFirstTask}`)
  const rawDataSecondTask = await readTextFile('02-input.txt')
  const dataSecondTask = transformData(rawDataSecondTask)
  const resSecondTask = countSumPartTwo(dataSecondTask)
  console.log(`Second Task Answer is ${resSecondTask}`)
}
