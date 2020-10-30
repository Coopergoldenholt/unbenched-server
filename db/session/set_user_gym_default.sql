update users 
set athlete_gym_default = $2
where id = $1
returning *;