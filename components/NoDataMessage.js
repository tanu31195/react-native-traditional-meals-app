import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants';

export default function NoDataMessage({children}) {
  return (
    <View style={styles.rootContainer}>
        <Text style={styles.text}>{children}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.tertiary,
    textAlign: 'center'
  },
});