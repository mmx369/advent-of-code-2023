import fsPromises from 'node:fs/promises'

async function readTextFile(path: string): Promise<string> {
  const rawData = fsPromises.readFile(path, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error('Error while reading file!')
  })
  return rawData
}

function parseData(rawData: string): {
  seeds2: number[]
  finalSteps: number[][][]
} {
  const result = [] as any
  const data1 = rawData.split('\r\n')
  const data2 = data1.join().split(',,')

  for (let i = 0; i < data2.length; i++) {
    const data3 = data2[i].split(',')
    const temp: string[][] = []
    for (let j = 0; j < data3.length; j++) {
      temp.push(data3[j].split(' '))
    }
    result.push(temp)
  }

  const seeds = result.shift()[0]
  seeds.shift()
  const seeds2 = seeds.map((el: string) => parseInt(el, 0))

  const finalSteps: number[][][] = []
  for (let i = 0; i < result.length; i++) {
    result[i].shift()
  }
  for (let i = 0; i < result.length; i++) {
    const rrr = [] as any
    for (let j = 0; j < result[i].length; j++) {
      const el = result[i][j].map((el: string) => {
        return Number(el)
      })
      rrr.push(el)
    }
    finalSteps.push(rrr)
  }
  return { seeds2, finalSteps }
}

function calculateSeed(seed: number, maps: number[][]) {
  let newSeed = seed
  if (maps !== undefined) {
    for (let i = 0; i < maps.length; i++) {
      if (seed >= maps[i][1] && seed < maps[i][1] + maps[i][2]) {
        const delta = maps[i][0] - maps[i][1]
        newSeed = seed + delta
        break
      }
    }
  }
  return newSeed
}

function newSeedRangeForPartTwo(seeds: number[]): any {
  const ranges: number[][] = []
  for (let i = 0; i < seeds.length; i += 2) {
    let endOfRange = seeds[i] + seeds[i + 1]
    ranges.push([seeds[i], endOfRange])
  }
  return ranges
}

function findCorrespondedSource(seeds: number[], maps: number[][][]): any {
  const locations: number[] = []
  for (let i = 0; i < seeds.length; i++) {
    let tempRes = seeds[i]
    for (let j = 0; j < maps.length; j++) {
      const res = calculateSeed(tempRes, maps[j])
      tempRes = res
    }
    locations.push(tempRes)
  }
  return Math.min(...locations)
}

function arrayFromRange(range: any) {
  console.log(range[0], range[1])
  const arr = [] as number[]
  for (let i = 100; i <= 100000; i++) {
    console.log(range[i])
    arr.push(i)
  }
  console.log(arr)
}

export async function dayFiveTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 5`)
  const rawData = await readTextFile('05-day-test-input-01.txt')
  const { seeds2, finalSteps } = parseData(rawData)
  // const seedsRange = newSeedRangeForPartTwo(seeds2)
  //   console.log('Seeds Range', seedsRange)
  // arrayFromRange([[1044452533, 1084842474]])
  const minLocations = findCorrespondedSource(seeds2, finalSteps)
  console.log(minLocations)
}
