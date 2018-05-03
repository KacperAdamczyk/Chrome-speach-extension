const shell = require('shelljs');
const chalk = require('chalk');

const innerFolders = ['background', 'popup'];

const required = ['yarn'];

/* Dependencies test */
const testedReq = required.map(r => shell.which(r) ? null : r).filter(r => !!r);
if (testedReq.length) {
    shell.echo(chalk.red(`Sorry, this packages are required: ${testedReq.join(', ')}`));
    shell.exit(1);
}

innerFolders.forEach(path => {
    console.log(chalk.blue(`Installing at '${path}'`));
    shell.cd(path);
    shell.exec('yarn install');
    shell.cd('../');
});
