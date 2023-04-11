import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

export default function PlaceItem({ place, onSelect }) {
  return (
    <Pressable
      onPress={onSelect.bind(this, place.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.text}>{place.address}</Text>
        <Text style={styles.text}>{place.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 5,
    marginVertical: 12,
    marginRight: 7,
    backgroundColor: COLORS.cinderella,
    elevation: 2,
    shadowColor: COLORS.tertiary,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    height: 120,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    height: 120,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.tertiary,
  },
  text: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
});
