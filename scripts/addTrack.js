import fs from 'fs/promises'
import path from 'path'
import inquirer from 'inquirer'
import { customAlphabet } from 'nanoid'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

const dataFilePath = path.join(__dirname, '../public', 'data.json')
const tracksDirPath = path.join(__dirname, '../public', 'assets', 'tracks')

async function initialize() {
  await fs.mkdir(tracksDirPath, { recursive: true })

  try {
    await fs.access(dataFilePath)
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(dataFilePath, JSON.stringify({ data: [] }, null, 2))
    } else {
      throw new Error(`Unexpected error accessing data file: ${error.message}`)
    }
  }
}

async function addTrack() {
  const answers = await inquirer.prompt([
    {
      name: 'artist',
      message: 'Artist:',
      validate: input => (input ? true : 'Artist name cannot be empty.'),
    },
    {
      name: 'title',
      message: 'Title:',
      validate: input => (input ? true : 'Title cannot be empty.'),
    },
    {
      name: 'artistUrl',
      message: 'Artist URL (optional):',
      validate: input => (!input || input.startsWith('http') ? true : 'Please enter a valid URL.'),
    },
  ])

  for (const key in answers) {
    answers[key] = answers[key].trim()
  }

  const customAlphabetString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  const generateId = customAlphabet(customAlphabetString, 10)

  const trackId = generateId()

  const trackDir = `${answers.artist}_${answers.title}_${trackId}`
    .replace(/[\s-]+/g, '-')
    .replace(/[^\w-]/g, '')
    .toLowerCase()

  const trackDirPath = path.join(tracksDirPath, trackDir)
  await fs.mkdir(trackDirPath, { recursive: true })

  const newTrackData = {
    id: trackId,
    title: answers.title,
    artist: answers.artist,
    audioSrc: path.join('/assets', 'tracks', trackDir, 'audio.mp3'),
    coverSrc: path.join('/assets', 'tracks', trackDir, 'cover.webp'),
    artistUrl: answers.artistUrl || null,
  }

  let data
  try {
    data = JSON.parse(await fs.readFile(dataFilePath, 'utf8'))
  } catch (error) {
    throw new Error(`Error reading data file: ${error.message}`)
  }

  data.data.push(newTrackData)

  try {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
    console.log(`Track added successfully! Please add the audio and cover files in:
      ${path.join('public', 'assets', 'tracks', trackDir)}`)
  } catch (error) {
    throw new Error(`Error writing to data file: ${error.message}`)
  }
}

;(async () => {
  try {
    await initialize()
    await addTrack()
  } catch (error) {
    console.error(error.message)
  }
})()
