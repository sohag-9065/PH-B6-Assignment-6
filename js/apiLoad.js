const loadCategori = async () => {
    try {
        const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
        const data = await response.json();
        return data.data.news_category;
    }
    catch (error) {
        console.error(error);

    }

}


const loadNewsByCategoriesId = async (categoryId) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/news/category/0${categoryId}`);
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        console.error(error);
    }

}


const loadDetails = async (detailsId) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/news/${detailsId}`);
        const data = await response.json();
        return data.data[0];
    }
    catch (error) {
        console.error(error);
    }
}