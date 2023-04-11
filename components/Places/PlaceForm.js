import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import { COLORS } from "../../constants";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";

export default function PlaceForm({ onSavePlace }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  function changeDescriptionHandler(enteredText) {
    setEnteredDescription(enteredText);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(
      enteredTitle,
      enteredDescription,
      selectedImage,
      selectedLocation
    );
    onSavePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          selectionColor={COLORS.primary}
        />
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeDescriptionHandler}
          value={enteredDescription}
          multiline
          selectionColor={COLORS.primary}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Text>{selectedLocation?.address}</Text>
      <Button onPress={savePlaceHandler}>Add Place to Diary</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
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
});
