import { Alert, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import OutlinedButton from "../UI/OutlinedButton";

export default function ImagePicker() {
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
  }

  return (
    <View>
      <OutlinedButton icon='camera' onPress={takeImageHandler}>
        {image ? "Re-take Photo" : "Take Photo"}{" "}
      </OutlinedButton>
      <View style={styles.container}>
        {image && <Image style={styles.image} source={{ uri: image }} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
