# %%
import requests
import pandas as pd
import json


data = requests.get('https://disease.sh/v3/covid-19/countries')
data = json.loads(data.text)
df = pd.json_normalize(data)
ls = df.loc[:,['country', 'countryInfo.iso3', 'countryInfo.lat', 'countryInfo.long', 'countryInfo.flag']]
ls = ls.values.tolist()

countries = {}
for country in data:
    info = country['countryInfo']
    slug = '-'.join(country['country'].split())
    countries[country['country']] = {
        'iso3': info['iso3'],
        'flag': info['flag'],
        'lat': info['lat'],
        'long': info['long'],
        'slug': slug
    }


# %%
with open("countries.json", "w") as f:
    data = json.dumps(countries)
    f.write(data)

# %%
