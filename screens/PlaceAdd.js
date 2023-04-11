import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { SCREENS } from "../constants/messages";
import { insert } from "../util/database";
import { TABLES } from "../constants/sql";

export default function PlaceAdd({ navigation }) {
  async function savePlaceHandler(place) {
    await insert(TABLES.PLACES, {
      title: place.title,
      address: place.address,
      description: place.description,
      imageUri: place.imageUri,
      lat: place.location.lat,
      lng: place.location.lng,
    });
    // navigation.navigate(SCREENS.PLACES.name, { place: place });
    navigation.navigate(SCREENS.PLACES.name);
  }
  return <PlaceForm onSavePlace={savePlaceHandler} />;
}
