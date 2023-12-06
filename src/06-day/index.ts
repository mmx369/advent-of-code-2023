import fsPromises from 'node:fs/promises'

async function readTextFile(path: string): Promise<string> {
  const rawData = fsPromises.readFile(path, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error('Error while reading file!')
  })
  return rawData
}

function parseData(rawData: string): number[][] {
  const data1 = rawData.split('\r\n')
  const data2 = [] as number[][]
  for (let i = 0; i < data1.length; i++) {
    let res = data1[i].split(' ')
    const res1 = res.map((el) => parseInt(el, 10)).filter((el) => !isNaN(el))
    if (res1.length !== 0) {
      data2.push(res1)
    }
  }
  return data2
}

function parseDataForPartTwo(rawData: string): number[][] {
  const data1 = rawData.split('\r\n')
  const data2 = [] as string[][]
  for (let i = 0; i < data1.length; i++) {
    let res = data1[i].split(':')
    res.shift()
    data2.push(res)
  }
  const data3 = [] as any
  for (let j = 0; j < data2.length; j++) {
    const data = data2[j]
      .map((el) => el.split(' ').join(''))
      .map((el) => parseInt(el, 10))
    data3.push(data)
  }
  return data3
}

function checkNmbersOfWayToWin(data: number[][]) {
  //   console.log('Time: ', data[0])
  //   console.log('Distance: ', data[1])
  const successAttempt = [] as number[]
  for (let i = 0; i <= data[0].length; i++) {
    let successCounter = 0
    for (let j = 1; j < data[0][i]; j++) {
      const leftTime = data[0][i] - j
      const distancePassed = j * leftTime
      if (distancePassed > data[1][i]) {
        successCounter += 1
      }
    }
    if (successCounter !== 0) {
      successAttempt.push(successCounter)
    }
  }
  return successAttempt.reduce((acc, cur) => acc * cur, 1)
}

export async function daySixTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 6`)
  const rawData = await readTextFile('06-day-input-01.txt')
  //   const parsedData = parseData(rawData)
  //   const numberOfWins = checkNmbersOfWayToWin(parsedData)
  //   console.log(numberOfWins)

  const parsedDataForPartTwo = parseDataForPartTwo(rawData)
  console.log(parsedDataForPartTwo)
  const numberOfWins = checkNmbersOfWayToWin(parsedDataForPartTwo)
  console.log(numberOfWins)
}
