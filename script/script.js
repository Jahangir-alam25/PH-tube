

function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}

function displayCategories(categories){
const categoryContainer = document.getElementById("category-container");
for(const cat of categories){
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML=`
    <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
    categoryContainer.appendChild(categoryDiv);
}

}

function loadVideos(){
fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
.then((res)=>res.json())
.then((data)=>displayVideos(data.videos)
)
}

const displayVideos = (videos)=> {
    const videosContainer = document.getElementById("videos-container");
videos.forEach(video => {
    console.log(video);
    
const videoCard = document.createElement("div");
videoCard.innerHTML=`
<div class="card bg-base-100">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-white bg-black text-sm rounded-md px-3">3hrs 56 min
                    ago</span>
            </figure>
            <div class="flex gap-3 mt-3">
                <div class="profile-pic">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div>
                    </div>
                </div>
                <div class="info">
                    <h2 class="text-xl font-bold">${video.title}</h2>
                    <p class="text-sm text-gray-400">${video.authors[0].profile_name} <i class="fa-solid fa-certificate text-blue-300"></i>
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
        </div>

`    
videosContainer.appendChild(videoCard)
});

}

loadVideos()
loadCategories();