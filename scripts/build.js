const shell = require('shelljs');
const chalk = require('chalk');

/* CONFIG */
const required = ['yarn'];
const buildFolderName = 'build';
const reactBuildList = ['popup'];
/* --CONFIG-- */

/* Dependencies test */
const testedReq = required.map(r => shell.which(r) ? null : r).filter(r => !!r);
if (testedReq.length) {
    shell.echo(chalk.red(`Sorry, this packages are required: ${testedReq.join(', ')}`));
    shell.exit(1);
}

/* Removing old files */
if (shell.ls().some(f => f === buildFolderName)) {
    console.log(chalk.blue('Removing old files...'));
    shell.rm('-r', 'build');
}

/* Creating build directory */
console.log(chalk.blue('Creating directory...'));
shell.mkdir('build');

/* Building dependencies */
console.log(chalk.blue('Building dependencies...'));

reactBuildList.forEach(d => {
    console.log(chalk.blue(`Building ${d}...`));
    /* Change direction to build directory */
    shell.cd(d);
    /* Run build */
    shell.exec('yarn build');
    /* Going back */
    shell.cd('..');
    /* Moving files from dependency build folder to main build folder */
    shell.mv(`${d}/build`, `${buildFolderName}/${d}`);
    /* Extracting index file and renaming it */
    shell.mv(`build/${d}/index.html`, `${buildFolderName}/${d}.html`)
});

console.log(chalk.blue(`Building background...`));
/* Building background script */
shell.cd('background');
shell.exec('yarn build');
shell.cd('../');
shell.mv('background/build', 'build/background');

console.log(chalk.blue('Copying files...'));
/* Copying assets */
shell.cp('-r', 'assets/*', 'build');

console.log(chalk.blue('Done!'));