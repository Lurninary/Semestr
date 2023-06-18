import { YouTubeAPI } from "./YouTubeAPI.mjs"

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
const query = document.getElementById('query')
const addButton = document.getElementById('addButton')

const dateCb = document.getElementById('dateFilter')
const ratingCb = document.getElementById('ratingFilter')
const viewCountCb = document.getElementById('viewCountFilter')

let name = prompt("Привет! Как вас зовут?")
docTitle.textContent = "Привет, " + name + "!";

let videosData = []
let searchData = []
let filters = {
    type: "video",
    orderBy: "",
    videoDefinition: "high",
    videoEmbeddable: "true"
};

function renderTable(data, table)
{
    table.innerHTML=''
    console.log("start render " + table.id)
    let firstRow = document.createElement('tr')
    
    for (let attr in data[0])
    {
        let firstColumn = document.createElement('th')
        firstColumn.textContent = attr
        firstRow.appendChild(firstColumn)
    }
    table.appendChild(firstRow)
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
                }else {
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
        
        if(table.id != 'videoInfo')
        {
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
        }

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
        if(item.id == 'selected')
        {
            selectedRows.push(item)
        } 
    }
    return selectedRows
}

function checkboxesInit() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach((checkbox) => {
        setListener(checkbox, 'click', () => {
        checkboxes.forEach((cb) => {
            if (cb !== checkbox && cb.checked) 
            {
                cb.checked = false
            }
        })
    
        if (checkbox.checked) 
        {
            filters.orderBy = checkbox.value
        }
        })
    })
}

checkboxesInit()

setListener(addButton, 'click', async () => {
    console.log('Add')
    for (let item of selectRows())
    {
        if (item.className == "searchData")
        {
            let searchId = searchData[item.rowIndex - 1].id

            let video = await youtube.getVideoDetails(searchId)
            console.log(video)
            videosData.push(video[0])
            item.click()
        }
    }
    
    videosData = videosData.filter((item, index) => {
        return !videosData.slice(0, index).some((prevItem) => {
            return prevItem.id === item.id
        })
    })
    renderTable(videosData, videosTable)
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
            console.log(videosData)
            console.log(item.rowIndex)
            delete videosData[item.rowIndex - 1]
        
            videosData = videosData.filter(item => Object.keys(item).length !== 0)
        }
    }
    renderTable(videosData, videosTable)
})

setListener(searchButton, 'click', async () => {
    searchData = []
    youtube.searchVideosWithFilters(query.value, 5, filters)
    .then(async (videos) => {
        console.log(videos);
        for (let item of videos) 
        {
            let searchVideos = await youtube.getVideoDetails(item.id)
            console.log(searchVideos[0])
            searchData.push(searchVideos[0])
            console.log(searchData)
        }
        renderTable(searchData, searchTable)
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