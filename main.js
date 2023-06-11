import { YouTubeAPI, YouTubeVideo } from "./YouTubeAPI.mjs"

const docTitle = document.getElementById('name')
const webLink = document.getElementById('link')
const searchButton = document.getElementById('search_button')
const getVideo = document.getElementById('get_video')
const apiKey = 'AIzaSyCXAv-2ZqSYc3BCF0ZL04t3ynrnrECTkQ0'
const youtube = new YouTubeAPI(apiKey);
let searched_id = ''

let name = prompt("Привет! Как вас зовут?")
docTitle.textContent = name;

const setListener = (element, type, handler) => {
    console.log("Adding listener to ${element}")
    if (!element) {
        return
    }
    element.addEventListener(type, handler)
    return () => {
        element.removeEventListener(type, handler)
    }
    
}

// Получение информации о видео


setListener(getVideo, 'click', async () => {
    youtube.getVideoDetails(webLink.value.replace('https://www.youtube.com/watch?v=', ''))
    .then(video => {
        console.log(video);
    })
    .catch(error => {
        console.error(error);
    });
})

// Поиск видео на YouTube с фильтрами
const filters = {
    type: "video",
    orderBy: "viewCount",
    videoDefinition: "high",
    videoEmbeddable: "true"
};

setListener(searchButton, 'click', async () => {
    youtube.searchVideosWithFilters("JavaScript_tutorial", 5, filters)
    .then(videos => {
    console.log(videos);
    })
    .catch(error => {
    console.error(error);
    });
})