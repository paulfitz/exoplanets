#!/bin/bash

# this is a sketch of how to update list of planets

which csvjson || {
    sudo pip install csvkit
}

which jq || {
    sudo apt install jq
}

if [ ! -e exoplanet.eu_catalog.csv ]; then
    wget http://exoplanet.eu/catalog/csv/ -O exoplanet.eu_catalog.csv
fi

csvjson exoplanet.eu_catalog.csv | jq . > data/exoplanet.json
