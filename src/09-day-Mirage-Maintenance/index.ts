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

function parseData(rawData: string): number[][] {
  const arrString = rawData.split('\r\n').map((el) => el.split(' '))
  const arrNumber: number[][] = []
  for (let i = 0; i < arrString.length; i++) {
    const numArr: number[] = []
    for (let j = 0; j < arrString[i].length; j++) {
      numArr.push(parseInt(arrString[i][j], 10))
    }
    arrNumber.push(numArr)
  }
  return arrNumber
}

function allEqual(arr: number[]) {
  return arr.every((v) => v === arr[0])
}

//Getting last numbers from every steps
function main(data: number[][]): number[][] {
  const finalNumbers: number[][] = []
  for (let i = 0; i < data.length; i++) {
    const lastNumber: number[] = [] //save last numbers from every step
    const newArr: number[] = data[i] //save last set of numbers
    lastNumber.push(newArr[newArr.length - 1])
    while (!allEqual(newArr)) {
      const tempArr: number[] = []
      for (let j = newArr.length - 1; j >= 0; j--) {
        if (j > 0) {
          tempArr.push(newArr[j] - newArr[j - 1])
        }
      }
      newArr.length = 0
      tempArr.reverse()
      newArr.push(...tempArr)
      lastNumber.push(tempArr[tempArr.length - 1])
    }
    finalNumbers.push(lastNumber)
  }
  return finalNumbers
}

//Getting first numbers from every step
function mainPartTwo(data: number[][]): number[][] {
  const finalNumbers: number[][] = []
  for (let i = 0; i < data.length; i++) {
    const firstNumbers: number[] = [] //save first numbers from every step
    const newArr: number[] = data[i] //save last set of numbers
    firstNumbers.push(newArr[0])
    while (!allEqual(newArr)) {
      const tempArr: number[] = []
      for (let j = newArr.length - 1; j >= 0; j--) {
        if (j > 0) {
          tempArr.push(newArr[j] - newArr[j - 1])
        }
      }
      newArr.length = 0
      tempArr.reverse()
      newArr.push(...tempArr)
      firstNumbers.push(tempArr[0])
    }
    finalNumbers.push(firstNumbers)
  }
  return finalNumbers
}

//Count sum of predicted values
function countFinalSum(numbersArr: number[][]): number {
  let totalSum = 0
  for (let i = 0; i < numbersArr.length; i++) {
    const res = numbersArr[i].reduce((acc, cur) => acc + cur, 0)
    totalSum += res
  }
  return totalSum
}

function countFinalSumPartTwo(numbersArr: number[][]) {
  const finalResult: number[] = []
  for (let i = 0; i < numbersArr.length; i++) {
    const reversedNumbersArr = numbersArr[i].reverse()
    const previousPredictedNumbers: number[] = [0]
    for (let j = 0; j < reversedNumbersArr.length; j++) {
      const prevNumber =
        reversedNumbersArr[j] -
        previousPredictedNumbers[previousPredictedNumbers.length - 1]
      previousPredictedNumbers.push(prevNumber)
    }
    finalResult.push(
      previousPredictedNumbers[previousPredictedNumbers.length - 1]
    )
  }
  return finalResult.reduce((acc, cur) => acc + cur, 0)
}

export async function dayNineTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 9`)
  const rawData = await readTextFile('01-input.txt')
  const parsedData = parseData(rawData)
  const lastNumbersFromEveryStep = main(parsedData)
  const finalResPartOne = countFinalSum(lastNumbersFromEveryStep)
  console.log('Part I result is', finalResPartOne)

  const firstNumbersFromEveryStep = mainPartTwo(parsedData)
  const finalResPartTwo = countFinalSumPartTwo(firstNumbersFromEveryStep)
  console.log('Part II result is', finalResPartTwo)
}
