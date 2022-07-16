import {dbQuery, con, databaseSchema } from './database'
const rp = require('request-promise');

// @query
export async function searchGamesById(value) {
	const query = `
		select distinct
			game_id,
			t0.tournament_id,
			t0.sport,
		sp.forfeit_score as forfeit, g.type, status, date_format(g.date,'%a, %b-%d') as date, if(p.pool = 'Pool 0', '', p.pool) as pool, time_format(g.time,'%l:%i %p') as time,
		location, team1_id, team2_id,  t1.country as country1, t1.number as number1,
		t2.country as country2, t2.number as number2, t1.category,
		t1.gender from game as g
		join team as t1 on t1.team_id = g.team1_id
		join team as t2 on t2.team_id = g.team2_id
		join tournament as t0 on t0.tournament_id= g.tournament_id
		left join pool as p on p.team_id=t1.team_id
		join sport as sp on t0.sport=sp.sport
		where status = 'PENDING' and game_id = ${con.escape(value)} and p.tournament_id=t0.tournament_id
        order by g.date asc, g.time asc`;
        console.log("Search Game ID", query);

	return await dbQuery(query);
}

// @query
export async function searchGamesByLocation(value) {
	const query = `select distinct game_id, t0.tournament_id, t0.sport,
		sp.forfeit_score as forfeit, g.type, status, date_format(g.date,'%a, %b-%d') as date, if(p.pool = 'Pool 0', '', p.pool) as pool, time_format(g.time,'%l:%i %p') as time,
		location, team1_id, team2_id,  t1.country as country1, t1.number as number1,
		t2.country as country2, t2.number as number2, t1.category,
		t1.gender from game as g
		join team as t1 on t1.team_id = g.team1_id
		join team as t2 on t2.team_id = g.team2_id
		join tournament as t0 on t0.tournament_id= g.tournament_id
		left join pool as p on p.team_id=t1.team_id
		join sport as sp on t0.sport=sp.sport
		where status = 'PENDING' and g.location = ${con.escape(value)} and p.tournament_id=t0.tournament_id
		order by g.date asc, g.time asc`;

	return await dbQuery(query);
}