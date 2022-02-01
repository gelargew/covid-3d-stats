# %%
import requests
import pandas as pd
import json


data = requests.get('https://disease.sh/v3/covid-19/countries')
data = json.loads(data.text)
df = pd.json_normalize(data)
countries = df['country'].to_list()
countries = list(dict.fromkeys(countries))




# %%
with open("countries.json", "w") as f:
    data = json.dumps(countries)
    f.write(data)

# %%
