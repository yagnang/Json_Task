"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelected = void 0;
// Importing data from response.json, quiz.json, and format.json
const response_json_1 = __importDefault(require("../data/response.json"));
const quiz_json_1 = __importDefault(require("../data/quiz.json"));
const format_json_1 = __importDefault(require("../data/format.json"));
// Function to calculate quiz points based on user selections
const userSelected = (userData) => {
    try {
        let quizPoints = 0;
        // Extracting user selections from input data
        const { userSelectedTopicIds, userSelectedFormatIds, userSelectedSourceIds } = userData;
        // Topic section start
        let userSelectedTopicIds_quiz_connection = [];
        // Matching user-selected topic IDs with quizzes
        userSelectedTopicIds.forEach((userTopicId) => {
            const quizzesForUserTopic = quiz_json_1.default.filter((quizValue) => {
                return quizValue.topic_id === userTopicId;
            });
            userSelectedTopicIds_quiz_connection = userSelectedTopicIds_quiz_connection.concat(quizzesForUserTopic);
        });
        // Matching quiz IDs with response data and updating quizPoints
        response_json_1.default.forEach((responseData) => {
            if (responseData.section_type === "Quiz") {
                userSelectedTopicIds_quiz_connection.forEach((connValue) => {
                    responseData.content.forEach((matchId) => {
                        if (connValue.id === matchId.id) {
                            quizPoints = 100;
                        }
                    });
                });
            }
        });
        // Topic section end
        // Format section start
        let format_section = ["Playing", "Self-practicing"];
        // Matching user-selected format IDs with format data and updating quizPoints
        format_json_1.default.forEach((formatData) => {
            format_section.forEach((formatSectionData) => {
                if (formatData.title == formatSectionData)
                    userSelectedFormatIds.forEach((userSelectId) => {
                        if (userSelectId === formatData.id) {
                            quizPoints += 10;
                        }
                    });
            });
        });
        // Format section end
        // Updating quiz points in the response data
        response_json_1.default.forEach((section) => {
            if (section.section_type == "Quiz") {
                section.points = quizPoints;
            }
        });
        return response_json_1.default;
    }
    catch (error) {
        console.log(error);
    }
};
exports.userSelected = userSelected;
