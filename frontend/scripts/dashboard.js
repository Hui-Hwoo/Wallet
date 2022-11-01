async function getDashBoard() {
    const response = await fetch("http://localhost:3000/dashboard", {
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
        budget.innerHTML = "$" + result.user.budget.toString();
        goal.innerHTML = result.user.goal.toString();
    }
}

window.onload = getDashBoard;
