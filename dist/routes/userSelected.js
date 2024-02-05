"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const daily_quiz_1 = require("../controllers/daily_quiz");
const news_1 = require("../controllers/news");
const games_1 = require("../controllers/games");
const custom_section_1 = require("../controllers/custom_section");
const router = (0, express_1.Router)();
exports.router = router;
// Define a route for handling the "userSelected" endpoint
router.post("/userSelected", (req, res) => {
    // Extract user data from the request body
    const userData = req.body;
    // Call the "daily_quiz" controller with user data
    const data = (0, daily_quiz_1.userSelected)(userData);
    // Call the "news" controller with user data and the result from the previous step
    const data1 = (0, news_1.userSelected)(userData, data);
    // Call the "games" controller with user data and the result from the previous step
    const data2 = (0, games_1.userSelected)(userData, data1);
    // Call the "custom_section" controller with user data and the result from the previous step
    const data3 = (0, custom_section_1.userSelected)(userData, data2);
    // Sort the final response array based on the "points" property in descending order
    let response = data3.sort((a, b) => b.points - a.points);
    // Send the sorted response as JSON
    res.json(response);
});
