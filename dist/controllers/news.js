"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelected = void 0;
// Importing data from format.json
const format_json_1 = __importDefault(require("../data/format.json"));
// Function to calculate news points based on user selections
const userSelected = (userData, data) => {
    try {
        let newsPoints = 0;
        const { userSelectedTopicIds, userSelectedFormatIds, userSelectedSourceIds } = userData;
        // Topic section start
        // Looping through response data to find news sections
        data.forEach((respData) => {
            if (respData.section_type === "news") {
                // Looping through news content to match user-selected topic IDs
                respData.content.forEach((respDataContent) => {
                    userSelectedTopicIds.forEach((userSelectTopicId) => {
                        if (respDataContent.topic_id === userSelectTopicId) {
                            newsPoints += 100;
                        }
                    });
                });
            }
        });
        // Topic section end
        // Format section start
        // User-selected formats for news
        let format_section = ["Reading"];
        // Matching user-selected format IDs with format data and updating newsPoints
        format_json_1.default.forEach((formatData) => {
            format_section.filter((formatSectionData) => {
                if (formatData.title == formatSectionData)
                    userSelectedFormatIds.forEach((userSelectId) => {
                        if (userSelectId === formatData.id) {
                            newsPoints += 10;
                        }
                    });
            });
        });
        // Format section end
        // Updating news points in the response data
        data.forEach((section) => {
            if (section.section_type == "news") {
                section.points = newsPoints;
            }
        });
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.userSelected = userSelected;
