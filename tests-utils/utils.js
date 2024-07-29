const fs = require('fs');
const path = require('path');

/**
 * Deletes all log files in the specified folder.
 * @param {string} folderPath - The path to the folder containing log files.
 */
function deleteOldLogFiles(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${folderPath}`, err);
            return;
        }

        files.forEach(file => {
            if (file.endsWith('.log')) { // Adjust this if you use a different extension
                const filePath = path.join(folderPath, file);
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error(`Error deleting file: ${filePath}`, err);
                    } else {
                        console.log(`Deleted file: ${filePath}`);
                    }
                });
            }
        });
    });
}

module.exports = { deleteOldLogFiles };
