// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
    if (!sidebarOpen) {
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if (sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

// ---------- CHARTS ----------

// category pie chart
var options = {
    series: [44, 55, 13, 43, 22, 100],
    chart: {
        width: 380,
        type: "pie",
    },
    labels: [
        "Appearance",
        "Food",
        "Learning",
        "Other",
        "Rent",
        "Transaportation",
    ],
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: "bottom",
                },
            },
        },
    ],
};

// AREA CHART
var areaChartOptions = {
    series: [
        {
            data: [55, 69, 45, 61, 43, 54, 37, 52, 44, 61, 43],
        },
    ],
    chart: {
        height: 350,
        type: "area",
        toolbar: {
            show: false,
        },
    },
    colors: ["#4f35a1"],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: [2, 0],
    },
    labels: [
        "Dec 01",
        "Dec 02",
        "Dec 03",
        "Dec 04",
        "Dec 05",
        "Dec 06",
        "Dec 07",
        "Dec 08",
        "Dec 09 ",
        "Dec 10",
        "Dec 11",
    ],
    markers: {
        size: 0,
    },
    yaxis: [
        {
            title: {
                text: "Daily Expense",
            },
        },
        {
            opposite: true,
        },
    ],
};

var areaChart = new ApexCharts(
    document.querySelector("#area-chart"),
    areaChartOptions
);
areaChart.render();

async function getDashBoard() {
    const response = await fetch("http://localhost:3000/dashboard", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            userId: window.localStorage.getItem("userId"),
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
    });
    if (response.status === 200) {
        const goal = document.getElementById("goal");
        const budget = document.getElementById("budget");
        const remains = document.getElementById("remains");

        result = await response.json();
        goal.innerHTML = result.goal.toString();
        budget.innerHTML = "$" + result.budget.toString();
        remains.innerHTML = "$" + result.remains.toString();

        options.series = result.series;
        var chart = new ApexCharts(
            document.querySelector("#pie-chart"),
            options
        );
        chart.render();
    }
}

window.onload = getDashBoard;
