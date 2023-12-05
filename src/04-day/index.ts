import fsPromises from 'node:fs/promises'

async function readTextFile(path: string): Promise<string> {
  const rawData = fsPromises.readFile(path, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error('Error while reading file!')
  })
  return rawData
}

function parseData(rawData: string): string[] {
  return rawData.split('\r\n')
}

function getCommonElements(array1: number[], array2: number[]) {
  let a = new Set(array1)
  let b = new Set(array2)
  let res = [] as number[]

  for (let x of a) {
    if (b.has(x)) {
      res.push(x)
    }
  }

  return res
}

function calculatePoints(winNumbers: number[]): number {
  if (winNumbers.length === 0) {
    return 0
  }
  return 1 * 2 ** (winNumbers.length - 1)
}

function findWinningCombination(card: string): number[] {
  let data1 = card.split(':')
  data1.shift()
  let data2 = data1.join('').trim().split('|')
  const data3 = [] as number[][]
  for (let i = 0; i < data2.length; i++) {
    const res = data2[i].trim().split(' ')
    const res1 = res
      .map((el) => parseInt(el.trim(), 10))
      .filter((el) => !isNaN(el))
    if (res1.length !== 0) {
      data3.push(res1)
    }
  }
  const commonElements = getCommonElements(data3[0], data3[1])
  return commonElements
}

function checkTotalWinningPoints(cards: string[]): number {
  let totalPoints = 0
  for (let i = 0; i < cards.length - 1; i++) {
    const winNumbers = findWinningCombination(cards[i])
    const res = calculatePoints(winNumbers)
    totalPoints += res
  }
  return totalPoints
}

function checkWinPartTwo(cards: string[]) {
  console.log(cards.length)
  const winNumbersLength = [] as number[]
  const countCards = new Array(cards.length).fill(1)
  for (let i = 0; i < cards.length; i++) {
    const winNumbers = findWinningCombination(cards[i]).length
    // console.log(winNumbers)
    winNumbersLength.push(winNumbers)
    // console.log(winNumbersLength)
  }

  for (let j = 0; j < winNumbersLength.length; j++) {
    // console.log(winNumbersLength[j], countCards[j])
    for (let k = 1; k <= winNumbersLength[j]; k++) {
      countCards[j + k] = countCards[j + k] + countCards[j]
    }
  }
  console.log(countCards.reduce((acc, cur) => acc + cur, 0))
}

export async function dayFourTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 4`)
  const rawData = await readTextFile('04-day-input-02.txt')
  const parsedData = parseData(rawData)
  const totalPoints = checkTotalWinningPoints(parsedData)
  console.log(`Total wininnig points: ${totalPoints}`)

  checkWinPartTwo(parsedData)
}
