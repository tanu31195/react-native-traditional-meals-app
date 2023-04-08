import { Alert, StyleSheet } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { SCREENS } from "../constants/messages";
import IconButton from "../components/UI/IconButton";

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 7.8731,
    longitude: 80.7718,
    latitudeDelta: 2.7,
    longitudeDelta: 2.7,
  };

  function selectLocationHandler(event) {
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
          title='Picked Location'
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
