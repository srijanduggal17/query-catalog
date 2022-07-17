const React = require('react');
const fs = require('fs');
const Query = require('./Query');
const queries = JSON.parse(fs.readFileSync('queries.json', 'utf8'));
const SSRProvider = require('react-bootstrap/SSRProvider');

let Output = () => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<title>Query Documentation</title>
				<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous"></link>
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossOrigin="anonymous"></script>
			</head>
			<body>
				<SSRProvider>
					<div>
						{queries.map(x => <Query key={x.title} {...x}/>)}
					</div>
				</SSRProvider>
			</body>
		</html>
		)
};

module.exports = Output;