select * from workout_results wr
join workouts w on w.id = wr.workout_id
where user_id = $1
ORDER BY wr.date desc;