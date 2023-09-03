import { useEffect, useState } from "react";
import * as Location from "expo-location";

export const toggleVisibilityHelper = () => {
  const [showPass, setShowPass] = useState("Показати");
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => {
    if (showPass === "Показати") {
      setShowPass("Сховати");
      setVisibility(!visibility);
    } else if (showPass === "Сховати") {
      setShowPass("Показати");
      setVisibility(!visibility);
    }
  };
  return {
    showPass,
    visibility,
    toggleVisibility,
  };
};

export const newLocation = () => {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setCoords(currentLocation);
    })();
  }, []);

  const getLocation = async () => {
    try {
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude,
      });
      setLocation(`${address[0].city}, ${address[0].country}`);
    } catch (error) {
      console.log(error);
    }
  };

  return { location, coords, getLocation };
};

//////////////////////////////////////////////////
// const [coords, setCoords] = useState(null);
// const getLocation = async () => {
//     try {
//       const address = await Location.reverseGeocodeAsync({
//         latitude: coords.coords.latitude,
//         longitude: coords.coords.longitude,
//       });
//       setLocation(${address[0].city}, ${address[0].country});
//     } catch (error) {
//       console.log(error);
//     }
// };

// useEffect(() => {
//     (async () => {
//       await Location.requestForegroundPermissionsAsync();
//     })();
//     (async () => {
//       const location = await Location.getCurrentPositionAsync();
//       setCoords(location);
//     })();

//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       await MediaLibrary.requestPermissionsAsync();

//       setHasPermission(status === "granted");
//     })();
//   }, []);
