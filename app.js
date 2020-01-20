'use strict';

var regex_city  
//cb is a function



const Readline = require('readline');

const cb = require('./callback')
const matcher = require('./matcher'); // to use the matcher module here

const rl = Readline.createInterface({
	input:process.stdin,
	output:process.stdout
    })
rl.setPrompt('> ');
rl.prompt()
rl.on('line', input => {
	matcher(input, cb);
	setTimeout(() => {rl.prompt();}, 800);
});
