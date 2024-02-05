"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelected = void 0;
// Importing data from format.json
const format_json_1 = __importDefault(require("../data/format.json"));
// Function to calculate games points based on user selections
const userSelected = (userData, data1) => {
    try {
        let gamesPoints = 0;
        const { userSelectedTopicIds, userSelectedFormatIds, userSelectedSourceIds } = userData;
        // Format section start
        // User-selected formats for games
        let format_section = ["Playing"];
        // Matching user-selected format IDs with format data and updating gamesPoints
        format_json_1.default.forEach((formatData) => {
            format_section.filter((formatSectionData) => {
                if (formatData.title == formatSectionData)
                    userSelectedFormatIds.forEach((userSelectId) => {
                        if (userSelectId === formatData.id) {
                            gamesPoints += 10;
                        }
                    });
            });
        });
        // Format section end
        // Updating games points in the response data
        data1.forEach((section) => {
            if (section.section_type == "games") {
                section.points = gamesPoints;
            }
        });
        return data1;
    }
    catch (error) {
        console.log(error);
    }
};
exports.userSelected = userSelected;
