const loadCategori = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data.data.news_category;

}


const loadNewsByCategoriesId = async (categoryId) => {
    // const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`);
    const data = await response.json();
    return data.data;

}


const loadDetails = async (detailsId) => {
    // const url = `https://openapi.programming-hero.com/api/news/${detailsId}`
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${detailsId}`);
    const data = await response.json();
    return data.data[0];

}