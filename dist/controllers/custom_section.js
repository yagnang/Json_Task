"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelected = void 0;
const section_json_1 = __importDefault(require("../data/section.json"));
// Function to calculate custom points based on user selections
const userSelected = (userData, response) => {
    try {
        // Destructuring user selections
        const { userSelectedTopicIds, userSelectedFormatIds, userSelectedSourceIds } = userData;
        // Custom topic section start
        userSelectedTopicIds.forEach((userSelectTopicId) => {
            section_json_1.default.forEach((section_topicid) => {
                if (userSelectTopicId == section_topicid.topic_id) {
                    response.forEach((respData) => {
                        // Checking if the section type is not Quiz, news, or games
                        if (respData.section_type != "Quiz" && respData.section_type != "news" && respData.section_type != "games") {
                            respData.points = 0; // Initializing points
                            if (respData.section_id == section_topicid.id) {
                                respData.content.forEach((respDataContent) => {
                                    if (respDataContent.section_id == section_topicid.id) {
                                        respData.points += 100; // Adding points based on content match
                                    }
                                });
                            }
                        }
                    });
                }
            });
        });
        // Custom topic section end
        // Custom format section start
        userSelectedFormatIds.forEach((userSelectFormatId) => {
            response.forEach((respData) => {
                if (respData.section_type != "Quiz" && respData.section_type != "news" && respData.section_type != "games") {
                    respData.content.forEach((respDataContent) => {
                        if (userSelectFormatId == respDataContent.format_id) {
                            respData.points += 10; // Adding points based on format match
                        }
                    });
                }
            });
        });
        // Custom format section end
        // Custom source section start
        userSelectedSourceIds.forEach((userSelectSourceId) => {
            response.forEach((respData) => {
                if (respData.section_type != "Quiz" && respData.section_type != "news" && respData.section_type != "games") {
                    respData.content.forEach((respDataContent) => {
                        if (userSelectSourceId == respDataContent.source_id) {
                            respData.points += 10; // Adding points based on source match
                        }
                    });
                }
            });
        });
        // Custom source section end
        return response;
    }
    catch (error) {
        console.log(error);
    }
};
exports.userSelected = userSelected;
