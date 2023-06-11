import { YouTubeAPI } from "./YouTubeAPI.mjs"

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


setListener(getVideo, 'click', () => {
    youtube.getVideoDetails(webLink.textContent.replace('https://www.youtube.com/watch?v='))
    .then(video => {
        console.log(video);
    })
    .catch(error => {
        console.error(error);
    });
})

// Поиск видео на YouTube с фильтрами
const filters = {
  orderBy: "viewCount",
  publishedAfter: "2022-01-01T00:00:00Z",
  videoDefinition: "high"
};

setListener(searchButton, 'click', () => {
    youtube.searchVideosWithFilters("JavaScript tutorial", 1, filters)
    .then(videos => {
    console.log(videos);
    })
    .catch(error => {
    console.error(error);
    });
})


