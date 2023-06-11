

class YouTubeAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    searchVideos(query, maxResults) {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&key=${this.apiKey}`;
        console.log(`searchVideos: Sending request to ${url}`);
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            const videos = data.items.map(item => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            author: item.snippet.channelTitle,
            preview: item.snippet.thumbnails.medium.url
            }));
            return videos;
        });
    }

    getVideoDetails(videoId) {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${this.apiKey}`;
        console.log(`getVideoDetails: Sending request to ${url}`);
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            const video = {
            id: data.items[0].snippet.resourceId.videoId,
            title: data.items[0].snippet.title,
            author: data.items[0].snippet.channelTitle,
            views: data.items[0].statistics.viewCount,
            duration: data.items[0].contentDetails.duration,
            preview: data.items[0].snippet.thumbnails.medium.url
            };
            return video;
        });
    }

    searchVideosWithFilters(query, maxResults, filters) {
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&key=${this.apiKey}`;
        if (filters) {
        if (filters.orderBy) {
            url += `&order=${filters.orderBy}`;
        }
        if (filters.publishedAfter) {
            url += `&publishedAfter=${filters.publishedAfter}`;
        }
        if (filters.publishedBefore) {
            url += `&publishedBefore=${filters.publishedBefore}`;
        }
        if (filters.videoDefinition) {
            url += `&videoDefinition=${filters.videoDefinition}`;
        }
        }
        console.log(`searchVideosWithFilters: Sending request to ${url}`);
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            const videos = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            author: item.snippet.channelTitle,
            preview: item.snippet.thumbnails.medium.url
            }));
            return videos;
        });
    }
}

export {YouTubeAPI};