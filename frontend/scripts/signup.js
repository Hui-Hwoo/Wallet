const signup = async (event) => {
    const email = document.getElementById("reg-email").value;

    console.log({ test: document.getElementById("reg-password1") });
    const password1 = document.getElementById("reg-password1");
    const password2 = document.getElementById("reg-password2").value;

    if (password1 !== password2) {
        window.location.pathname = "../frontend/pages/register.html";
    }

    event.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: email.split("@")[0],
                email,
                password: password1,
            }),
        });
        console.log(response);
        if (response.ok) {
            const responseData = await response.json();
            window.localStorage.setItem("token", responseData.token);
            window.localStorage.setItem("userId", responseData.userId);
            window.location.pathname = "../frontend/pages/register.html";
        }
    } catch (error) {
        console.log(error);
    }
};

document.getElementById("signup").addEventListener("click", signup);
