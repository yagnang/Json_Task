// Importing data from format.json
import format from '../data/format.json';

// Function to calculate news points based on user selections
const userSelected = (userData: any, data: any) => {
    try {
        let newsPoints = 0
        const { userSelectedTopicIds, userSelectedFormatIds, userSelectedSourceIds } = userData;

        // Topic section start

        // Looping through response data to find news sections
        data.forEach((respData: any) => {
            if (respData.section_type === "news") {
                // Looping through news content to match user-selected topic IDs
                respData.content.forEach((respDataContent: any) => {
                    userSelectedTopicIds.forEach((userSelectTopicId: Number) => {
                        if (respDataContent.topic_id === userSelectTopicId) {
                            newsPoints += 100
                        }
                    })
                })
            }
        })

        // Topic section end




        // Format section start

        // User-selected formats for news
        let format_section = ["Reading"]

        // Matching user-selected format IDs with format data and updating newsPoints
        format.forEach((formatData) => {
            format_section.filter((formatSectionData) => {
                if (formatData.title == formatSectionData)
                    userSelectedFormatIds.forEach((userSelectId: Number) => {
                        if (userSelectId === formatData.id) {
                            newsPoints += 10
                        }
                    });
            })
        })

        // Format section end



        
        // Updating news points in the response data
        data.forEach((section: any) => {
            if (section.section_type == "news") {
                section.points = newsPoints
            }
        })

        return data;

    } catch (error) {
        console.log(error);
    }
}

// Exporting the userSelected function
export { userSelected }
