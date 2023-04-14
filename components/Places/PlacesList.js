import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import NoDataMessage from "../NoDataMessage";
import { MESSAGES, SCREENS } from "../../constants/messages";
import { useNavigation } from "@react-navigation/native";

export default function PlacesList({ places }) {
  const navigation = useNavigation();

  function selectPlaceHandler(id) {
    navigation.navigate(SCREENS.PLACE_DETAIL.name, { placeId: id });
  }

  if (!places || places.length === 0) {
    return <NoDataMessage>{MESSAGES.NO_PLACES}</NoDataMessage>;
  }

  return (
    <View>
      <FlatList
        style={styles.list}
        data={places.reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PlaceItem place={item} onSelect={selectPlaceHandler} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 14,
    marginRight: 7,
  },
});
