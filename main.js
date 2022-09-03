const spinnerOnoff = loadingTrueFalse => {
    const loaderSection = document.getElementById('spinner')
    if (loadingTrueFalse) {
        const newsId = document.getElementById('news-id')
        newsId.innerHTML = ''

        const newsCountElm = document.getElementById('news-count')
        newsCountElm.innerHTML = 'Loading'
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}


const loadApi = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
        const data = await response.json()
        return data.data.news_category
    }
    catch (e) {
        alert("There is error which shows " + e.message);
    }

}


const displayCat = async () => {
    const data = await loadApi()
    const catElm = document.getElementById('cat')

    for (cat of data) {
        const li = document.createElement('li')
        li.innerHTML = `<li onclick="myFunction(${cat.category_id}); spinnerOnoff(true) " class="pe-3">
        <a class="nav-link" href="#">${cat.category_name}</a>
      </li>`
        catElm.append(li)
    }
}

displayCat()




const myFunction = async (id) => {




    try {

        const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        const data = await response.json()

        const sortedArr = data.data.sort((a, b) => b.total_view - a.total_view);



        console.log(sortedArr);

        const newsId = document.getElementById('news-id')
        newsId.innerHTML = ''


        for (d of sortedArr) {
            // console.log(d)

            const div = document.createElement('div')
            div.innerHTML = `        <div class="card mb-3" style="max-width:1400px;">
            <div class="row g-0">
                <div class="col-md-2">
                    <img src="${d.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title">${d.title}</h5>
                        <p class="card-text">${d.details.length > 250 ? d.details.slice(0, 250) + '.......' : d.details}</p>
                        <div class="d-flex flex-row justify-content-between ">
                            <div class="d-flex flex-row">
                                <img src="${d.author.img}" width="50px" height="50px" class="img-fluid  rounded-circle me-2" alt="...">
                                <p class="card-text mt-2 me-3"><small class="text-muted">${d.author.name ? d.author.name : "No Author Found"}</small></p>
                            </div>
                            <p class="card-text"><small class="text-muted">Views: ${d.total_view ? d.total_view : "No Views"}</small></p>
                            <div>
                                <button onclick="loadDetails('${d._id}')" class="btn btn-primary btn-sm"
                                    style="--bs-btn-padding-y: .5rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`


            newsId.append(div)
        }

        spinnerOnoff(false)

        const newsCountElm = document.getElementById('news-count')
        newsCountElm.innerText = `${data.data.length ? data.data.length : 'No'}  news in this category`
    } catch (e) {
        alert("There is error which shows " + e.message); //Handling error  
    }

}

myFunction(1)



const loadDetails = async id => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/${id}`
        const res = await fetch(url)
        const data = await res.json()

        const titleElm = document.getElementById('title-id')
        const bodyElm = document.getElementById('title-body')
        titleElm.innerHTML = `${data.data[0].title}`
        bodyElm.innerHTML = `${data.data[0].details}`
    }
    catch (e) {
        alert("There is error which shows " + e.message); //Handling error  
    }


}


