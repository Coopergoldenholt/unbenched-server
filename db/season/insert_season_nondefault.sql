INSERT INTO seasons ("season", "user_id", "default")
VALUES ($1, $2, $3)

returning *;