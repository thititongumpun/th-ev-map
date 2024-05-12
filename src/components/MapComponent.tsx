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
import { Box } from "@mui/material";


import DATA from '../data.json';
import Pin from "./Pin";
import { Result } from "../types/ApiResponse";

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

  const [popupInfo, setPopupInfo] = useState<Result | null>(null);

  // "lat": 13.840764,
  //       "lon": 100.53369

  const pins = useMemo(
    () =>
      DATA.results.map((result, index) => (
        <Marker
          key={`marker-${index}`}
          latitude={result.position.lat}
          longitude={result.position.lon}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(result as Result);
          }}
        >
          <Pin size={20} />
        </Marker>
      )),
    []
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

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            latitude={Number(popupInfo.position.lat)}
            longitude={Number(popupInfo.position.lon)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.address.freeformAddress}, {popupInfo.info} |{' '}
            </div>
            <img width="100%" src={popupInfo.dist.toFixed(0)} />
          </Popup>
        )}
        
      </Map>
    </Box>
  );
}

export default MapComponent;
