import { ScrollView, StyleSheet, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { COLORS } from "../../constants";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";
import Input from "../UI/Input";

export default function PlaceForm({ onSavePlace }) {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const [inputValues, setInputValues] = useState({
    enteredTitle: "",
    enteredDescription: "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(
      inputValues.enteredTitle,
      inputValues.enteredDescription,
      selectedImage,
      selectedLocation
    );
    onSavePlace(placeData);
  }
  return (
    <ScrollView style={styles.form}>
      <Input
        label='Title'
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "enteredTitle"),
          value: inputValues.enteredTitle,
          selectionColor: COLORS.primary,
          autoCorrect: false,
        }}
      />
      <Input
        label='Description'
        textInputConfig={{
          multiLine: true,
          onChangeText: inputChangedHandler.bind(this, "enteredDescription"),
          value: inputValues.enteredDescription,
          selectionColor: COLORS.primary,
        }}
      />
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
});
