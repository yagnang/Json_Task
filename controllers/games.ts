// Importing data from format.json
import format from '../data/format.json';

// Function to calculate games points based on user selections
const userSelected = (userData: any, data1: any) => {
    try {
        let gamesPoints = 0
        const { userSelectedTopicIds, userSelectedFormatIds, userSelectedSourceIds } = userData;

        // Format section start

        // User-selected formats for games
        let format_section = ["Playing"]

        // Matching user-selected format IDs with format data and updating gamesPoints
        format.forEach((formatData) => {
            format_section.filter((formatSectionData) => {
                if (formatData.title == formatSectionData)
                    userSelectedFormatIds.forEach((userSelectId: Number) => {
                        if (userSelectId === formatData.id) {
                            gamesPoints += 10
                        }
                    });
            })
        })

        // Format section end

        // Updating games points in the response data
        data1.forEach((section: any) => {
            if (section.section_type == "games") {
                section.points = gamesPoints
            }
        })

        return data1;

    } catch (error) {
        console.log(error);
    }
}

// Exporting the userSelected function
export { userSelected }
