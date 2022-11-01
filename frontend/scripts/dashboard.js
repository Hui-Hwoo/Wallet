var budget = document.getElementById("budget");
var goal = document.getElementById("goal");

// var request = new XMLHttpRequest();
// request.onreadystatechange = function () {
//   if (request.status === 200) {
//     console.log(request.responseText);
//     result = JSON.parse(request.responseText);
//     budget.innerHTML = "$" + result["budget"];
//     goal.innerHTML = result["goal"];
//   }
// };

// request.open("GET", "/users/budget");
// request.send();

async function getUsers() {
    const response = await fetch("http://localhost:3000/expenses/me", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
    });
    if (response.status === 200) {
        const budget = document.getElementById("budget");
        const goal = document.getElementById("goal");
        result = await response.json();
        budget.innerHTML = "$" + result.user.budget.month.toString();
        goal.innerHTML = result.user.budget.year.toString();
    }
}

window.onload = getUsers;
