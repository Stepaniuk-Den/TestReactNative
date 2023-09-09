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

// export const newLocation = () => {
//   const [locationAddress, setLocationAddress] = useState(null);
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         console.error("Permission to access location was denied");
//         return;
//       }

//       // const currentLocation = await Location.getCurrentPositionAsync({});
//       // setCoords(currentLocation);
//     })();
//   }, []);

//   const getLocation = async () => {
//     try {
//       const currentLocation = await Location.getCurrentPositionAsync({});
//       const address = await Location.reverseGeocodeAsync({
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//       });
//       const latitude = currentLocation.coords.latitude;
//       const longitude = currentLocation.coords.longitude;
//       setLocationAddress({
//         city: `${address[0].city}`,
//         country: `${address[0].country}`,
//       });
//       setLocation({ latitude: latitude, longitude: longitude });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return { locationAddress, location, getLocation };
// };
