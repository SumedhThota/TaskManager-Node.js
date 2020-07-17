
var chalk= require('chalk');
var notes=require('./notes.js');
var yargs=require('yargs');
yargs.version('1.1.0');
yargs.command({
    command: 'add',
    describe: 'Add notes',
    handler: function (){
        console.log('Adding notes');
    }
})
yargs.command({
    command: 'remove',
    describe: 'remove notes',
    handler: function (){
        console.log(chalk.red('Removing notes'));
    }
})
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: function (){
        console.log('Listing notes');
    }
})
yargs.command({
    command: 'read',
    describe: 'read notes',
    handler: function (){
        console.log('Reading notes');
    }
})
