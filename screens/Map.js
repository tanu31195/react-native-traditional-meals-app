import { Alert, StyleSheet } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { SCREENS } from "../constants/messages";
import IconButton from "../components/UI/IconButton";

export default function Map({ navigation, route }) {
  const initialLocation = route.params && {
    title: route.params.title,
    lat: route.params.location.lat,
    lng: route.params.location.lng,
  };
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation?.lat ? initialLocation?.lat : 7.8731,
    longitude: initialLocation?.lng ? initialLocation?.lng : 80.7718,
    latitudeDelta: initialLocation ? 0.1 : 2.7,
    longitudeDelta: initialLocation ? 0.1 : 2.7,
  };

  function selectLocationHandler(event) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandle = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "Please pick a location by tapping on the map first!"
      );
      return;
    }

    navigation.navigate(SCREENS.ADD_PLACE.name, {
      pickedLocation: selectedLocation,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          size={24}
          onPress={savePickedLocationHandle}
          color={tintColor}
        />
      ),
    });
  }, [navigation, savePickedLocationHandle]);
  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title={initialLocation ? initialLocation.title : "Picked Location"}
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
