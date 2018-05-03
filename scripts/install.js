const shell = require('shelljs');
const chalk = require('chalk');

const innerFolders = ['background', 'popup', 'manager'];

/* Getting package manager */
preferedPM = 'yarn';
fallbackPM = 'npm';
const logFallback = () => console.log(chalk.yellow(`\n'${preferedPM}' was not found, '${fallbackPM}' will be used instead.\n`));
const pm = shell.which(preferedPM) ? preferedPM : logFallback() || preferedPM;

innerFolders.forEach(path => {
    console.log(chalk.blue(`\nInstalling at '${path}'\n`));
    shell.cd(path);
    shell.exec(`${pm} install`);
    shell.cd('../');
});
