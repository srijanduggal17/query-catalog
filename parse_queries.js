const fs = require('fs');

const query_pattern = /@query/g;

try {
	let filename = 'game-db.js';
	const rawFile = fs.readFileSync(filename, 'utf8');
	const matches = [...rawFile.matchAll(query_pattern)];
	const matchIndices = matches.map(x => x.index);
	const queries = matchIndices.map((x, i) => {
		// Extract out section between this query and the next one
		let cur_substring;
		if (i + 1 < matchIndices.length) cur_substring = rawFile.substring(x, matchIndices[i+1]);
		else cur_substring = rawFile.substring(x);


		// Get query title
		let queryTitle = cur_substring.split('function')[1];
		queryTitle = queryTitle.split('(')[0];
		queryTitle = queryTitle.trim();

		// Get Query contents
		let queryContents = cur_substring.split('`');
		queryContents = queryContents[1];
		
		return {
			filename: filename,
			title: queryTitle,
			query: queryContents
		};
	});

	fs.writeFileSync('queries.json', JSON.stringify(queries));
} catch (err) {
  console.error(err);
}
