import MapView, { Marker } from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";
import { PROVIDER_GOOGLE } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const title = route.params.title;
  const addressCountry = route.params.locationAddressCountry;
  const addressCity = route.params.locationAddressCity;
  const { latitude, longitude } = route.params.locationPhoto;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        mapType="standard"
        minZoomLevel={15}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={title}
          description={(addressCity, addressCountry)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "100%",
    // width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
  },
});

export default MapScreen;
