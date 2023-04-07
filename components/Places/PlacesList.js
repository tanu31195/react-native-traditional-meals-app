import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import NoDataMessage from "../NoDataMessage";
import { MESSAGES } from "../../constants/messages";

export default function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return <NoDataMessage>{MESSAGES.NO_PLACES}</NoDataMessage>;
  }

  return (
    <View>
      <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceItem place={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
