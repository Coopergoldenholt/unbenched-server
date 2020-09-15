INSERT INTO player_stats (game_id, user_id, field_goals_attempted, field_goals_made, three_shot, three_made, free_throw_shot, free_throw_made, offensive_rebound, defensive_rebound, steal, assist, block, turnover, foul)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
returning *;