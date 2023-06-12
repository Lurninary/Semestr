import { YouTubeAPI, YouTubeVideo } from "./YouTubeAPI.mjs"

const apiKey = 'AIzaSyCXAv-2ZqSYc3BCF0ZL04t3ynrnrECTkQ0'
const youtube = new YouTubeAPI(apiKey);

const videosTable = document.getElementById('videos')
const searchTable = document.getElementById('searchData')
const infoTable = document.getElementById('videoInfo')

const docTitle = document.getElementById('userName')
const webLink = document.getElementById('link')
const searchButton = document.getElementById('search_button')
const getVideo = document.getElementById('get_video')

let name = prompt("Привет! Как вас зовут?")
docTitle.textContent = "Привет, " + name + "!";

let videosData = []

function renderTable(data, table)
{
    table.innerHTML=''
    console.log("start render" + table.id)
    for (let video of data)
    {
        let row = document.createElement('tr')

        for (let item in video)
        {
            if(item != null){
                let column = document.createElement('th')

                if(item != "preview")
                {
                    column.textContent = video[item] 
                }else
                {
                    let image = document.createElement("img")
                    image.src = video[item]
                    column.appendChild(image)
                }
                row.appendChild(column)
            }
        }
        if(table.id == "searchData")
        {
            let addButton = document.createElement('button')
            addButton.textContent = "Добавить"
            setListener(addButton, 'click', async () =>{
                addVideo(video)
            })
            let column = document.createElement('th')
            column.appendChild(addButton)
            row.appendChild(column)
        }
        table.appendChild(row)
    }
}

const setListener = (element, type, handler) => {
    console.log("Adding listener to ${element}")
    if (!element) 
    {
        return
    }
    element.addEventListener(type, handler)
    return () => {
        element.removeEventListener(type, handler)
    }
    
}

function addVideo(video)
{
    videosData.push(video)
    renderTable(videosData, videosTable)
}

setListener(getVideo, 'click', async () => {
    youtube.getVideoDetails(webLink.value.replace('https://www.youtube.com/watch?v=', ''))
    .then(video => {
        console.log(video);
    })
    .catch(error => {
        console.error(error);
    });
})

let filters = {
    type: "video",
    orderBy: "viewCount",
    videoDefinition: "high",
    videoEmbeddable: "true"
};

setListener(searchButton, 'click', async () => {
    youtube.searchVideosWithFilters("JavaScript_tutorial", 5, filters)
    .then(videos => {
    console.log(videos);
    renderTable(videos, searchTable)
    })
    .catch(error => {
    console.error(error);
    });
})