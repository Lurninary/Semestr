(()=>{"use strict";class e{constructor(e,t,i,o,n,s,l){this.id=e,this.title=t,this.author=i,this.preview=o,this.upload=n,this.views=s,this.duration=l}static searchConstructor(t,i,o,n,s){return new e(t,i,o,n,s,"","")}}const t=new class{constructor(e){this.apiKey=e}getVideoDetails(t){const i=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,id&id=${t}&key=${this.apiKey}`;let o=[];return console.log(`getVideoDetails: Sending request to ${i}`),fetch(i).then((e=>e.json())).then((t=>(o.push(new e(t.items[0].id,t.items[0].snippet.title,t.items[0].snippet.channelTitle,t.items[0].snippet.thumbnails.high.url,t.items[0].snippet.publishedAt,t.items[0].statistics.viewCount,t.items[0].contentDetails.duration)),o)))}searchVideosWithFilters(t,i,o){let n=`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${t}&type=video&maxResults=${i}&key=${this.apiKey}`,s=[];return o&&(o.orderBy&&(n+=`&order=${o.orderBy}`),o.publishedAfter&&(n+=`&publishedAfter=${o.publishedAfter}`),o.publishedBefore&&(n+=`&publishedBefore=${o.publishedBefore}`),o.videoDefinition&&(n+=`&videoDefinition=${o.videoDefinition}`)),console.log(`searchVideosWithFilters: Sending request to ${n}`),fetch(n).then((e=>e.json())).then((t=>{for(let i=0;i<t.items.length;i++)s.push(e.searchConstructor(t.items[i].id.videoId,t.items[i].snippet.title,t.items[i].snippet.channelTitle,t.items[i].snippet.thumbnails.high.url,t.items[i].snippet.publishedAt));return s}))}}("AIzaSyCXAv-2ZqSYc3BCF0ZL04t3ynrnrECTkQ0"),i=document.getElementById("videos"),o=document.getElementById("searchData"),n=document.getElementById("videoInfo"),s=document.getElementById("userName"),l=document.getElementById("link"),c=document.getElementById("search_button"),r=document.getElementById("get_video"),d=document.getElementById("deleteButton"),a=document.getElementById("query"),u=document.getElementById("addButton");let h=prompt("Привет! Как вас зовут?");s.textContent="Привет, "+h+"!";let p=[],m=[];function g(e,t){t.innerHTML="",console.log("start render "+t.id);for(let i of e){let e=document.createElement("tr");for(let t in i)if(""!==t){let o=document.createElement("th");if("preview"!=t)o.textContent=i[t];else{let e=document.createElement("a");e.href="https://www.youtube.com/watch?v="+i.id;let n=document.createElement("img");n.src=i[t],e.appendChild(n),o.appendChild(e)}e.appendChild(o)}y(e,"click",(()=>{"selected"!=e.id?(e.id="selected",e.className=t.id,e.style.backgroundColor="lightblue",console.log(e)):(e.id="",e.className="",e.style.backgroundColor=document.getElementById("searchData").style.backgroundColor)})),t.appendChild(e)}}const y=(e,t,i)=>{if(console.log("Adding listener to "+e.id),e)return e.addEventListener(t,i),()=>{e.removeEventListener(t,i)}};function f(e){let t=[];for(let e of document.querySelectorAll("tr"))"selected"==e.id&&t.push(e);return t}y(u,"click",(async()=>{console.log("Add");for(let e of f())if("searchData"==e.className){let o=m[e.rowIndex].id;t.getVideoDetails(o).then((e=>{console.log(e),p.push(e[0]),g(p,i)})),e.click()}})),y(r,"click",(async()=>{t.getVideoDetails(l.value.replace("https://www.youtube.com/watch?v=","")).then((e=>{console.log(e),g(e,n)})).catch((e=>{console.error(e)}))})),y(l,"keypress",(e=>{"Enter"===e.key&&l&&(e.preventDefault(),r.click())})),y(d,"click",(()=>{console.log("Delete");for(let e of f())"videos"==e.className&&(delete p[e.rowIndex],p=p.filter((e=>0!==Object.keys(e).length)));g(p,i)}));let v={type:"video",orderBy:"viewCount",videoDefinition:"high",videoEmbeddable:"true"};y(c,"click",(async()=>{m=[],t.searchVideosWithFilters(a.value,5,v).then((e=>{console.log(e),e.forEach((e=>{t.getVideoDetails(e.id).then((e=>{console.log(e[0]),m.push(e[0]),console.log(m),g(m,o)}))}))})).catch((e=>{console.error(e)}))})),y(a,"keypress",(e=>{"Enter"===e.key&&a&&(e.preventDefault(),c.click())}))})();
//# sourceMappingURL=bundle.js.map