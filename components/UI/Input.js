import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

export default function Input({ label, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiLine) {
    inputStyles.push(styles.multiLine);
  }
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: COLORS.tertiary,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: COLORS.tertiary,
    borderBottomWidth: 2,
    backgroundColor: COLORS.cinderella,
  },
  multiLine: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
