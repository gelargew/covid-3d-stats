# %%
import json
from pathlib import Path
import os
import requests

BASE_DIR = Path(__file__).resolve().parent.parent


with open(os.path.join(BASE_DIR, 'covid_data', 'countries_info.json'), 'r') as f:
    countries = json.load(f)

ls = ','.join([country for country in countries])
url = f'https://disease.sh/v3/covid-19/historical/{ls}?lastdays=360'
data = requests.get(url)
data = json.loads(data.text)

# %%
historical_all = {}
for country in data:    
    if country:
        try:
            country_name = country['country']
            historical_all[country_name] = {
                'cases': country['timeline']['cases'],
                'deaths': country['timeline']['deaths']
            }
        except (ValueError, KeyError):
            continue       


# %%
with open(os.path.join(BASE_DIR, 'covid_data', 'historical_all.json'), 'w') as f:
    json.dump(historical_all, f, indent=4)



