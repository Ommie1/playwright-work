const fs = require('fs');
const path = require('path');

/**
 * Deletes all log files in the specified folder.
 * @param {string} folderPath - The path to the folder containing log files.
 */
function deleteLogFilesInFolder(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            if (file.endsWith('.log')) {
                const filePath = path.join(folderPath, file);
                fs.unlink(filePath, err => {
                    if (err) throw err;
                });
            }
        }
    });
}

module.exports = { deleteLogFilesInFolder };
