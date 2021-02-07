const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const detail = document.getElementById('meal_details');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list 
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach((meal,key) => {
                html += `
                    <div class = "meal-item" onclick="{details('${meal.idMeal}')}" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });

}
function details(id){
    let html = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.json())
    .then(data => {
    
        if(data.meals){
            let meal = data.meals[0];
            //console.log(meal);
        html = `
        <div class = "meal-item" style="width:200px;">
            <div class = "meal-img">
                <img width="100" height="100" src = "${meal.strMealThumb}" alt = "food">
            </div>
            <div class = "meal-name1">
                <h3><strong>strMeal:</strong> ${meal.strMeal}</h3>
                <h3><strong>strCategory:</strong> ${meal.strCategory}</h3>
                <h3><strong>strInstructions:</strong>${meal.strInstructions}</h3>
                <h3><strong>strTags:</strong>${meal.strTags}</h3>
                <h3><strong>strIngredient1:</strong>${meal.strIngredient1}</h3>
                <h3><strong>strIngredient12:</strong>${meal.strIngredient12}</h3>
            </div>
        </div>
    `;
        } else{

        }

        detail.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}