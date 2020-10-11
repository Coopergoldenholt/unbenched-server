select * from workout_results 
where user_id = $1 and workout_id = $2
order by date; 