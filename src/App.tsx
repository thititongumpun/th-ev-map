import { useEffect, useState, lazy } from "react";
import { socket } from "./socket";
import ConnectionManager from "./ConnectionManager";
import { useGeolocation } from "@uidotdev/usehooks";
import { LatLng } from "./types/LatLng";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
// import ResponsiveAppBar from "./components/Navbar";

const MapComponent = lazy(() => import("./components/MapComponent"));
const ResponsiveAppBar = lazy(() => import("./components/Navbar"));

function MessageEvent({ msgs }: { msgs: string[] }) {
  return (
    <ul>
      {msgs.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
}

function LatLngEvent({ latLng }: { latLng: LatLng[] }) {
  return (
    <ul>
      {latLng.map((event, index) => (
        <li key={index}>
          {event.lat} {event.lng}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messageEvents, setMessageEvents] = useState<string[]>([]);
  const { latitude, longitude, loading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });

  const [latLng, setLatLng] = useState<LatLng[]>([
    {
      lat: latitude,
      lng: longitude,
    },
  ]);

  useEffect(() => {
    if (!loading) {
      setLatLng([{ lat: latitude, lng: longitude }]);
    }

    function onConnect() {
      setIsConnected(true);
      toast.success("Successfully connected");
    }

    function onDisconnect() {
      setIsConnected(false);
      toast.success("Successfully disconnected");
    }

    function onMessageEvent(value: string) {
      setMessageEvents((previous) => [...previous, value]);
    }

    function onLocationEvent(location: LatLng) {
      setLatLng((previous) => [...previous, location]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("msg", onMessageEvent);
    socket.on("location", onLocationEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("msg", onMessageEvent);
      socket.on("off", onLocationEvent);
    };
  }, [latitude, loading, longitude]);

  return (
    <>
      <ResponsiveAppBar />
      <p>State: {"" + isConnected}</p>
      <ConnectionManager />
      <MessageEvent msgs={messageEvents} />
      <LatLngEvent latLng={latLng} />
      <button
        onClick={() => {
          socket.emit("msg", { message: "from client" });
        }}
      >
        Send Message
      </button>
      <Button
        variant="contained"
        onClick={() => {
          socket.emit("location", { latitude, longitude });
        }}
      >
        Send Location
      </Button>
      <MapComponent lat={latitude as number} lng={longitude as number} />
    </>
  );
}

export default App;
