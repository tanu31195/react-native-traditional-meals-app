import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export default function ContactCard({ contactItem }) {
  const openUrl = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.component}>
      <View style={styles.icon}>
        <Ionicons name={contactItem?.icon} size={40} color={COLORS.tertiary} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.text}>{contactItem?.text}</Text>
        <TouchableOpacity onPress={() => openUrl(contactItem.url)}>
          <Text style={styles.link}>{contactItem.urlText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    height: 60,
    width: "90%",
    padding: 5,
    marginTop: 10,
    flexDirection: "row",
    borderColor: COLORS.tertiary,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    flex: 1,
  },
  contactInfo: {
    flex: 7,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  text: {
    fontWeight: 'bold'
  }
});
