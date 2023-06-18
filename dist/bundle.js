(()=>{"use strict";class e{constructor(e,t,o,i,n,s,l){this.id=e,this.title=t,this.author=o,this.preview=i,this.upload=n,this.views=s,this.duration=l}static searchConstructor(t,o,i,n,s){return new e(t,o,i,n,s,"","")}}const t=new class{constructor(e){this.apiKey=e}getVideoDetails(t){const o=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,id&id=${t}&key=${this.apiKey}`;let i=[];return console.log(`getVideoDetails: Sending request to ${o}`),fetch(o).then((e=>e.json())).then((t=>(i.push(new e(t.items[0].id,t.items[0].snippet.title,t.items[0].snippet.channelTitle,t.items[0].snippet.thumbnails.high.url,t.items[0].snippet.publishedAt,t.items[0].statistics.viewCount,t.items[0].contentDetails.duration)),i)))}searchVideosWithFilters(t,o,i){let n=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${t}&type=video&maxResults=${o}&key=${this.apiKey}`,s=[];return i&&(i.orderBy&&(n+=`&order=${i.orderBy}`),i.publishedAfter&&(n+=`&publishedAfter=${i.publishedAfter}`),i.publishedBefore&&(n+=`&publishedBefore=${i.publishedBefore}`),i.videoDefinition&&(n+=`&videoDefinition=${i.videoDefinition}`)),console.log(`searchVideosWithFilters: Sending request to ${n}`),fetch(n).then((e=>e.json())).then((t=>{for(let o=0;o<t.items.length;o++)s.push(e.searchConstructor(t.items[o].id.videoId,t.items[o].snippet.title,t.items[o].snippet.channelTitle,t.items[o].snippet.thumbnails.high.url,t.items[o].snippet.publishedAt));return s}))}}("AIzaSyCXAv-2ZqSYc3BCF0ZL04t3ynrnrECTkQ0"),o=document.getElementById("videos"),i=document.getElementById("searchData"),n=document.getElementById("videoInfo"),s=document.getElementById("userName"),l=document.getElementById("link"),c=document.getElementById("search_button"),d=document.getElementById("get_video"),r=document.getElementById("deleteButton"),a=document.getElementById("query"),u=document.getElementById("addButton");document.getElementById("dateFilter"),document.getElementById("ratingFilter"),document.getElementById("viewCountFilter");let h=prompt("Привет! Как вас зовут?");s.textContent="Привет, "+h+"!";let m=[],p=[],g={type:"video",orderBy:"",videoDefinition:"high",videoEmbeddable:"true"};function y(e,t){t.innerHTML="",console.log("start render "+t.id);for(let o of e){let e=document.createElement("tr");for(let t in o)if(""!==t){let i=document.createElement("th");if("preview"!=t)i.textContent=o[t];else{let e=document.createElement("a");e.href="https://www.youtube.com/watch?v="+o.id;let n=document.createElement("img");n.src=o[t],e.appendChild(n),i.appendChild(e)}e.appendChild(i)}f(e,"click",(()=>{"selected"!=e.id?(e.id="selected",e.className=t.id,e.style.backgroundColor="lightblue",console.log(e)):(e.id="",e.className="",e.style.backgroundColor=document.getElementById("searchData").style.backgroundColor)})),t.appendChild(e)}}const f=(e,t,o)=>{if(console.log("Adding listener to "+e.id),e)return e.addEventListener(t,o),()=>{e.removeEventListener(t,o)}};function v(){let e=[];for(let t of document.querySelectorAll("tr"))"selected"==t.id&&e.push(t);return e}!function(){const e=document.querySelectorAll('input[type="checkbox"]');e.forEach((t=>{f(t,"click",(()=>{e.forEach((e=>{e!==t&&e.checked&&(e.checked=!1)})),t.checked&&(g.orderBy=t.value)}))}))}(),f(u,"click",(async()=>{console.log("Add");for(let e of v())if("searchData"==e.className){let i=p[e.rowIndex].id;t.getVideoDetails(i).then((e=>{console.log(e),m.push(e[0]),y(m,o)})),e.click()}})),f(d,"click",(async()=>{t.getVideoDetails(l.value.replace("https://www.youtube.com/watch?v=","")).then((e=>{console.log(e),y(e,n)})).catch((e=>{console.error(e)}))})),f(l,"keypress",(e=>{"Enter"===e.key&&l&&(e.preventDefault(),d.click())})),f(r,"click",(()=>{console.log("Delete");for(let e of v())"videos"==e.className&&(delete m[e.rowIndex],m=m.filter((e=>0!==Object.keys(e).length)));y(m,o)})),f(c,"click",(async()=>{p=[],t.searchVideosWithFilters(a.value,5,g).then((async e=>{console.log(e);for(let o of e){let e=await t.getVideoDetails(o.id);console.log(e[0]),p.push(e[0]),console.log(p)}y(p,i)})).catch((e=>{console.error(e)}))})),f(a,"keypress",(e=>{"Enter"===e.key&&a&&(e.preventDefault(),c.click())}))})();
//# sourceMappingURL=bundle.js.map