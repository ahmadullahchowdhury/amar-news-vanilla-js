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
        li.innerHTML = `<li onclick="myFunction()" class="pe-3">
        <a class="nav-link" href="#">${cat.category_name}</a>
      </li>`
        catElm.append(li)
    //     console.log(cat.category_name)
    }
}

displayCat()


const myFunction = () => {
     console.log('tor hedar assingment')
}
