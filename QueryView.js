const React = require('react');
const fs = require('fs');
const Query = require('./Query');
const queries = JSON.parse(fs.readFileSync('queries.json', 'utf8'));

let Output = () => {
	return (
	<div>
		{queries.map(x => <Query key={x.title} {...x}/>)}
	</div>)
};

module.exports = Output;