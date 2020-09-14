UPDATE seasons
SET "default" = false
WHERE user_id = $2;

UPDATE seasons
SET "default" = true
WHERE id = $1
returning *;