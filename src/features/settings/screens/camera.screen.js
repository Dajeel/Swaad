import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useContext, useRef } from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const GrantButton = styled.TouchableOpacity`
  margin-top: ${(props) => props.theme.space[3]};
`;

const FullScreenTouchable = styled.TouchableOpacity`
  flex: 1;
`;

const ProfileCamera = styled(CameraView)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const { user } = useContext(AuthenticationContext);

  const snap = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      await AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.navigate("Settings", {
        screen: "SettingsScreen",
      });
    }
  };

  if (!permission) {
    // Permissions are still loading
    return <Container />;
  }

  if (!permission.granted) {
    // Permission not granted yet
    return (
      <Container>
        <Text>We need your permission to show the camera</Text>
        <GrantButton onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </GrantButton>
      </Container>
    );
  }

  return (
    <FullScreenTouchable onPress={snap}>
      <ProfileCamera ref={cameraRef} facing="front" />
    </FullScreenTouchable>
  );
};
