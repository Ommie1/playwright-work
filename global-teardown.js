const { execSync } = require('child_process');

module.exports = async () => {
    try {
        console.log('Generating Allure report...');
        execSync('allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
        console.log('Opening Allure report...');
        execSync('allure open allure-report', { stdio: 'inherit' });
    } catch (error) {
        console.error('Error generating or opening Allure report:', error.message);
    }
};