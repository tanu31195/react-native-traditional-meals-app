import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

import { COLORS } from "../constants";
import ContactCard from "../components/ContactCard";
import useFetch from "../hook/useFetch";
import { VERSION } from "../constants/messages";

export default function AboutScreen() {
  const { data: contactData } = useFetch("contact", {});

  return (
    <View style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.appIcon} />
      <Text style={styles.text}>Version {VERSION}</Text>
      {contactData?.map((item) => (
        <ContactCard key={item.id} contactItem={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  appIcon: {
    width: 170,
    height: 170,
    borderRadius: 20,
  },
  text: {
    margin: 1,
    fontWeight: "bold",
  },
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
});
