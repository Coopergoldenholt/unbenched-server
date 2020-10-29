select * from workout_results wr 
join workouts w on w.id = wr.workout_id
where user_id = $1 and workout_id = $2
order by date desc;