document.getElementById("searchBtn").addEventListener("click", function() {
    const inputTex = document.getElementById("input-field").value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputTex}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayFoodDetals(data.meals));
});

function getDetails(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => { displayFoods(data.meals) })

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('food-details');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');
                foodDiv.className = 'col-md-3';
                const foodInfo = `
                            <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                            <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                            </div>
                        `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);
            });
        } else {
            warning.style.display = 'block';
        }
    };
}

const displayFoodDetals = foods => {
    // console.log(foods);
    const foodImage = document.getElementById("food-image");
    foodImage.innerText = "";
    foods.forEach(food => {
        // console.log(food);
        const foodDiv = document.createElement("div");
        foodDiv.className = "food-container";
        foodDiv.innerHTML = `
        <div onclick="getDetails(${food.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="${food.strMealThumb}">
        <p>${food.strMeal}</p>
        </div>
        `
        foodImage.appendChild(foodDiv);
    });
}