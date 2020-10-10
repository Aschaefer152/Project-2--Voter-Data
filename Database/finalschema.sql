-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

drop table "Voting_Data_by_Sex_Race_for_States";
CREATE TABLE "Voting_Data_by_Sex_Race_for_States" (
    "state" VARCHAR   NOT NULL,
    "sex_race" VARCHAR   NOT NULL,
    "total_citizen_population" VARCHAR   NULL,
    "percent_registered_citizen" VARCHAR   NULL,
    "percent_voted_citizen" VARCHAR   NULL
);

--view table
select * from "Voting_Data_by_Sex_Race_for_States";

drop table "Voting_Data_by_Age_for_States";
CREATE TABLE "Voting_Data_by_Age_for_States" (
    "state" VARCHAR   NOT NULL,
    "age" VARCHAR   NOT NULL,
    "total_citizen_population" VARCHAR   NULL,
    "percent_registered_citizen" VARCHAR   NULL,
    "percent_voted_citizen" VARCHAR   NULL
);

--view table
select * from "Voting_Data_by_Sex_Race_for_States";


drop table "State_Data";
CREATE TABLE "State_Data" (
    "state" VARCHAR   NOT NULL,
    "abbr" VARCHAR   NOT NULL,
    "latitude" VARCHAR   NOT NULL,
    "longitude" VARCHAR   NOT NULL,
);

--view table
select * from "State_Data";

drop table "Voter_Registration";
CREATE TABLE "Voter_Registration" (
    "state" VARCHAR   NOT NULL,
    "voting_registration" VARCHAR   NOT NULL
);
--view table
select * from "Voter_Registration";
