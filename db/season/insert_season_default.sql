UPDATE seasons
SET "default" = false
WHERE user_id = $2;

INSERT INTO seasons ("season", "user_id", "default")
VALUES ($1, $2, $3)

returning *;