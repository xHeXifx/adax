const LASTFM_KEY = '17e9265121cc75aafcfe9ed029a9deb8';
const LASTFM_USER = 'hexif';

async function fetchLastFMTrack() {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_KEY}&format=json&limit=1`, {
            headers: {
                'User-Agent': 'HeXif-Website/1.0'
            }
        });
        const data = await response.json();
        const track = data.recenttracks.track[0];
        
        updateNowPlaying({
            title: track.name,
            artist: track.artist['#text'],
            album: track.album['#text'],
            image: track.image[3]['#text'], // Using extralarge image
            url: track.url,
            isPlaying: track?.['@attr']?.nowplaying === 'true'
        });
    } catch (error) {
        console.error('Error fetching Last.fm data:', error);
    }
}

function updateNowPlaying(track) {
    const container = document.querySelector('.lastfm-widget');
    if (!container) return;

    container.innerHTML = `
        <div class="track-info">
            <img src="${track.image}" alt="Album Art" />
            <div class="track-details">
                <span class="status">${track.isPlaying ? 'Now Playing' : 'Last Played'}</span>
                <a href="${track.url}" target="_blank" class="track-title">${track.title}</a>
                <span class="track-artist">${track.artist}</span>
                <span class="track-album">${track.album}</span>
            </div>
        </div>
    `;
}

// Update every 30 seconds
setInterval(fetchLastFMTrack, 30000);
fetchLastFMTrack(); // Initial fetch
