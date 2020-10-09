-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Voting_Data_by_Sex_Race_for_States" (
    "state" VARCHAR   NOT NULL,
    "race" VARCHAR   NOT NULL,
    "total_citizen_population" VARCHAR   NOT NULL,
    "percent_registered_citizen" VARCHAR   NOT NULL,
    "percent_voted_citizen" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Voting_Data_by_Sex_Race_for_States" PRIMARY KEY (
        "race"
     )
);

CREATE TABLE "Voting_Data_by_Age_for_States" (
    "state" VARCHAR   NOT NULL,
    "age" VARCHAR   NOT NULL,
    "total_citizen_population" VARCHAR   NOT NULL,
    "percent_registered_citizen" VARCHAR   NOT NULL,
    "percent_voted_citizen" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Voting_Data_by_Age_for_States" PRIMARY KEY (
        "age"
     )
);

CREATE TABLE "State_Data" (
    "state" VARCHAR   NOT NULL,
    "abbr" VARCHAR   NOT NULL,
    "latitude" VARCHAR   NOT NULL,
    "longitude" VARCHAR   NOT NULL,
    "city" VARCHAR   NOT NULL,
    CONSTRAINT "pk_State_Data" PRIMARY KEY (
        "state"
     )
);

CREATE TABLE "Voter_Registration" (
    "state" VARCHAR   NOT NULL,
    "voting_registration" VARCHAR   NOT NULL
);

ALTER TABLE "Voting_Data_by_Sex_Race_for_States" ADD CONSTRAINT "fk_Voting_Data_by_Sex_Race_for_States_state" FOREIGN KEY("state")
REFERENCES "Voting_Data_by_Age_for_States" ("state");

ALTER TABLE "Voting_Data_by_Age_for_States" ADD CONSTRAINT "fk_Voting_Data_by_Age_for_States_state" FOREIGN KEY("state")
REFERENCES "State_Data" ("state");

ALTER TABLE "State_Data" ADD CONSTRAINT "fk_State_Data_state" FOREIGN KEY("state")
REFERENCES "Voter_Registration" ("state");

