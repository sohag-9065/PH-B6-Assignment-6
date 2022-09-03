let topRating = [];
let topView = [];
let trending = [];
let todayPic = [];
// Category link active function 
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

// display Category function 
const categoriesDisplay = async () => {
    const categories = await loadCategori();
    const menuNavDropdownUl = document.getElementById('menunav');
    const menuNavUl = document.getElementById('menu-nav');
    categories.forEach(categorie => {
        const { category_id, category_name } = categorie;
        // console.log(category_id,category_name);
        const li = document.createElement('li');
        li.innerHTML = `
            <a onclick="displayNewsByCategories(${category_id}, '${category_name}')">${category_name}</a>
        `
        menuNavDropdownUl.appendChild(li);
    });
    categories.forEach(categorie => {
        const { category_id, category_name } = categorie;
        const li = document.createElement('li');
        li.innerHTML = `
            <a onclick="displayNewsByCategories(${category_id}, '${category_name}')" class="act ml-2">${category_name}</a>
        `
        menuNavUl.appendChild(li);
    });
    activeLink();
}
// Default Display Category by categoriesDisplay(); function call
categoriesDisplay();

// Spinners 
const toggleSpinner = isLoding => {
    const loaderSection = document.getElementById('spinner');
    if (isLoding) {
        loaderSection.classList.remove('hidden');
    }
    else {
        loaderSection.classList.add('hidden');
    }
}
// How many items found check 
const foundItems = (categoryName, newsCategory) => {
    const foundItems = document.getElementById('found-items');
    foundItems.innerHTML = `
    <h2 class="p-4  bg-white w-full md:w-3/5 mx-auto mb-3 text-center text-2xl">${newsCategory.length === 0 ? 'No' : (newsCategory.length)} items found for category ${categoryName}</h2>    
    `
}
// How many items found check 
const dataNotFound = newsCategory => {
    const notFound = document.getElementById("not-found")
    notFound.classList.add("hidden");
    if (newsCategory.length === 0) {
        notFound.classList.remove("hidden");
        notFound.innerHTML = `<h2 class="text-2xl text-orange-500 text-center text-5xl">Not Found Data</h2>`
        return;
    }

}

const sortByRatingViewTrading = datas => {
    datas.sort((a, b) => {
        return b.propertyName - a.propertyName;
    });

}



const displayCard = (news) => {
    const newsDisplay = document.getElementById('news-display');
    newsDisplay.textContent = "";
     // News card Display Dynamic 
     news.forEach(news => {
        // news object destructuring
        const { _id, rating, total_view, title, author, image_url, details, others_info } = news;
        console.log(news)
    //     // sortByRatingViewTrading(news)

    //     // create div and inner html set  for display card
        const div = document.createElement('div');
        div.classList.add('mb-3')
        div.innerHTML = `
        <div class="card md:card-side bg-base-100 shadow-xl w-11/12 mx-auto mb-3">
            <figure><img src="${image_url}" alt="Movie" class="w-full md:w-60 h-72 p-4"></figure>
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



// display  news function 
const displayNewsByCategories = async (categoryId, categoryName) => {
    // spinner on before data load
    toggleSpinner(true);

    // load data by categories 
    const newsCategory = await loadNewsByCategoriesId(categoryId);
    // console.log(newsCategory);
    const newView = [...newsCategory]
    const sortbyView = newView.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    topView.length = 0;
    topView.push(...sortbyView);

    const newRating = [...sortbyView]
    const sortbyRating = newRating.sort((a, b) => {
        return b.rating.number - a.rating.number;
    });
    topRating.length = 0;
    topRating.push(...sortbyRating);

    const today = newsCategory.filter(data => {
        if(data.others_info.is_todays_pick){
            return data;
        }
     })
     todayPic.length = 0;
     todayPic.push(...today);

    const trendingOn = newsCategory.filter(data => {
        if(data.others_info.is_trending){
            return data;
        }
     })
     trending.length = 0;
     trending.push(...trendingOn)

    // spinner off after data load
    toggleSpinner(false);

    //How many items found check 
    foundItems(categoryName, newsCategory)

    // news card section  access by id
    const newsDisplay = document.getElementById('news-display');
    newsDisplay.textContent = "";

    // data not found check 
    dataNotFound(newsCategory);


    // News card Display Dynamic 
    displayCard(newsCategory);
}


const displayByTrending = () => {  
    displayCard(trending);
}
const displayByTodayPic = () => {  
    displayCard(todayPic);
}
const displayByTopView = () => {  
    displayCard(topView);
}
const displayByTopRating = () => { 
    displayCard(topRating);
}

// Modal Show function 
const showModal = async (newsId) => {
    // spinner on before modal data load
    toggleSpinner(true);
    // load data from api 
    const newsCategory = await loadDetails(newsId);
    // spinner off after modal data load
    toggleSpinner(false);
    // newsCategory object destructuring
    const { author, image_url, title, details, total_view, rating } = newsCategory;
    // modal body inner html create by dynamic 
    const modalBody = document.getElementById("modal-body");
    modalBody.textContent = "";
    modalBody.innerHTML = `
    <h2 class="pb-2 text-2xl font-bold">${title}</h2>
    <img src="${image_url}" alt="Movie" class="w-full h-72 p-4">
    <div class="flex justify-between items-center flex-wrap">
        <div class="div-author flex items-center pr-2">
            <div class="autho-image mr-4">
                <img class="rounded-full" style="height: 40px;" src="${author.img}" alt="">
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
    </div>
    <hr class="my-4"/>
    <p>${details}</p>

    `
}


