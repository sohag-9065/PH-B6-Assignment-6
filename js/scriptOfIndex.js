const loadCategori = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data.data.news_category;

}

const manuNav = async () => {
    const categories = await loadCategori();
    const menuNavDropdownUl = document.getElementById('menunav');
    const menuNavUl = document.getElementById('menu-nav');
    categories.forEach(categorie => {
        const { category_id, category_name } = categorie;
        // console.log(category_id,category_name);
        const li = document.createElement('li');
        li.innerHTML = `
            <a onclick="loadNewsByCategories(${category_id}, '${category_name}')">${category_name}</a>
        `
        menuNavDropdownUl.appendChild(li);
    });
    categories.forEach(categorie => {
        const { category_id, category_name } = categorie;
        const li = document.createElement('li');
        li.innerHTML = `
            <a onclick="loadNewsByCategories(${category_id}, '${category_name}')" class="act ml-2">${category_name}</a>
        `
        menuNavUl.appendChild(li);
    });
    activeLink();
    // console.log(categories);
}

manuNav();



const loadNewsByCategoriesId = async (categoryId) => {
    
    // const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`);
    const data = await response.json();
    return data.data;

}

const loadNewsByCategories = async (categoryId , categoryName) => {
    
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");

    const newsCategory = await loadNewsByCategoriesId(categoryId);
    // console.log(newsCategory)
   
    spinner.classList.add("hidden");

    const foundItems = document.getElementById('found-items');
    foundItems.innerHTML = `
    <h2 class="p-4  bg-white w-full md:w-3/5 mx-auto mb-3 text-center text-2xl">${newsCategory.length === 0 ? 'No' : (newsCategory.length)} items found for category ${categoryName}</h2>    
    `

    const newsDisplay = document.getElementById('news-display');
    newsDisplay.textContent = "";

    const notFound = document.getElementById("not-found")
    notFound.classList.add("hidden");
    notFound.textContent = "";
    if (newsCategory.length === 0) {
        notFound.classList.remove("hidden");
        notFound.innerHTML = `<h2 class="text-2xl text-orange-500 text-center text-5xl">Not Found Data</h2>`
        return;
    }

    newsCategory.forEach(news => {
        const { _id, rating, total_view, title, author, image_url, details } = news;
        const div = document.createElement('div');
        div.classList.add('mb-3')
        div.innerHTML = `
        <div class="card md:card-side bg-base-100 shadow-xl w-11/12 mx-auto mb-3">
            <figure><img src="${image_url}" alt="Movie" class="w-60 h-72 p-4"></figure>
            <div class="card-body">
                <h2 class="card-title">${title}</h2><br>
                <p>${details.length > 250 ? details.slice(0, 350) + '...' : details}</p>
                <div class="flex justify-between items-center flex-wrap">
                    <div class="div-author flex items-center pr-2">
                        <div class="autho-image mr-4">
                            <img class="rounded-full" style="height: 40px;" src="${author.img}"
                                alt="">
                        </div>
                        <div class="authon-name">
                            <h1>${author.name ? author.name : 'N/A'}</h1>
                            <p>${author?.published_date?.slice(0, 11)}</p>
                        </div>
                    </div>
                    <div class="div-viewers flex items-center pr-2">
                        <img src="${'../images/carbon_view.png'}" alt="eye-icon" class="pr-1">
                        <h2>${total_view ? total_view : 'N/A'}</h2>
                    </div>
                    <div class="pr-2">
                        <h2>Rating: ${rating.number}/5</h2>
                    </div>
                    <div>
                    <label onclick="showModal('${_id}')" for="my-modal-6" class="btn modal-button text-teal-400 bg-inherit">More Details</label>
                         
                    </div>
                
                </div>
            </div>
        </div>
        `
        newsDisplay.appendChild(div);
    });
    
}


const loadDetails = async (detailsId) => {
    // const url = `https://openapi.programming-hero.com/api/news/${detailsId}`
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${detailsId}`);
    const data = await response.json();
    return data.data[0];

}

const showModal = async (newsId) => {
    console.log(newsId);

    const newsCategory = await loadDetails(newsId);
    const { title, details } = newsCategory;
    console.log(newsCategory)
    console.log(title, details)
    const modalBody = document.getElementById("modal-body");
    modalBody.textContent = "";
    modalBody.innerHTML = `
    <h2 class="pb-2 text-2xl">
    ${title}
    </h2>
    <p>${details}</p>

    
    `
}




















const activeLink = async () => {
    var btns = document.querySelectorAll(".act");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace("active", "");
            this.className += " active";
        });
    }
}
activeLink();

