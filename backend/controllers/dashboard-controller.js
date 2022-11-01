const HttpError = require("../models/http-error");

const getDashBoard = async (req, res, next) => {
    try {
        const User = req.app.locals.db.collection("users");
        const userData = await User.findOne({ _id: req.userData.userId });

        if (!userData) {
            return next(new HttpError("Could not find user for this id"), 204);
        }

        var budget = userData.budget;
        const goal = userData.goal;

        const Expense = req.app.locals.db.collection("expenses");
        const eData = await Expense.find({
            creator: req.userData._id,
        }).toArray();

        if (!eData || eData.length === 0) {
            return next(
                new HttpError("Could not find expense for this id"),
                204
            );
        }

        var n = eData.length;
        var remains = budget;
        const year = new Date().getFullYear();
        const month = new Date().getMonth();

        var chart = [0, 0, 0, 0, 0, 0];
        // ["Appearance", "Food", "Learning", "Other", "Rent", "Transaportation"]

        var date;
        for (var i = 0; i < n; i++) {
            date = new Date(eData[i].date);

            if (date.getFullYear() === year && date.getMonth() === month) {
                remains -= eData[i].amount;
            }
            switch (eData[i].category) {
                case "Appearance":
                    chart[0] += eData[i].amount;
                    break;
                case "Food":
                    chart[1] += eData[i].amount;
                    break;
                case "Learning":
                    chart[2] += eData[i].amount;
                    break;
                case "Other":
                    chart[3] += eData[i].amount;
                    break;
                case "Rent":
                    chart[4] += eData[i].amount;
                    break;
                case "Transaportation":
                    chart[5] += eData[i].amount;
                    break;
            }
        }

        const dashboardInfo = {
            budget,
            goal,
            remains,
            chart,
        };
        console.log({dashboardInfo})
        res.status(200).json({ info: dashboardInfo });
    } catch (error) {
        console.log(error);
        return next(
            new HttpError("Something went wrong, could not find info!", 500)
        );
    }
};

exports.getDashBoard = getDashBoard;
