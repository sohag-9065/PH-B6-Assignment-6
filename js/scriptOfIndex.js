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
        console.log(category_id,category_name);
        const li = document.createElement('li');
        li.innerHTML = `
            <a >${category_name}</a>
        `  
        menuNavDropdownUl.appendChild(li);        
    });
    categories.forEach(categorie => {
        const {category_id,category_name} = categorie;
        const li = document.createElement('li');
        li.innerHTML = `
            <a>${category_name}</a>
        `   
        menuNavUl.appendChild(li);        
    });
    // console.log(categories);
}

manuNav();
