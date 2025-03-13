function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (const btn of activeButtons) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for (const cat of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
        categoryContainer.appendChild(categoryDiv);
    }

}

function loadVideos(searchText = "") {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass()
            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)
        }
        )
}

const loadCategoryVideos = (id) => {
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass()
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");

            displayVideos(data.category)
        }
        )
}

const loadVideoDetails = (videoID) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayVideoDetails(data.video)
        )

}

const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal();

    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full  shadow-sm">
    <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${video.title}</h2>
      
      <div class="card-actions justify-end">
       
      </div>
    </div>
    </div>
    `

}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";
    if (videos.length == 0) {
        videosContainer.innerHTML = `
        <div class="col-span-4 flex flex-col justify-center items-center py-20">
            <img class="w-[120px]" src="images/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `
    }
    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
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
                    <p class="text-sm text-gray-400">${video.authors[0].profile_name} 
                    ${video.authors[0].verified == true ? `<i class="fa-solid fa-certificate text-blue-300"></i>` : ``}
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
            <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>

`
        videosContainer.appendChild(videoCard)
    });

}

document.getElementById("search-input")
.addEventListener("keyup", (e)=>{
const input = e.target.value;
loadVideos(input);

})
loadCategories();