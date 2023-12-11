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

function parseData(rawData: string): string[][] {
  return rawData.split('\r\n').map((el) => el.split(''))
}

function main(maze: string[][]) {
  let startingPosition: number[] = []
  //find starting position
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 'S') {
        startingPosition = [i, j]
        break
      }
    }
  }
  console.log('Start position: ', startingPosition)
  findWay(maze, startingPosition)
}

function isValidUp(
  maze: string[][],
  visited: boolean[][],
  row: number,
  col: number
) {
  return (
    row >= 0 &&
    maze[row][col] !== '.' &&
    maze[row][col] !== '-' &&
    maze[row][col] !== 'L' &&
    maze[row][col] !== 'J' &&
    !visited[row][col]
  )
}

function isValidRight(
  maze: string[][],
  visited: boolean[][],
  row: number,
  col: number
) {
  return (
    col < maze[0].length &&
    maze[row][col] !== '.' &&
    maze[row][col] !== '|' &&
    maze[row][col] !== 'L' &&
    maze[row][col] !== 'F' &&
    !visited[row][col]
  )
}

function isValidDown(
  maze: string[][],
  visited: boolean[][],
  row: number,
  col: number
) {
  return (
    row < maze.length &&
    maze[row][col] !== '-' &&
    maze[row][col] !== '7' &&
    maze[row][col] !== '.' &&
    maze[row][col] !== 'F' &&
    !visited[row][col]
  )
}

function isValidLeft(
  maze: string[][],
  visited: boolean[][],
  row: number,
  col: number
) {
  return (
    col >= 0 &&
    maze[row][col] !== '|' &&
    maze[row][col] !== '7' &&
    maze[row][col] !== '.' &&
    maze[row][col] !== 'J' &&
    !visited[row][col]
  )
}

function findWay(maze: string[][], startCoord: number[]) {
  const visited = Array.from({ length: maze.length }, () =>
    Array(maze[0].length).fill(false)
  )
  console.log('Visited: ', visited)
  const q = []
  visited[startCoord[0]][startCoord[1]] = true
  q.push([startCoord[0], startCoord[1]])
  console.log('Queue', q)

  let path: any = []

  path.push([startCoord[0], startCoord[1]])

  while (q.length > 0) {
    const [row, col] = q.shift() as number[]
    console.log('Check coords: ', row, col)
    const currentPoint = maze[row][col]
    console.log('Current', currentPoint)
    if (currentPoint === 'S') {
      if (isValidLeft(maze, visited, row, col - 1)) {
        console.log('Valid Left')
        q.push([row, col - 1])
        visited[row][col - 1] = true
        path.push([row, col - 1])
        continue
      }
      if (isValidRight(maze, visited, row, col + 1)) {
        console.log('Valid Right')
        q.push([row, col + 1])
        visited[row][col + 1] = true
        path.push([row, col + 1])
        continue
      }
      if (isValidUp(maze, visited, row - 1, col)) {
        console.log('Valid UP')
        q.push([row - 1, col])
        visited[row - 1][col] = true
        path.push([row - 1, col])
        continue
      }
      if (isValidDown(maze, visited, row + 1, col)) {
        console.log('Valid Down')
        q.push([row + 1, col])
        visited[row + 1][col] = true
        path.push([row + 1, col])
        continue
      }
    } else if (currentPoint === '-') {
      if (isValidLeft(maze, visited, row, col - 1)) {
        console.log('Valid Left')
        q.push([row, col - 1])
        visited[row][col - 1] = true
        path.push([row, col - 1])
        continue
      }
      if (isValidRight(maze, visited, row, col + 1)) {
        console.log('Valid Right')
        q.push([row, col + 1])
        visited[row][col + 1] = true
        path.push([row, col + 1])
        continue
      }
    } else if (currentPoint === '|') {
      if (isValidUp(maze, visited, row - 1, col)) {
        console.log('Valid UP')
        q.push([row - 1, col])
        visited[row - 1][col] = true
        path.push([row - 1, col])
        continue
      }
      if (isValidDown(maze, visited, row + 1, col)) {
        console.log('Valid Down')
        q.push([row + 1, col])
        visited[row + 1][col] = true
        path.push([row + 1, col])
        continue
      }
    } else if (currentPoint === 'L') {
      if (isValidUp(maze, visited, row - 1, col)) {
        console.log('Valid UP')
        q.push([row - 1, col])
        visited[row - 1][col] = true
        path.push([row - 1, col])
        continue
      }
      if (isValidRight(maze, visited, row, col + 1)) {
        console.log('Valid Right')
        q.push([row, col + 1])
        visited[row][col + 1] = true
        path.push([row, col + 1])
        continue
      }
    } else if (currentPoint === 'J') {
      if (isValidUp(maze, visited, row - 1, col)) {
        console.log('Valid UP')
        q.push([row - 1, col])
        visited[row - 1][col] = true
        path.push([row - 1, col])
        continue
      }
      if (isValidLeft(maze, visited, row, col - 1)) {
        console.log('Valid Left')
        q.push([row, col - 1])
        visited[row][col - 1] = true
        path.push([row, col - 1])
        continue
      }
    } else if (currentPoint === '7') {
      if (isValidDown(maze, visited, row + 1, col)) {
        console.log('Valid Down')
        q.push([row + 1, col])
        visited[row + 1][col] = true
        path.push([row + 1, col])
        continue
      }
      if (isValidLeft(maze, visited, row, col - 1)) {
        console.log('Valid Left')
        q.push([row, col - 1])
        visited[row][col - 1] = true
        path.push([row, col - 1])
        continue
      }
    } else if (currentPoint === 'F') {
      if (isValidDown(maze, visited, row + 1, col)) {
        console.log('Valid Down')
        q.push([row + 1, col])
        visited[row + 1][col] = true
        path.push([row + 1, col])
        continue
      }
      if (isValidRight(maze, visited, row, col + 1)) {
        console.log('Valid Right')
        q.push([row, col + 1])
        visited[row][col + 1] = true
        path.push([row, col + 1])
        continue
      }
    }

    console.log('Path: ', path)
    console.log('Path length: ', path.length / 2)
  }
}

export async function dayTenTask(): Promise<void> {
  console.log(`Advent of code challenge. Day 10`)
  const rawData = await readTextFile('01-input.txt')
  const maze = parseData(rawData)
  console.log(maze)
  main(maze)
}
