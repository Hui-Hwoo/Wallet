const addExpense = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/expenses", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                amonut: 100,
                description: "balabala",
                date: "2022-10-31",
                category: "other",
                creator: "635fc11a93f01da2561f9f6d",
            }),
        });
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.log(error);
    }
    console.log(elementname.textContent);
};
