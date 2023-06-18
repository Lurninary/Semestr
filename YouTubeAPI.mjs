class YouTubeVideo {
    constructor(id, title, author, preview, upload, views, duration)
    {
        this.id = id
        this.title = title
        this.author = author
        this.preview = preview
        this.upload = upload
        this.views = views
        this.duration = duration
    }

    static searchConstructor(id, title, author, preview, upload)
    {
        return new YouTubeVideo(id, title, author, preview, upload, "", "")
    }
}

class YouTubeAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    getVideoDetails(videoId) {
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,id&id=${videoId}&key=${this.apiKey}`;
        let DataArray = []
        console.log(`getVideoDetails: Sending request to ${url}`);
        return fetch(url)
        .then(response => response.json())
        .then(data => {
            DataArray.push(new YouTubeVideo(
            data.items[0].id,
            data.items[0].snippet.title,
            data.items[0].snippet.channelTitle,
            data.items[0].snippet.thumbnails.high.url,
            data.items[0].snippet.publishedAt,
            data.items[0].statistics.viewCount,
            data.items[0].contentDetails.duration
            ))
        return DataArray;
        });
    }

    searchVideosWithFilters(query, maxResults, filters) {
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&key=${this.apiKey}`;
        let DataArray = []
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
            for(let i=0; i<data.items.length; i++){
                DataArray.push(YouTubeVideo.searchConstructor(
                data.items[i].id.videoId,
                data.items[i].snippet.title,
                data.items[i].snippet.channelTitle,
                data.items[i].snippet.thumbnails.high.url,
                data.items[i].snippet.publishedAt
                ))
            }
        return DataArray;
        });
    }
}

export {YouTubeAPI, YouTubeVideo};