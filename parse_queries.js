const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'data');

const query_pattern = /@query/g;
const complexquery_pattern = /@complexquery/g;
const query_content_pattern = /\squery\s?=\s?`?/g;

try {
	let files = fs.readdirSync(directoryPath);
	files = files.filter(x => x.includes('db'));

	let queriesList = [];

	files.forEach(filename => {
		console.log(filename);
		const rawFile = fs.readFileSync(path.join(directoryPath, filename), 'utf8');
		const matches = [...rawFile.matchAll(query_pattern)];
		const matchIndices = matches.map(x => x.index);
		const queries = matchIndices.map((x, i) => {
			// Extract out section between this query and the next one
			let cur_substring;
			if (i + 1 < matchIndices.length) cur_substring = rawFile.substring(x, matchIndices[i+1]);
			else cur_substring = rawFile.substring(x);
	
			// Get query title
			let queryTitle = cur_substring.split('function')[1];
			queryTitle = queryTitle.split(')')[0];
			queryTitle = queryTitle.trim();
			queryTitle = queryTitle + ')';
			
			// Get Query contents
			let queryContents = cur_substring.split(query_content_pattern);
			queryContents = queryContents[1];
			queryContents = queryContents.split('`');
			queryContents = queryContents[0];
			
			return {
				filename: filename,
				title: queryTitle,
				query: queryContents
			};
		});
		queriesList = [...queriesList, ...queries];

		// Get Complex Queries
		const complexmatches = [...rawFile.matchAll(complexquery_pattern)];
		const complexmatchIndices = complexmatches.map(x => x.index);
		const complexQueries = complexmatchIndices.map((x, i) => {
			// Extract out section between this query and the next one
			let cur_substring;
			if (i + 1 < complexmatchIndices.length) {
				cur_substring = rawFile.substring(x, complexmatchIndices[i+1]);
			}
			else cur_substring = rawFile.substring(x);

			// Get query title
			let queryTitle = cur_substring.split('function')[1];
			queryTitle = queryTitle.split(')')[0];
			queryTitle = queryTitle.trim();
			queryTitle = queryTitle + ')';

			// Get Query contents
			console.log(cur_substring);
			console.log('\n done')
			let queryContents = cur_substring.split('export');
			queryContents = queryContents[1];

			return {
				filename: filename,
				title: queryTitle,
				query: queryContents
			};
		});

		queriesList = [...queriesList, ...complexQueries];
	});

	fs.writeFileSync('queries.json', JSON.stringify(queriesList));
} catch (err) {
  console.error(err);
}
