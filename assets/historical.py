import requests
import json

data = requests.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
data = json.loads(data.text)

with open("historical.json", "w") as f:
    data = json.dumps(data)
    f.write(data)