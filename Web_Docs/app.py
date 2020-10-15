from sqlalchemy import create_engine
import pandas as pd
from pprint import pprint as prettyprint
import json
from flask import Flask, jsonify


# Path to sqlite
database_path = "project-2.db"
engine = create_engine(f"sqlite:///{database_path}")

tables=[]
#query the table of the 51 states and just select state names
states_table = engine.execute("SELECT state FROM lat_lng")
lat_table = engine.execute("SELECT latitude FROM lat_lng")
lng_table = engine.execute("SELECT longitude FROM lat_lng")
reg_table = engine.execute("SELECT registration FROM registration_table")


#create empty dictionary and lists
states=[]
lats=[]
lngs=[]
regs=[]

#iterate through the states and registrations tables and append corressponsing state names, latitudes, longitudes, and registration policy to the dictionary as its own key
for record in states_table:
#     print (record[0])
    states.append(record[0])
# states

for record in lat_table:
#     print (record[0])
    lats.append(record[0])
    

for record in lng_table:
#    print (record[0])
    lngs.append(record[0])

for record in reg_table:
#     print (record[0])
    regs.append(record[0])

len(states)
#uppercase all of the states in the list to make sure they match in SQL when selecting the data
states = [x.upper() for x in states] 

cit_pop=engine.execute("select state,total_citizen_population from voting_ages where age = '18 to 24' and state = 'ALABAMA'")
cit_pop
age_pop=[]
for record in cit_pop:
#      print (record[0])
     age_pop.append(record[0])

#create the list of the categories for each attribute
age_ranges=['18 to 24','25 to 34', '35 to 44', '45 to 64', '65+','Total']
genders=['Male','Female','Total']
races=['White alone','White non-Hispanice alone','Black alone','Asian alone']

#list where all of the dictionaries will go    
names=[]

#iterate through the length of the states
for i in range(len(states)):
    
    #create an empty dictionary in the current state
    dictionary={}
    
    #grab the state name
    state=states[i]
    
    #create key value pairs in our dictionary for the stat, lat, long, and registration rule
    dictionary['State']=state
    dictionary['Lat']=lats[i]
    dictionary['Lng']=lngs[i]
    dictionary['Reg']=regs[i]

    
    #for each age group in our list of age ranges..
    ages={}
    for l in range(len(age_ranges)):
         #create an empty ages dictionary
            
            agegroup = age_ranges[l]
            
            #run a query to capture the total citizen population from the ages table where each age equals the age range and the state is the current state
            age_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_ages where age = '{agegroup}' and state = '{state}'")
            #for each record result that we obtain from the query, append the record to its own value
            age_cit_pop=[record[0] for record in age_filter]
            
            age_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_ages where age = '{agegroup}' and state = '{state}'")
            age_cit_reg=[record[1] for record in age_filter]
            
            age_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_ages where age = '{agegroup}' and state = '{state}'")
            age_cit_vote=[record[2] for record in age_filter]
            
            values=[age_cit_pop, age_cit_reg, age_cit_vote]
            
            #create list for the 3 measures to loop through later
            age_metrics= ['Total Citizen Population','Percent Citizens Registered', 'Percent Citizens Voted']
            
            metrics={}
            
            #print(age_cit_pop)
            for m in range(len(age_metrics)):
        
                metrics[f'{age_metrics[m]}']=values[m]
                ages[f'{agegroup}']=metrics
    
    
            dictionary['Age']=ages
        
    genders_dict={}
    for g in range(len(genders)):
         #create an empty ages dictionary
            
            gendergroup = genders[g]
            
            #run a query to capture the total citizen population from the ages table where each age equals the age range and the state is the current state
            gender_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_sex_race where sex_race = '{gendergroup}' and state = '{state}'")
            
            #for each record result that we obtain from the query
            
            gender_cit_pop=[record[0] for record in gender_filter]
            
            gender_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_sex_race where sex_race = '{gendergroup}' and state = '{state}'")

            gender_cit_reg=[record[1] for record in gender_filter]
            
            gender_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_sex_race where sex_race = '{gendergroup}' and state = '{state}'")

            gender_cit_vote=[record[2] for record in gender_filter]
            
            gender_values=[gender_cit_pop, gender_cit_reg, gender_cit_vote]
            gender_metrics= ['Total Citizen Population','Percent Citizens Registered', 'Percent Citizens Voted']
            
            g_metrics={}
            
#             print(age_cit_pop)
            for v in range(len(gender_metrics)):
        
                g_metrics[f'{gender_metrics[v]}']=gender_values[v]
                genders_dict[f'{gendergroup}']=g_metrics
    
    dictionary['Gender']=genders_dict  
    
    races_dict={}
    
    for r in range(len(races)):
     #create an empty ages dictionary

            racesgroup = races[r]

            #run a query to capture the total citizen population from the ages table where each age equals the age range and the state is the current state
            races_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_sex_race where sex_race = '{racesgroup}' and state = '{state}'")

            #for each record result that we obtain from the query

            races_cit_pop=[record[0] for record in races_filter]

            races_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_sex_race where sex_race = '{racesgroup}' and state = '{state}'")

            races_cit_reg=[record[1] for record in races_filter]

            races_filter=engine.execute(f"select total_citizen_population, percent_registered_citizen, percent_voted_citizen from voting_sex_race where sex_race = '{racesgroup}' and state = '{state}'")

            races_cit_vote=[record[2] for record in races_filter]

            races_values=[races_cit_pop, races_cit_reg, races_cit_vote]
            races_metrics= ['Total Citizen Population','Percent Citizens Registered', 'Percent Citizens Voted']

            r_metrics={}

    #             print(age_cit_pop)
            for m in range(len(races_metrics)):

                r_metrics[f'{races_metrics[m]}']=races_values[m]
                races_dict[f'{racesgroup}']=r_metrics

    
    dictionary['Race']=races_dict
    names.append(dictionary)

app = Flask(__name__)
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/states"
    )

@app.route("/api/v1.0/states")
def voteinfo():
    return (jsonify(names))

if __name__ == "__main__":
    app.run(debug=True)
