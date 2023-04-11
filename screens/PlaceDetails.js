import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../components/UI/OutlinedButton";
import { COLORS } from "../constants";
import { fetchById } from "../util/database";
import { TABLES } from "../constants/sql";
import NoDataMessage from "../components/NoDataMessage";
import { SCREENS } from "../constants/messages";

export default function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();
  const selectedPlaceId = route.params.placeId;
  function showOnMapHandler() {
    navigation.navigate(SCREENS.MAP.name, {
      title: fetchedPlace.title,
      location: { lat: fetchedPlace.lat, lng: fetchedPlace.lng },
    });
  }

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchById(TABLES.PLACES, selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return <NoDataMessage>Loading Place Details...</NoDataMessage>;
  }

  return (
    <ScrollView>
      <Image source={{ uri: fetchedPlace.imageUri }} style={styles.image} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
      <Text style={styles.description}>{fetchedPlace.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 10,
  },
  address: {
    color: COLORS.tertiary,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: COLORS.tertiary,
    textAlign: "center",
    fontSize: 14,
  },
});
