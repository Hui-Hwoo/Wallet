const getUsers = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/users");
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message);
        }
        console.log(responseData);
    } catch (error) {
        console.log(error);
    }

    console.log(elementname.textContent);
};

const signup = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "testJS",
                email: "testJS@gmail.com",
                password: "123456",
            }),
        });
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.log(error);
    }
};

// const { notify } = require("../../routes");

// var username = document.getElementById("username");
// var password = document.getElementById("password");

// async function postLogin(event) {
//     const response = await fetch("/users/login", {
//         body: `username=${urlescape(username.value)}&password=${urlescape(
//             password.value
//         )}`,
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//         method: "post",
//     });
//     if (response.status === 200) {
//         window.url = "http://localhost:3001/";
//     }
// }

// window.onload = getUsers;

const login = async (event) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    event.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            window.localStorage.setItem("token", responseData.token);
            window.localStorage.setItem("userId", responseData.userId);
            window.location.pathname = "frontend/dashboard.html";
        }
    } catch (error) {
        console.log(error);
    }
};

document.getElementById("login").addEventListener("click", login);
