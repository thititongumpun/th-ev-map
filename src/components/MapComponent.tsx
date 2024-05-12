import { useMemo, useState } from "react";
import Map, {
  Marker,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  Popup,
} from "react-map-gl";
import { LatLng } from "../types/LatLng";
import { Box, Typography } from "@mui/material";

import Pin from "./Pin";
import { Result } from "../types/ApiResponse";
import { useQuery } from "react-query";
import { getStations } from "../lib/getStation";

type Props = {
  latLng?: LatLng;
  lat?: number | undefined;
  lng?: number | undefined;
};

function MapComponent({ lat, lng }: Props) {
  const [viewState, setViewport] = useState({
    latitude: lat as number,
    longitude: lng as number,
    zoom: 14,
  });

  const { data } = useQuery("stations", () =>
    getStations({ lat: lat as number, lng: lng as number })
  );

  const [popupInfo, setPopupInfo] = useState<Result | null>(null);

  const pins = useMemo(
    () =>
      data?.results.map((result, index) => (
        <Marker
          key={`marker-${index}`}
          latitude={result.position.lat}
          longitude={result.position.lon}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(result as Result);
          }}
        >
          <Pin size={20} />
        </Marker>
      )),
    [data?.results]
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Map
        {...viewState}
        mapLib={import("mapbox-gl")}
        onMove={(evt) => setViewport(evt.viewState)}
        mapboxAccessToken={import.meta.env.VITE_MAPBOXACCESS_TOKEN}
        style={{ height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          latitude={lat as number}
          longitude={lng as number}
          anchor="center"
        >
          <img src="/car.png" width={50} height={50} />
        </Marker>

        <GeolocateControl
          position="top-left"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation
        />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            latitude={Number(popupInfo.position.lat)}
            longitude={Number(popupInfo.position.lon)}
            onClose={() => setPopupInfo(null)}
          >
            <Typography>{popupInfo.poi.name}</Typography>
            <Typography>{popupInfo.address.freeformAddress}</Typography>
            {popupInfo.chargingPark?.connectors &&
              popupInfo.chargingPark?.connectors.map((connector, idx) => (
                <Typography key={idx}>{connector.connectorType}</Typography>
              ))}
          </Popup>
        )}
      </Map>
    </Box>
  );
}

export default MapComponent;
