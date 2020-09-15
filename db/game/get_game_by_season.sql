select * from games g 
join player_stats ps on ps.game_id = g.id
where g.season_id = $1
order by g.date desc;