import { Alert, ScrollView, StyleSheet, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { COLORS } from "../../constants";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/place";
import Input from "../UI/Input";

export default function PlaceForm({ onSavePlace }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [inputValues, setInputValues] = useState({
    enteredTitle: { value: "", isValid: true },
    enteredDescription: { value: "", isValid: true },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value: enteredValue, isValid: true },
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
      inputValues.enteredTitle.value,
      inputValues.enteredDescription.value,
      selectedImage,
      selectedLocation
    );

    const titleIsValid = placeData.title.trim().length > 0;
    const descriptionIsValid = placeData.description.trim().length > 0;

    if (!titleIsValid || !descriptionIsValid) {
      Alert.alert(
        "Invalid Values",
        "Please check if entered values are valid..."
      );
      setInputValues((curInputs) => {
        return {
          enteredTitle: {
            value: curInputs.enteredTitle.value,
            isValid: titleIsValid,
          },
          enteredDescription: {
            value: curInputs.enteredDescription.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSavePlace(placeData);
  }

  const formIsInvalid =
    !inputValues.enteredTitle.isValid ||
    !inputValues.enteredDescription.isValid;

  return (
    <ScrollView style={styles.form}>
      <Input
        label='Title'
        invalid={!inputValues.enteredTitle.isValid}
        textInputConfig={{
          onChangeText: inputChangedHandler.bind(this, "enteredTitle"),
          value: inputValues.enteredTitle.value,
          selectionColor: COLORS.primary,
          autoCorrect: false,
        }}
      />
      <Input
        label='Description'
        invalid={!inputValues.enteredDescription.isValid}
        textInputConfig={{
          multiLine: true,
          onChangeText: inputChangedHandler.bind(this, "enteredDescription"),
          value: inputValues.enteredDescription.value,
          selectionColor: COLORS.primary,
        }}
      />
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />

      <Text>{selectedLocation?.address}</Text>

      {formIsInvalid && (
        <Text style={styles.errorText}>Please enter valid values</Text>
      )}
      <Button onPress={savePlaceHandler}>Add Place to Diary</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  errorText: {
    color: COLORS.error,
    textAlign: "center",
    fontWeight: "bold",
  },
});
