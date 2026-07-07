#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# GTFS feeds that contain Sound Transit (agency 40) routes
FEEDS=(
  "metro|King County Metro|https://metro.kingcounty.gov/GTFS/google_transit.zip"
  "community-transit|Community Transit|https://www.communitytransit.org/docs/default-source/open-data/gtfs/current.zip"
  "pierce-transit|Pierce Transit|https://prod.piercetransit.org/GTFS/gtfs.zip"
  "sound-transit|Sound Transit|https://gtfs.sound.obaweb.org/prod/40_gtfs.zip"
)

for feed in "${FEEDS[@]}"; do
  IFS='|' read -r dir name url <<< "$feed"
  echo "==> $name -> $dir"

  mkdir -p "$dir"
  curl -sL "$url" -o "$dir/gtfs.zip"
  unzip -o -d "$dir" "$dir/gtfs.zip" > /dev/null
  rm "$dir/gtfs.zip"
done

# ============================================================
# Old stuff below — uncomment if you need realtime data etc.
# ============================================================
# cd src/pages/blog/ghostbuses/data
#
# curl -s https://s3.amazonaws.com/kcm-alerts-realtime-prod/tripupdates.pb -o king.tripupdates.pb &
# curl -s https://s3.amazonaws.com/kcm-alerts-realtime-prod/vehiclepositions.pb -o king.vehiclepositions.pb &
# curl -s "https://api.pugetsound.onebusaway.org/api/gtfs_realtime/trip-updates-for-agency/1.pb?key=5654bb33-edab-4322-8688-94b9d262abe4&removeAgencyIds=false" -o oba.tripupdates.pb &
# curl -s "https://api.pugetsound.onebusaway.org/api/gtfs_realtime/vehicle-positions-for-agency/1.pb?key=5654bb33-edab-4322-8688-94b9d262abe4&removeAgencyIds=false" -o oba.vehiclepositions.pb &
# curl -s "https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_10914.json?key=5654bb33-edab-4322-8688-94b9d262abe4&minutesAfter=240" -o oba.json &
# curl -s https://metro.kingcounty.gov/GTFS/google_transit.zip -o gtfs.zip &
# curl -s "https://external.transitapp.com/v4/public/stop_departures?global_stop_ids=KCM:89363&max_num_departures=10" -H "apiKey: $TRANSIT_KEY" -o transit.json
#
# wait
# date
#
# unzip -o gtfs.zip
# rm gtfs.zip

echo "==> Done"
date
