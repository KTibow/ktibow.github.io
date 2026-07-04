cd src/pages/blog/ghostbuses/data

curl -s https://s3.amazonaws.com/kcm-alerts-realtime-prod/tripupdates.pb -o king.tripupdates.pb &
curl -s https://s3.amazonaws.com/kcm-alerts-realtime-prod/vehiclepositions.pb -o king.vehiclepositions.pb &
curl -s "https://api.pugetsound.onebusaway.org/api/gtfs_realtime/trip-updates-for-agency/1.pb?key=5654bb33-edab-4322-8688-94b9d262abe4&removeAgencyIds=false" -o oba.tripupdates.pb &
curl -s "https://api.pugetsound.onebusaway.org/api/gtfs_realtime/vehicle-positions-for-agency/1.pb?key=5654bb33-edab-4322-8688-94b9d262abe4&removeAgencyIds=false" -o oba.vehiclepositions.pb &
curl -s "https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_10914.json?key=5654bb33-edab-4322-8688-94b9d262abe4&minutesAfter=240" -o oba.json &
curl -s https://metro.kingcounty.gov/GTFS/google_transit.zip -o gtfs.zip &
curl -s "https://external.transitapp.com/v4/public/stop_departures?global_stop_ids=KCM:89363&max_num_departures=10" -H "apiKey: $TRANSIT_KEY" -o transit.json

wait
date

unzip -o gtfs.zip
rm gtfs.zip
