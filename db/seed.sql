CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(40),
  "last_name" varchar(40),
  "email" varchar(100) UNIQUE,
  "password" text,
  "athlete_gym_default" varchar(50),
  "profile_pic" text,
  "birth_day" timestamp
);


CREATE TABLE "workouts" (
  "id" SERIAL PRIMARY KEY,
  "sport" varchar(40),
  "name" varchar(40),
  "type" varchar(40),
  "time" int,
  "equipment_needed" int,
  "url" text,
  "workout_data" boolean,
  "low_value_name" varchar(50),
  "high_value_name" varchar(50),
  "age_restriction" int,
  "percentages" boolean
);

CREATE TABLE "workout_results" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "workout_id" int,
  "low_value" varchar(50),
  "high_value" varchar(50),
  "date" timestamp  
);


ALTER TABLE "workout_results" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "workout_results" ADD FOREIGN KEY ("workout_id") REFERENCES "workouts" ("id");

INSERT INTO workouts (sport, name, type, time, equipment_needed, url, workout_data, low_value_name, high_value_name, age_restriction, percentages)
VALUES ('basketball', 'Shoot Better Threes', 'three_point_shooting', 20, 2, 'https://www.youtube.com/embed/XfcI36XgeLE', null, null, null, null, true )