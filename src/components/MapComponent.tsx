import { useState } from "react";
import Map, {
  Marker,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { LatLng } from "../types/LatLng";
import { Box } from "@mui/material";

type Props = {
  latLng?: LatLng;
  lat?: number | undefined;
  lng?: number | undefined;
};

function MapComponent({ lat, lng }: Props) {
  const [viewState, setViewState] = useState({
    longitude: 100.523186,
    latitude: 13.736717,
    zoom: 3.5,
    bearing: 0,
    pitch: 0,
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Map
        mapLib={import("mapbox-gl")}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
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

        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
      </Map>
    </Box>
  );
}

export default MapComponent;
