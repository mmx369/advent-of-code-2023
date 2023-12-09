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
  console.log(222, res)
  const obj: Record<string, number> = {}
  for (let i = 0; i < res.length; i++) {
    const result = res[i].trim().split(' ')
    if (obj.hasOwnProperty(result[1]) === false) {
      obj[result[1]] = parseInt(result[0])
    } else {
      if (obj[result[1]] < parseInt(result[0], 10)) {
        obj[result[1]] = parseInt(result[0])
      }
    }
  }
  console.log(333, obj)
  return multObjProps(obj)
}

function calculateMinCubesSet(data: string[][]) {
  console.log(111, data)
  let totalSum = 0
  for (let i = 0; i < data.length; i++) {
    const res = findMinSet(data[i])
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
  const rawData = await readTextFile('02-day-testinput-01.txt')
  const data = transformData(rawData)
  //   console.log('Data', data)
  const res = calculateMinCubesSet(data)
  //   const res = calculatePossibilityOfGames(data)
  console.log(res)
}
