import { join } from 'path';
import { deleteLogFilesInFolder } from './utils/utils';

export default async () => {
    // Define the folder path
    const folderPath = join(__dirname, '/test-logs');

    // Delete log files
    deleteLogFilesInFolder(folderPath);
};
