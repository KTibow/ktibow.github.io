#!/bin/bash
cd "$(dirname "$0")"

# 1. Static Feeds (Download & unzip inline in parallel)
(mkdir -p metro && curl -sL "https://metro.kingcounty.gov/GTFS/google_transit.zip" -o metro/gtfs.zip && unzip -oq metro/gtfs.zip -d metro && rm metro/gtfs.zip) &
(mkdir -p community-transit && curl -sL "https://www.communitytransit.org/docs/default-source/open-data/gtfs/current.zip" -o community-transit/gtfs.zip && unzip -oq community-transit/gtfs.zip -d community-transit && rm community-transit/gtfs.zip) &
(mkdir -p pierce-transit && curl -sL "https://prod.piercetransit.org/GTFS/gtfs.zip" -o pierce-transit/gtfs.zip && unzip -oq pierce-transit/gtfs.zip -d pierce-transit && rm pierce-transit/gtfs.zip) &
(mkdir -p sound-transit && curl -sL "https://gtfs.sound.obaweb.org/prod/40_gtfs.zip" -o sound-transit/gtfs.zip && unzip -oq sound-transit/gtfs.zip -d sound-transit && rm sound-transit/gtfs.zip) &

# 2. Realtime Feeds (Downloaded directly to current directory in parallel)
curl -s "https://s3.amazonaws.com/kcm-alerts-realtime-prod/tripupdates.pb" -o "king.tripupdates.pb" &
curl -s "https://s3.amazonaws.com/kcm-alerts-realtime-prod/vehiclepositions.pb" -o "king.vehiclepositions.pb" &
curl -s "https://api.pugetsound.onebusaway.org/api/gtfs_realtime/trip-updates-for-agency/1.pb?key=5654bb33-edab-4322-8688-94b9d262abe4&removeAgencyIds=true" -o "oba.tripupdates.pb" &
curl -s "https://api.pugetsound.onebusaway.org/api/gtfs_realtime/vehicle-positions-for-agency/1.pb?key=5654bb33-edab-4322-8688-94b9d262abe4&removeAgencyIds=false" -o "oba.vehiclepositions.pb" &
curl -s "https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_10914.json?key=5654bb33-edab-4322-8688-94b9d262abe4&minutesAfter=240" -o "oba.json" &
curl -s -H "apiKey: $TRANSIT_KEY" "https://external.transitapp.com/v4/public/stop_departures?global_stop_ids=KCM:89363&max_num_departures=10" -o "transit.json" &

# Wait for absolutely everything to finish
wait
echo "==> Done"
date
