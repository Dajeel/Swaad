import React from "react";
import { CameraScreen } from "../../features/settings/screens/camera.screen";
import { FavouritesScreen } from "../../features/settings/screens/favourites.screen";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";

import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favourites" component={FavouritesScreen} />
      <SettingsStack.Screen name="Camera" component={CameraScreen} />
    </SettingsStack.Navigator>
  );
};
