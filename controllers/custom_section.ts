import section from "../data/section.json";

// Function to calculate custom points based on user selections
const userSelected = (userData: any, response: any) => {
    try {
        // Destructuring user selections
        const { userSelectedTopicIds, userSelectedFormatIds, userSelectedSourceIds } = userData;

        // Custom topic section start
        userSelectedTopicIds.forEach((userSelectTopicId: any) => {
            section.forEach((section_topicid) => {
                if (userSelectTopicId == section_topicid.topic_id) {
                    response.forEach((respData: any) => {
                        // Checking if the section type is not Quiz, news, or games
                        if (respData.section_type != "Quiz" && respData.section_type != "news" && respData.section_type != "games") {
                            respData.points = 0; // Initializing points
                            if (respData.section_id == section_topicid.id) {
                                respData.content.forEach((respDataContent: any) => {
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
        userSelectedFormatIds.forEach((userSelectFormatId: Number) => {
            response.forEach((respData: any) => {
                if (respData.section_type != "Quiz" && respData.section_type != "news" && respData.section_type != "games") {
                    respData.content.forEach((respDataContent: any) => {
                        if (userSelectFormatId == respDataContent.format_id) {
                            respData.points += 10; // Adding points based on format match
                        }
                    });
                }
            });
        });
        // Custom format section end

        // Custom source section start
        userSelectedSourceIds.forEach((userSelectSourceId: Number) => {
            response.forEach((respData: any) => {
                if (respData.section_type != "Quiz" && respData.section_type != "news" && respData.section_type != "games") {
                    respData.content.forEach((respDataContent: any) => {
                        if (userSelectSourceId == respDataContent.source_id) {
                            respData.points += 10; // Adding points based on source match
                        }
                    });
                }
            });
        });
        // Custom source section end

        return response;
    } catch (error) {
        console.log(error);
    }
}

export { userSelected }