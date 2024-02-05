import { Router } from "express";
import { userSelected as daily_quiz } from "../controllers/daily_quiz";
import { userSelected as news } from "../controllers/news";
import { userSelected as games } from "../controllers/games";
import { userSelected as custom_section } from "../controllers/custom_section";

const router = Router();

// Define a route for handling the "userSelected" endpoint
router.post("/userSelected", (req, res) => {
  // Extract user data from the request body
  const userData = req.body;

  // Call the "daily_quiz" controller with user data
  const data = daily_quiz(userData);

  // Call the "news" controller with user data and the result from the previous step
  const data1 = news(userData, data);

  // Call the "games" controller with user data and the result from the previous step
  const data2 = games(userData, data1);

  // Call the "custom_section" controller with user data and the result from the previous step
  const data3 = custom_section(userData, data2);

  // Sort the final response array based on the "points" property in descending order
  let response = data3.sort((a: any, b: any) => b.points - a.points)

  // Send the sorted response as JSON
  res.json(response);
});

// Export the router for use in other parts of the application
export { router };