const shell = require('shelljs');
const chalk = require('chalk');

/* CONFIG */
const buildFolderName = 'build';
const reactBuildList = ['popup', 'manager'];

/* Getting package manager */
preferedPM = 'yarn';
fallbackPM = 'npm';
const logFallback = () => console.log(chalk.yellow(`\n'${preferedPM}' was not found, '${fallbackPM}' will be used instead.\n`));
const pm = shell.which(preferedPM) ? preferedPM : logFallback() || preferedPM;

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
    shell.exec(`${pm} build`);
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
shell.exec(`${pm} build`);
shell.cd('../');
shell.mv('background/build', 'build/background');

console.log(chalk.blue('Copying files...'));
/* Copying assets */
shell.cp('-r', 'assets/*', 'build');

console.log(chalk.blue('Done!'));