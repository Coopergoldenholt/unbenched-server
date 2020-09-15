INSERT INTO games (opponent, user_id, date, season_id)
VALUES ($1, $2, $3, $4)
returning *;