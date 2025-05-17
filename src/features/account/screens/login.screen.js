import { useContext, useState } from "react";
import { Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  AuthInput,
  ErrorContainer,
} from "../components/account.styles";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <AccountBackground>
      <AccountCover />
      <Image
        source={require("../../../../assets/images/Swaad_Black.png")}
        style={{
          marginTop: -90,
          width: 350,
          height: 200,
          resizeMode: "contain",
          marginBottom: 24,
        }}
      />
      <Animatable.View animation="fadeInUp" duration={800} delay={300}>
        <AccountContainer>
          <AuthInput
            label="E-mail"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
          <Spacer size="large">
            <AuthInput
              label="Password"
              value={password}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(p) => setPassword(p)}
            />
          </Spacer>
          {error && (
            <ErrorContainer size="large">
              <Text variant="error">{error}</Text>
            </ErrorContainer>
          )}
          <Spacer size="large">
            {!isLoading ? (
              <AuthButton
                icon="lock-open-outline"
                mode="contained"
                onPress={() => onLogin(email, password)}
              >
                Login
              </AuthButton>
            ) : (
              <ActivityIndicator animating={true} color="#2182BD" />
            )}
          </Spacer>
        </AccountContainer>
      </Animatable.View>
      <Spacer size="large">
        <AuthButton
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{ marginTop: 30 }}
        >
          Back
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
