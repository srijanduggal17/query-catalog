import React from "react";

function Query(props) {
	return (
		<div>
			<p>{props.title}</p>
			<pre>{props.query}</pre>
			<p>{props.filename}</p>
		</div>
	);
}

module.exports = Query;