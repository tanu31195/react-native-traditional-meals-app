import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

export default function List({ data }) {
  return data?.map((item) => (
    <View key={item} style={styles.listItem}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: COLORS.tertiary,
    textAlign: "center",
  },
});
