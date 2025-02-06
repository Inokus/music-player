# music-player

Music Player application built with React, TypeScript, and Vite. This project uses Howler.js for audio playback and Zustand for global state management.

## Features

- **Track List**: The app displays a list of tracks, each showing the title, artist, cover art, and duration. A play button appears on the cover art when a track is hovered over. The currently playing track is visually highlighted for easy reference.
- **Playback Controls**: Once a track starts playing, a playback controls bar appears, featuring play/pause, next track, and previous track buttons, along with volume and progress sliders. Track information is also displayed here, and if `artistUrl` is provided in `data.json`, the artist's name will be a clickable link.
- **Favorite**: Each track has a favorite button, which visually reflects its favorite status, and the status is persisted across sessions.
- **Search and Filter**: A search bar enables users to quickly find songs by title or artist. Users can also filter the list to show only favorited tracks, providing easy access to preferred songs. Searching or filtering does not affect the track currently playing. However, if the user plays a new track from the search or filtered results, the playlist will automatically update to match the current view.
- **Local Storage**: Favorite status and volume are persisted between page reloads.
- **Responsive Design**: The interface is fully responsive, ensuring that the music player works well on various screen sizes.

### Additional Tools

To streamline the addition of new tracks, the project includes two scripts to simplify managing `data.json`, the main source for track metadata:

- `npm run add-track`: Adds a new song by prompting for details, creating a folder for the song, and adding it to the `data.json` file.
- `npm run add-track-durations`: Checks if any songs are missing duration data and updates them in `data.json` if needed.

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>` and `cd music-player`
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run the application in preview mode: `npm run preview`
