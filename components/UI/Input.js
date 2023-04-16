import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants";

export default function Input({ label, invalid, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiLine) {
    inputStyles.push(styles.multiLine);
  }
  if(invalid){
    inputStyles.push(styles.invalidInput)
  }
  return (
    <View>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
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
  invalidLabel: {
    color: COLORS.error,
  },
  invalidInput: {
    borderWidth: 5,
    borderColor: COLORS.error,
  }
});
