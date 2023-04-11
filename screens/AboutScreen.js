import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants";
import ContactCard from "../components/ContactCard";
import useFetch from "../hook/useFetch";
import { VERSION_TEXT } from "../constants/messages";

export default function AboutScreen() {
  const { data: contactData } = useFetch("contact", {});

  return (
    <View style={styles.container}>
      <Image source={require("../assets/icon.png")} style={styles.appIcon} />
      <Text style={styles.text}>{VERSION_TEXT}</Text>
      {contactData?.map((item) => (
        <ContactCard key={item.id} contactItem={item} />
      ))}
      <Text style={styles.text}>Made with <Ionicons size={25} name="logo-react" color={COLORS.tertiary} /></Text>
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
    borderColor: COLORS.tertiary,
    borderWidth: 2
  },
  text: {
    margin: 1,
    fontWeight: "bold",
  },
});
