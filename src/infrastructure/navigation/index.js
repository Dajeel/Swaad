import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
//
