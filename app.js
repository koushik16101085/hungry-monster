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
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach((meal, key) => {
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
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }

            mealList.innerHTML = html;
        });

}
function details(id) {
    let html = "";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {

            if (data.meals) {
                let meal = data.meals[0];
                //console.log(meal);
                html = `
        <div  class = "meal-item" style="width:500px;","hight:500px;">
            <div class = "meal-img">
                <img width="10px" height="500px" src = "${meal.strMealThumb}" alt = "food">
            </div>
            <div class = "meal-name1">
                <p class="mealNameColor" ><strong>Meal Name:</strong> ${meal.strMeal}</p>
                <h3> Ingredient </h3>
                <p><strong>1:</strong> ${meal.strMeasure1}  ${meal.strIngredient1}</p>
                <p><strong>2:</strong>${meal.strMeasure2}  ${meal.strIngredient2}</p>
                <p><strong>3:</strong>${meal.strMeasure3}  ${meal.strIngredient3}</p>
                <p><strong>4:</strong>${meal.strMeasure4}  ${meal.strIngredient4}</p>
                <p><strong>5:</strong>${meal.strMeasure5}  ${meal.strIngredient5}</p>
                <p><strong>6:</strong>${meal.strMeasure6}  ${meal.strIngredient6}</p>
                <p><strong>7:</strong>${meal.strMeasure7}  ${meal.strIngredient7}</p>
            </div>
        </div>
    `;
            } else {

            }

            detail.innerHTML = html;
        });
}

// get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}