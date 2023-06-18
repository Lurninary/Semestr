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
const addButton = document.getElementById('addButton')

let name = prompt("Привет! Как вас зовут?")
docTitle.textContent = "Привет, " + name + "!";

let videosData = []
let searchData = []

function renderTable(data, table)
{
    table.innerHTML=''
    console.log("start render " + table.id)
    for (let video of data)
    {
        let row = document.createElement('tr')

        for (let item in video)
        {
            if (item !== '')
            {
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
        
        setListener(row, 'click', () => {
            if(row.id != 'selected')
            {
                row.id = 'selected'
                row.className = table.id
                row.style.backgroundColor = 'lightblue'
                console.log(row)
            } else {
                row.id = ''
                row.className = ''
                row.style.backgroundColor = document.getElementById('searchData').style.backgroundColor
            }
            
        })

        table.appendChild(row)
    }
}

const setListener = (element, type, handler) => {
    console.log("Adding listener to " + element.id)
    if (!element) 
    {
        return
    }
    element.addEventListener(type, handler)
    return () => {
        element.removeEventListener(type, handler)
    }
    
}

function selectRows() {
    let selectedRows = []
    for (let item of document.querySelectorAll('tr'))
    {
        if(item.id == 'selected'){
            selectedRows.push(item)
        } 
    }
    return selectedRows
}

setListener(addButton, 'click', async () => {
    console.log('Add')
    for (let item of selectRows())
    {
        let searchId = searchData[item.rowIndex].id
        youtube.getVideoDetails(searchId)
        .then(video => {
            console.log(video)
            videosData.push(video[0])
            renderTable(videosData, videosTable)
        })
    }
});

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
    youtube.searchVideosWithFilters(document.getElementById("query").value, 5, filters)
    .then(videos => {
    console.log(videos);
    searchData = videos
    renderTable(searchData, searchTable)
    })
    .catch(error => {
    console.error(error);
    });
})