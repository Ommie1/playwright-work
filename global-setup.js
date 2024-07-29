const path = require('path');
const { deleteOldLogFiles } = require('./tests-utils/utils');

module.exports = async () => {
    // Define the folder path where Winston log files are stored
    const folderPath = path.join(__dirname, 'test-logs'); // Adjust path as needed

    // Delete old log files
    deleteOldLogFiles(folderPath);
};
