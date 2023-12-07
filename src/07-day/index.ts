import fsPromises from 'node:fs/promises'

async function readTextFile(path: string): Promise<string> {
  const rawData = fsPromises.readFile(path, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error('Error while reading file!')
  })
  return rawData
}

function parseData(rawData: string): [string, number][] {
  const data1 = rawData.split('\r\n') as string[]
  const data2 = [] as [string, number][]
  for (let i = 0; i < data1.length; i++) {
    let res = data1[i].split(' ')
    parseInt(res[1], 10)
    //@ts-ignore
    data2.push(res)
  }
  return data2
}

function countCharacter(str: string) {
  const count = {}
  for (let i = 0; i < str.length; i++) {
    if (count[str[i]]) {
      count[str[i]]++
    } else {
      count[str[i]] = 1
    }
  }
  return Object.values(count).sort((a: number, b: number) => b - a)
}

function checkHand(hand: [string, number][]) {
  const five = [] as [string, number][]
  const four = [] as [string, number][]
  const fullHouse = [] as [string, number][]
  const three = [] as [string, number][]
  const twoPair = [] as [string, number][]
  const onePair = [] as [string, number][]
  const highCard = [] as [string, number][]
  const sortedHands = [] as [string, number][][]
  console.log('My hands: ', hand)
  for (let i = 0; i < hand.length; i++) {
    const keys = countCharacter(hand[i][0])
    console.log('Keys: ', keys)
    if (keys.includes(5)) {
      five.push(hand[i])
    } else if (keys.includes(4)) {
      four.push(hand[i])
    } else if (keys.includes(3) && keys.includes(2)) {
      fullHouse.push(hand[i])
    } else if (keys.includes(3)) {
      three.push(hand[i])
    } else if (keys.filter((el) => el === 2).length === 2) {
      twoPair.push(hand[i])
    } else if (keys.includes(2)) {
      onePair.push(hand[i])
    } else {
      highCard.push(hand[i])
    }
  }
  console.log(7878, onePair)
  console.log(9898, highCard)
  return [five, four, fullHouse, three, twoPair, onePair, highCard].filter(
    (el) => el.length !== 0
  )
}

function compareStringsArr(arr1: string[], arr2: string[]) {
  const str1 = arr1[0]
  const str2 = arr2[0]
  const rank = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
  }

  for (let i = 0; i < str1.length; i++) {
    if (rank[str1[i]] > rank[str2[i]]) {
      return 1 // str1 больше str2
    } else if (rank[str1[i]] < rank[str2[i]]) {
      return -1 // str2 больше str1
    }
  }
  return 0
}

function secondSort(firstSort: [string, number][][]) {
  const finalSort = [] as any
  for (let i = 0; i < firstSort.length; i++) {
    //@ts-ignore
    firstSort[i].sort(compareStringsArr)
    finalSort.push(firstSort[i])
  }
  return finalSort
}

function finalCount(finalSort) {
  const res = finalSort.reverse().flat()
  //   console.log(3456, res)
  let totalResult = 0
  for (let i = 0; i < res.length; i++) {
    // console.log(res[i])
    totalResult += res[i][1] * (i + 1)
  }
  return totalResult
}

export async function daySevenTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 7`)
  const rawData = await readTextFile('07-day-input-01.txt')
  //   console.log(rawData)
  const parsedData = parseData(rawData)
  //   console.log(parsedData)
  const sorted = checkHand(parsedData)
  console.log(99999999, sorted)
  const finalSort = secondSort(sorted)
  //   console.log(989898, finalSort)
  const res = finalCount(finalSort)
  console.log(res)
}
