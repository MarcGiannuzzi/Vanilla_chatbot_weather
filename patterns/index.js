const patternDict = [{
	pattern:'\\b(?<greeting>hi+|he+llo+|he+y+)\\b',
	intent:'greeting'},
	{
	pattern:'\\b(?<exit>bye|exit|see you|finish|end)\\b',
	intent:'exit'}, 
{
	pattern:'\\b(?<global>how|rain|sun|wind|humid|weather)\\b',
	intent:'global'}, 
{
	pattern:'\\b(?<temperature>weather|temperature|cold|hotfreez|warm|melting)\\b',
	intent:'temperature'},
{
	pattern:'\\b(?<mood>happy|sad|m good|fine)\\b',
	intent:'mood'},

{
	pattern:'\\b(?<me>you)\\b',
	intent:'me'}, 

{
	pattern:'\\b(?<date>today|tomorrow|after tommorow|in [0-7] days*|[a-z]+ days*|monday|tuesday|wednesay|thursday|friday|satudray|sunday)\\b',
	intent:'date'},

{
	pattern:'\\b(?<city>(in [a-z]+ *[a-z]+))\\b',
	intent:'current_weather'}
];

module.exports = patternDict;
