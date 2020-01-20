'use strict';


const patterns= require('../patterns');
const XRegExp = require('xregexp');
let matchPattern = (str, cb) => {
	let getResult = patterns.find(item => {
		 if(XRegExp.test(str, XRegExp(item.pattern , "i"))){
		 	return true ;
		 }
	});
	// If the str matched a pattern, we return a function (in function of dict).
	
	if(getResult){
		var all_entities = Array()
		for(var i = 0; i < patterns.length; i++){
			var pat = patterns[i].pattern;
			var entity = createEntities(str, pat);
			all_entities.push(entity);
		}
		
		return cb({intent:getResult.intent, entities:all_entities});
	}
	//Default, if we didin't match anything
	else{
		console.log("I'm sorry, I didn't get your message...");
	}
}

let createEntities = function(user_input, pattern){
	return XRegExp.exec(user_input, XRegExp(pattern, "i"));
}


module.exports = matchPattern;