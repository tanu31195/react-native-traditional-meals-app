import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetch } from "../util/database";
import { TABLES } from "../constants/sql";

export default function Places({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetch(TABLES.PLACES);
      setLoadedPlaces(places);
    }
    // if (isFocused && route.params) {
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);
  // }, [isFocused, route]);
  return <PlacesList places={loadedPlaces} />;
}

const styles = StyleSheet.create({});
