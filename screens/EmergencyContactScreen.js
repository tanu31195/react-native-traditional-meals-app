import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContactCard from "../components/ContactCard";
import useFetch from "../hook/useFetch";

export default function EmergencyContactScreen() {
  const { data } = useFetch("emergency", {});
  return (
    <View style={styles.container}>
      <Text style={styles.subTitle}>
        Here are some important emergency contact numbers for travelers in Sri
        Lanka:
      </Text>
      {data?.map((item) => (
        <ContactCard key={item.id} contactItem={item} />
      ))}
      <Text style={styles.note}>
        *It's important to note that emergency services in Sri Lanka may not
        have the same level of resources as those in developed countries, so it
        is important to be prepared and have a plan for emergency situations.
        It's also recommended to have a local sim card with enough balance and
        internet access to make emergency calls.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  note: {
    fontStyle: "italic",
    fontSize: 14,
    paddingTop: 20,
  },
});
