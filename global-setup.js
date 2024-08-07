const { execSync } = require('child_process');
const path = require('path');
const { deleteOldLogFiles } = require('./tests-utils/utils');

module.exports = async () => {
    // Define the folder path where the test-logs directory is located
    const logDir = path.join(__dirname, 'test-logs');

    // Delete old test-logs folder
    try {
        execSync(`rm -rf "${logDir}"`);
        console.log('Directory deleted.');
    } catch (error) {
        console.error('Error deleting directory:', error.message);
    }

    // Create the directory
    try {
        execSync(`mkdir -p "${logDir}"`);
        console.log('Directory created.');
    } catch (error) {
        console.error('Error creating directory:', error.message);
    }

    // Delete old log files
    try {
        deleteOldLogFiles(logDir);
        console.log('Old log files deleted.');
    } catch (error) {
        console.error('Error deleting old log files:', error.message);
    }
};
