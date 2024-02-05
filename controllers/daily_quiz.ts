// Importing data from response.json, quiz.json, and format.json
import data from '../data/response.json';
import quiz from '../data/quiz.json';
import format from '../data/format.json';

// Function to calculate quiz points based on user selections
const userSelected = (userData: any) => {
    try {
        let quizPoints = 0

        // Extracting user selections from input data
        const { userSelectedTopicIds, userSelectedFormatIds, userSelectedSourceIds } = userData;

        // Topic section start

        let userSelectedTopicIds_quiz_connection: any[] = [];

        // Matching user-selected topic IDs with quizzes
        userSelectedTopicIds.forEach((userTopicId: number) => {
            const quizzesForUserTopic = quiz.filter((quizValue: { id: number; title: string; topic_id: number }) => {
                return quizValue.topic_id === userTopicId;
            });

            userSelectedTopicIds_quiz_connection = userSelectedTopicIds_quiz_connection.concat(quizzesForUserTopic);
        });

        // Matching quiz IDs with response data and updating quizPoints
        data.forEach((responseData) => {
            if (responseData.section_type === "Quiz") {
                userSelectedTopicIds_quiz_connection.forEach((connValue) => {
                    responseData.content.forEach((matchId:any) => {
                        if (connValue.id === matchId.id) {
                            quizPoints = 100
                        }
                    })
                })
            }
        })

        // Topic section end

        // Format section start

        let format_section = ["Playing", "Self-practicing"]

        // Matching user-selected format IDs with format data and updating quizPoints
        format.forEach((formatData) => {
            format_section.forEach((formatSectionData) => {
                if (formatData.title == formatSectionData)
                    userSelectedFormatIds.forEach((userSelectId: Number) => {
                        if (userSelectId === formatData.id) {
                            quizPoints += 10
                        }
                    });
            })
        })

        // Format section end

        // Updating quiz points in the response data
        data.forEach((section) => {
            if (section.section_type == "Quiz") {
                section.points = quizPoints
            }
        })

        return data;

    } catch (error) {
        console.log(error);
    }
};

// Exporting the userSelected function
export { userSelected };
