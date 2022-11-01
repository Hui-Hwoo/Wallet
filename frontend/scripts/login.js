const getUsers = async (event, test) => {
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
            window.location.pathname = "../frontend/pages/dashboard.html";
        }
    } catch (error) {
        console.log(error);
    }
};


document.getElementById("login").addEventListener("click", login);

