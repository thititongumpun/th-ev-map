import { useEffect, useState, lazy, Suspense } from "react";
import { socket } from "./socket";
import ConnectionManager from "./ConnectionManager";
import { useGeolocation } from "@uidotdev/usehooks";
// import { LatLng } from "./types/LatLng";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useUserLocationContext } from "./hooks/useUserLocationContext";
import LoadingSkelation from "./components/LoadingSkelation";

const MapComponent = lazy(() => import("./components/MapComponent"));
const ResponsiveAppBar = lazy(() => import("./components/Navbar"));

function App() {
  const user = useUserLocationContext();
  const userId = user?.sub?.split("|")[1];
  const [isConnected, setIsConnected] = useState(socket.connected);
  const { latitude, longitude, loading } = useGeolocation({
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  });

  // const [latLng, setLatLng] = useState<LatLng[]>([
  //   {
  //     lat: latitude,
  //     lng: longitude,
  //   },
  // ]);

  useEffect(() => {
    // if (!loading) {
    //   setLatLng([{ lat: latitude, lng: longitude }]);
    // }

    function onConnect() {
      setIsConnected(true);
      toast.success("Successfully connected");
    }

    function onDisconnect() {
      setIsConnected(false);
      toast.success("Successfully disconnected");
    }

    // function onLocationEvent(location: LatLng) {
    //   setLatLng((previous) => [...previous, location]);
    // }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.on("location", onLocationEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // socket.on("off", onLocationEvent);
    };
  }, [latitude, loading, longitude]);

  return (
    <>
      <ResponsiveAppBar />
      <p>State: {"" + isConnected}</p>
      <ConnectionManager />
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
          console.log(userId, latitude, longitude);
          socket.emit("location", { id: userId, latitude, longitude });
        }}
      >
        Send Location
      </Button>
      <Suspense fallback={<LoadingSkelation loading />}>
        <MapComponent lat={latitude as number} lng={longitude as number} />
      </Suspense>
    </>
  );
}

export default App;
