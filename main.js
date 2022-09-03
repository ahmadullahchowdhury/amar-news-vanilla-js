const loadApi = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await response.json()
    return data.data.news_category

}
const displayCat = async () => {
    const data = await loadApi()

    const catElm = document.getElementById('cat')


    for (cat of data) {
        const li = document.createElement('li')
        li.innerHTML = `<li onclick="myFunction(${cat.category_id})" class="pe-3">
        <a class="nav-link" href="#">${cat.category_name}</a>
      </li>`
        catElm.append(li)
    }
}

displayCat()

// const myFunction = (id) => {
//     console.log(id)
// }


const myFunction = async (id) => {


    // console.log(id)

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    const data = await response.json()

    console.log(data.data)

    const newsId = document.getElementById('news-id')
    newsId.innerHTML = ''


    for (d of data.data) {
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
                    <p class="card-text">${d.details.slice(0, 250)}</p>
                    <div class="d-flex flex-row justify-content-between ">
                        <div class="d-flex flex-row">
                            <img src="${d.author.img}" width="50px" height="50px" class="img-fluid  rounded-circle" alt="...">
                            <p class="card-text me-3"><small class="text-muted">${d.author.name}</small></p>
                        </div>
                        <p class="card-text"><small class="text-muted">${d.total_view}</small></p>
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

        // console.log(d.author.name)
        // console.log(d.title)
        // console.log(d.total_view)
        // console.log(d.details)
    }

    const newsCountElm = document.getElementById('news-count')
    newsCountElm.innerText = `${data.data.length}  news in this category`



}


const loadDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url)
    const data = await res.json()



    // // for(d of data.data){
    //     console.log(data.data[0].title)
    // // }
    // // for(let i = 0; i<=data.data.length; i++){
    // //     console.log(data.data[i].title)
    // // }




    const titleElm = document.getElementById('title-id')
    const bodyElm = document.getElementById('title-body')


    titleElm.innerHTML = `${data.data[0].title}`
    bodyElm.innerHTML = `${data.data[0].details}`

}
