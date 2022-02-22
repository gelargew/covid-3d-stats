# %%
import json
from pathlib import Path
import os
import requests

BASE_DIR = Path(__file__).resolve().parent.parent


with open(os.path.join(BASE_DIR, 'covid_data', 'countries_info.json'), 'r') as f:
    countries = json.load(f)

ls = ','.join([country for country in countries])
url = f'https://disease.sh/v3/covid-19/historical/{ls}?lastdays=30'
data = requests.get(url)
data = json.loads(data.text)

# %%
for country in data:    
    if country:
        try:
            country_name = country['country']
            output = {
                'cases': country['timeline']['cases'],
                'deaths': country['timeline']['deaths']
            }
            filename = countries[country_name]['slug']
            with open(os.path.join(BASE_DIR, 'covid_data', 'historical_all', f'{filename}.json'), 'w') as f:
                json.dump(output, f, indent=4)
        except (ValueError, KeyError):
            continue       





