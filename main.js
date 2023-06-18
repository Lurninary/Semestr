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
const deleteVideo = document.getElementById('deleteButton')
const query = document.getElementById("query")
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
                    let link = document.createElement("a")
                    link.href = 'https://www.youtube.com/watch?v=' + video.id
                    let image = document.createElement("img")
                    image.src = video[item]
                    link.appendChild(image)
                    column.appendChild(link)
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

function selectRows(tableId) {
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
        if (item.className == "searchData")
        {
            let searchId = searchData[item.rowIndex].id
            youtube.getVideoDetails(searchId)
            .then(video => {
                console.log(video)
                videosData.push(video[0])
                renderTable(videosData, videosTable)
            })
            item.click()
        }
    }
});

setListener(getVideo, 'click', async () => {
    youtube.getVideoDetails(webLink.value.replace('https://www.youtube.com/watch?v=', ''))
    .then(video => {
        console.log(video);
        renderTable(video, infoTable)
    })
    .catch(error => {
        console.error(error);
    });
})

setListener(webLink, 'keypress', (event) => {
    if(event.key === 'Enter' && webLink)
    {
        event.preventDefault()
        getVideo.click()
    }
})

setListener(deleteVideo, 'click', () => {
    console.log('Delete')
    for (let item of selectRows())
    {
        if (item.className == 'videos')
        {
            delete videosData[item.rowIndex]
        
            videosData = videosData.filter(item => Object.keys(item).length !== 0)
        }
    }
    renderTable(videosData, videosTable)
})

let filters = {
    type: "video",
    orderBy: "viewCount",
    videoDefinition: "high",
    videoEmbeddable: "true"
};

setListener(searchButton, 'click', async () => {
    searchData = []
    youtube.searchVideosWithFilters(query.value, 5, filters)
    .then(videos => {
    console.log(videos);
    videos.forEach(element => {
        youtube.getVideoDetails(element.id)
        .then(searchVideos => {
            console.log(searchVideos[0])
            searchData.push(searchVideos[0])
            console.log(searchData)
            renderTable(searchData, searchTable)
        })
    });
    })
    .catch(error => {
    console.error(error);
    });
})

setListener(query, 'keypress', (event) => {
    if(event.key === 'Enter' && query)
    {
        event.preventDefault()
        searchButton.click()
    }
})