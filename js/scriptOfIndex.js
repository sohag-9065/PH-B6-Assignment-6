const loadCategori = async() => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data.data.news_category;

}

const manuNav = async() => {
    const categories = await loadCategori();
    const menuNavDropdownUl = document.getElementById('menunav');
    const menuNavUl = document.getElementById('menu-nav');
    categories.forEach(categorie => {
        const {category_id,category_name} = categorie;
        // console.log(category_id,category_name);
        const li = document.createElement('li');
        li.innerHTML = `
            <a onclick="loadNewsByCategories(${category_id},'${category_name}')">${category_name}</a>
        `  
        menuNavDropdownUl.appendChild(li);        
    });
    categories.forEach(categorie => {
        const {category_id,category_name} = categorie;
        const li = document.createElement('li');
        li.innerHTML = `
            <a onclick="loadNewsByCategories(${category_id},'${category_name}')">${category_name}</a>
        `   
        menuNavUl.appendChild(li);        
    });
    // console.log(categories);
}

manuNav();

const loadNewsByCategoriesId = async(categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    // console.log(url)
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    // return data.data.news_category;

}
const loadNewsByCategories = async(categoryId,categoryName) => {
    const newsCategory = await loadNewsByCategoriesId(categoryId);


}