import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

export default function Button({ children, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    backgroundColor: COLORS.tertiary,
    elevation: 2,
    shadowColor: COLORS.tertiary,
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 70
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.secondary,
  },
});
