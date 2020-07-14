#!/usr/bin/env node
const yargs = require('yargs');
const chalk = require('chalk');
const genFile = require('../dist/index');

const argv = yargs
  .usage('Usage: $0 [options]')
  .options({
    src: {
      type: 'string',
      description: 'source directory for svg files',
      alias: 's',
      demandOption: true,
    },
    dist: {
      type: 'string',
      description: 'destination directory for generated files',
      alias: 'd',
      demandOption: true,
    },
    jsx: {
      type: 'boolean',
      description: 'flag for jsx file extension.',
      default: false,
    },
  })
  .help('h')
  .alias('h', 'help')
  .wrap(70).argv;

if (!argv.dist || !argv.src) {
  console.log(chalk.red('Require src and dist parameters'));
} else {
  genFile(argv.src, argv.dist, argv.jsx);
}
