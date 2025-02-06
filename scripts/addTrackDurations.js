import fs from 'fs/promises'
import path from 'path'
import { parseFile } from 'music-metadata'

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

const publicDirPath = path.join(__dirname, '../public')
const dataFilePath = path.join(publicDirPath, 'data.json')

async function addTrackDurations() {
  let data

  try {
    data = JSON.parse(await fs.readFile(dataFilePath, 'utf8'))
  } catch (error) {
    throw new Error(`Error reading data file: ${error.message}`)
  }

  let updatedCount = 0

  for (const track of data.data) {
    if (track.duration) {
      continue
    }

    const trackPath = path.join(publicDirPath, track.track)

    try {
      const metadata = await parseFile(trackPath)
      track.duration = metadata.format.duration
      updatedCount++
      console.log(
        `Added duration for track: ${track.title} by ${track.artist}: ${track.duration} seconds`,
      )
    } catch (error) {
      console.error(`Could not retrieve metadata for ${trackPath}: ${error.message}`)
    }
  }

  if (updatedCount > 0) {
    try {
      await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
      console.log(`Durations saved to data.json (${updatedCount} track(s) updated)`)
    } catch (error) {
      throw new Error(`Error writing to data file: ${error.message}`)
    }
  } else {
    console.log('No tracks to update. All tracks already have durations.')
  }
}

;(async () => {
  try {
    await addTrackDurations()
  } catch (error) {
    console.error(error.message)
  }
})()
