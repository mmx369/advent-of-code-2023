import fsPromises from 'node:fs/promises'
async function readTextFile(path: string): Promise<string> {
  const rawData = fsPromises.readFile(path, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error('Error while reading file!')
  })
  return rawData
}

function parseRow(str: string): string[] {
  const str1 = str.split(':')
  str1.shift()
  return str1.join('').split(';')
}

function transformData(rawData: string) {
  const data1 = rawData.split('\r\n')
  const data2 = [] as string[][]
  for (let i = 0; i < data1.length; i++) {
    const res = parseRow(data1[i])
    data2.push(res)
  }
  return data2
}

function isPossible(data: string[]) {
  let possibility = true
  const checkMap = {
    blue: 14,
    green: 13,
    red: 12,
  }
  for (let i = 0; i < data.length; i++) {
    const res = data[i].split(',')
    for (let j = 0; j < res.length; j++) {
      const r = res[j].trim().split(' ')
      if (r[1] === 'blue' && parseInt(r[0], 10) > checkMap.blue) {
        possibility = false
        break
      }
      if (r[1] === 'red' && parseInt(r[0], 10) > checkMap.red) {
        possibility = false
        break
      }
      if (r[1] === 'green' && parseInt(r[0], 10) > checkMap.green) {
        possibility = false
        break
      }
    }
  }
  return possibility
}

function multObjProps(obj: any) {
  let mult = 1
  for (let data of Object.values(obj)) {
    //@ts-ignore
    mult *= data
  }

  return mult
}

function findMinSet(str: string[]) {
  const res = str.join(',').split(',')
  console.log(3434, res)
  const obj = {}
  for (let i = 0; i < res.length; i++) {
    const result = res[i].trim().split(' ')
    console.log(result)
    if (obj.hasOwnProperty(result[1]) === false) {
      obj[result[1]] = parseInt(result[0])
    } else {
      if (obj[result[1]] < result[0]) {
        obj[result[1]] = parseInt(result[0])
      }
    }
  }
  return multObjProps(obj)
}

function calculateMinCubesSet(data: string[][]) {
  let totalSum = 0
  for (let i = 0; i < data.length; i++) {
    const res = findMinSet(data[i])
    console.log(4444, res)
    totalSum += res
  }
  return totalSum
}

function calculatePossibilityOfGames(data: string[][]): number {
  let counter = 0
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    const y = isPossible(data[i])
    console.log(i + 1, y)
    if (y) {
      counter += i + 1
    }
  }
  return counter
}

export async function dayTwoTask(): Promise<void> {
  console.log(`It's advent of code challenge. Day 2`)
  const rawData = await readTextFile('02-day-input-02.txt')
  const data = transformData(rawData)
  //   console.log('Data', data)
  const res = calculateMinCubesSet(data)
  //   const res = calculatePossibilityOfGames(data)
  console.log(res)
}
