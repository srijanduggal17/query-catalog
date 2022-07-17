import React from "react";
import Card from 'react-bootstrap/Card';
import reactStringReplace from 'react-string-replace';

function Query(props) {
	let queryContents = props.query;
	let queryList = reactStringReplace(queryContents, /\$\{con\.escape\(\s?(.+?)\s?\)\}/g, (match, i) => {
		return <span style={ {color: 'red'} }>{match}</span>
	});

	return (
		<Card style={{ width: '70%', padding: '40px', margin: '25px' }}>
			<Card.Title>{props.title}</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">{props.filename}</Card.Subtitle>
			<pre>{queryList}</pre>
		</Card>
	);
}

module.exports = Query;