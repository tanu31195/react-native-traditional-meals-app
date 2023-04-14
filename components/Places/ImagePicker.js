import { Alert, Image, StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
  PermissionStatus,
} from "expo-image-picker";
import OutlinedButton from "../UI/OutlinedButton";
import { COLORS } from "../../constants";

export default function ImagePicker({ onTakeImage }) {
  const [image, setImage] = useState();
  const [cameraPermissionsInformation, requestPermission] =
    useCameraPermissions();
  async function verifyPermissions() {
    if (cameraPermissionsInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionsInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permissions to use the Travel Diary"
      );
      return false;
    }

    return true;
  }
  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text>Photo not captured yet.</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon='camera' onPress={takeImageHandler}>
        {image ? "Re-take Photo" : "Take Photo"}{" "}
        </OutlinedButton>
        {/* TODO: Add image picker */}
        <OutlinedButton icon='images' onPress={takeImageHandler}>
          Pick from Gallery
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: COLORS.cinderella,
    marginVertical: 10,
    borderColor: COLORS.tertiary,
    borderWidth: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
