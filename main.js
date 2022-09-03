const loadApi = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await response.json()
    return data.data.news_category
    
}
const displayCat = async() =>{
    const data = await loadApi()

    const catElm = document.getElementById('cat')
    

    for(cat of data){
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


const myFunction = async(id) => {


    // console.log(id)

    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    const data = await response.json()
    console.log(data.data.length)

    const newsCountElm = document.getElementById('news-count')
    newsCountElm.innerText = `${data.data.length}  news in this category`

}
