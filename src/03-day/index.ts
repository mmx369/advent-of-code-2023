import fsPromises from 'node:fs/promises'
async function readTextFile(path: string): Promise<string> {
  const rawData = fsPromises.readFile(path, 'utf-8').catch((err) => {
    console.log('Error while reading file!', err)
    throw new Error('Error while reading file!')
  })
  return rawData
}

function transformData(rawData: string): any {
  const data1 = rawData.split('\r\n')
  const data2 = [] as string[][]
  for (let i = 0; i < data1.length - 1; i++) {
    const res = data1[i].split('')
    data2.push(res)
  }
  return data2
}

function isNumber(str: string): boolean {
  return !isNaN(Number(str))
}

function isValid(str: string): boolean {
  if (str === undefined) {
    return false
  }
  let regex = /\d/g
  const isNumber = regex.test(str)
  if (str !== '.' && !isNumber) {
    return true
  }
  return false
}

function checkNumber(num: string, coords: number[][], matrix: string[][]) {
  console.log('Num: ', num)
  console.log('Coords: ', coords)
  let isNumberOk = false
  let length = num.length
  for (let i = 0; i < length; i++) {
    let position
    if (length === 1) {
      position = 'solo'
    } else if (i === 0) {
      position = 'start'
    } else if (i === num.length - 1) {
      position = 'end'
    } else {
      position = 'middle'
    }
    const res = checkAround(matrix, coords[i], position)
    console.log(191919, res)
    if (res) {
      isNumberOk = true
    }
  }
  // console.log(888, isNumberOk)
  return isNumberOk
}

function checkAround(
  matrix: string[][],
  coords: number[],
  position: string
): boolean {
  const [row, col] = coords
  console.log(row, col, position)

  if (position === 'solo') {
    console.log(9999999)
    if (isValid(matrix[row][col + 1])) {
      console.log(matrix[0][10])
      console.log(isValid(matrix[row][col + 1]) + '!!!!!')
      return true
    }
    if (isValid(matrix[row][col - 1])) {
      console.log(isValid(matrix[row][col - 1]))
      return true
    }
    if (matrix[row - 1]) {
      if (isValid(matrix[row - 1][col - 1])) {
        console.log(matrix[row - 1][col - 1])
        return true
      }
    }
    if (matrix[row - 1]) {
      if (isValid(matrix[row - 1][col])) {
        console.log(isValid(matrix[row - 1][col]))
        return true
      }
      if (isValid(matrix[row - 1][col + 1])) {
        console.log(isValid(matrix[row - 1][col + 1]))
        return true
      }
    }

    if (isValid(matrix[row + 1][col - 1])) {
      console.log(isValid(matrix[row + 1][col - 1]))
      return true
    }
    if (isValid(matrix[row + 1][col])) {
      console.log(isValid(matrix[row + 1][col]))
      return true
    }

    if (isValid(matrix[row + 1][col + 1])) {
      console.log(isValid(matrix[row + 1][col + 1]))
      return true
    }
  }

  if (position === 'start') {
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (isValid(matrix[row - 1][col - 1])) {
        return true
      }
      if (isValid(matrix[row - 1][col])) {
        return true
      }
      if (isValid(matrix[row][col - 1])) {
        return true
      }
      if (matrix[row + 1]) {
        if (isValid(matrix[row + 1][col - 1])) {
          return true
        }
        if (isValid(matrix[row + 1][col])) {
          return true
        }
      }
    } else if (row - 1 >= 0 && col - 1 < 0) {
      if (isValid(matrix[row - 1][col])) {
        return true
      }
      if (matrix[row + 1]) {
        if (isValid(matrix[row + 1][col])) {
          return true
        }
      }
    } else if (row - 1 < 0 && col - 1 >= 0) {
      if (isValid(matrix[row][col - 1])) {
        return true
      }
      if (isValid(matrix[row + 1][col - 1])) {
        return true
      }
      if (isValid(matrix[row + 1][col])) {
        return true
      }
    } else if (row - 1 < 0 && col - 1 < 0) {
      if (isValid(matrix[row + 1][col])) {
        return true
      }
    }
    return false
  }
  if (position === 'middle') {
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (isValid(matrix[row - 1][col])) {
        return true
      }
      if (matrix[row + 1]) {
        if (isValid(matrix[row + 1][col])) {
          return true
        }
      } else if (row - 1 < 0) {
        if (isValid(matrix[row + 1][col])) {
          return true
        }
      }
    }
    return false
  }
  if (position === 'end') {
    if (row - 1 >= 0 && col - 1 >= 0) {
      if (isValid(matrix[row - 1][col + 1])) {
        return true
      }
      if (matrix[row + 1]) {
        if (isValid(matrix[row + 1][col + 1])) {
          return true
        }
      }

      if (isValid(matrix[row][col + 1])) {
        return true
      }
      if (isValid(matrix[row - 1][col])) {
        return true
      }
      if (matrix[row + 1]) {
        if (isValid(matrix[row + 1][col])) {
          return true
        }
      }
    } else if (row - 1 < 0) {
      if (isValid(matrix[row + 1][col + 1])) {
        return true
      }
      if (isValid(matrix[row][col + 1])) {
        return true
      }
      if (isValid(matrix[row + 1][col])) {
        return true
      }
    }
    return false
  }
  return false
}

function find(data: string[][]) {
  let resultNumbers = [] as String[]
  for (let i = 0; i < data.length; i++) {
    let tempNumber = ''
    let tempCoord = [] as number[][]
    for (let j = 0; j < data[0].length; j++) {
      if (isNumber(data[i][j])) {
        tempNumber += data[i][j]
        tempCoord.push([i, j])
      } else if (!isNumber(data[i][j]) && tempNumber) {
        const res = checkNumber(tempNumber, tempCoord, data)
        if (res) {
          resultNumbers.push(tempNumber)
        }
        tempNumber = ''
        tempCoord = []
      }
    }

    if (tempNumber) {
      const res = checkNumber(tempNumber, tempCoord, data)
      if (res) {
        resultNumbers.push(tempNumber)
      }
      tempNumber = ''
      tempCoord = []
    }
  }

  console.log(resultNumbers)

  const resultInNumbers = resultNumbers
    .map((el) => Number(el))
    .reduce((prev, cur) => prev + cur, 0)
  console.log(resultInNumbers)
}

export async function dayThreeTask(): Promise<void> {
  console.log(`It's advent of code challenge. Day 3`)
  const rawData = await readTextFile('03-day-input-01.txt')
  const data = transformData(rawData)
  find(data)
}
