CREATE TABLE "users" (
"id" SERIAL PRIMARY KEY,
  "first_name" varchar(40),
  "last_name" varchar(40),
  "email" varchar(100) UNIQUE,
  "password" text,
  "customer_id" varchar(100),
  "type_of_user" varchar(50),
  "profile_pic" varchar(1000)
);

CREATE TABLE "seasons" (
  "id" SERIAL PRIMARY KEY,
  "season" varchar(6),
  "user_id" int,
  "default" boolean
);

CREATE TABLE "games" (
  "id" SERIAL PRIMARY KEY,
  "opponent" varchar(40),
  "user_id" int,
  "date" timestamp,
  "season_id" int
);


CREATE TABLE "player_stats" (
  "id" SERIAL PRIMARY KEY,
  "season_id" int,
  "game_id" int,
  "user_id" int,
  "layup_shot" int,
  "layup_made" int,
  "close_range_shot" int,
  "close_range_made" int,
  "free_throw_shot" int,
  "free_throw_made" int,
  "mid_range_shot" int,
  "mid_range_made" int,
  "three_shot" int,
  "three_made" int,
  "offensive_rebound" int,
  "defensive_rebound" int,
  "steal" int,
  "assist" int,
  "block" int,
  "turnover" int,
  "field_goals_attempted" int,
  "field_goals_made" int,
  "minutes_played" int,
  "foul" int
);

CREATE TABLE "player_goals" (
  "id" SERIAL PRIMARY KEY,
  "season_id" int UNIQUE,
  "user_id" int,
  "layup_shot" int,
  "layup_made" int,
  "close_range_shot" int,
  "close_range_made" int,
  "free_throw_shot" int,
  "free_throw_made" int,
  "mid_range_shot" int,
  "mid_range_made" int,
  "three_shot" int,
  "three_made" int,
  "offensive_rebound" int,
  "defensive_rebound" int,
  "steal" int,
  "assist" int,
  "block" int,
  "turnover" int,
  "field_goals_attempted" int,
  "field_goals_made" int,
  "minutes_played" int,
  "foul" int
);

CREATE TABLE "workouts" (
  "id" SERIAL PRIMARY KEY,
  "sport" varchar(40),
  "name" varchar(40),
  "type" varchar(40),
  "time" int,
  "equipment_needed" int,
  "url" text,
  "workout_data" boolean
);

CREATE TABLE "workout_results" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "workout_id" int,
  "low_value" varchar(50),
  "high_value" varchar(50),
  "date" timestamp  
);


ALTER TABLE "seasons" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "games" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "games" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id");

ALTER TABLE "player_stats" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id");

ALTER TABLE "player_stats" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id");

ALTER TABLE "player_stats" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "player_goals" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "player_goals" ADD FOREIGN KEY ("season_id") REFERENCES "seasons" ("id");

ALTER TABLE "workout_results" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "workout_results" ADD FOREIGN KEY ("workout_id") REFERENCES "workouts" ("id");