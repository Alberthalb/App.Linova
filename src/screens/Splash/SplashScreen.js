import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import { colors, typography } from "../../styles/theme";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/Logotipo.png")} style={styles.logo} resizeMode="contain" />
      <LottieView style={styles.lottie} source={require("../../assets/animations/splash.json")} autoPlay loop />
      <Text style={styles.title}>Linova</Text>
      <Text style={styles.subtitle}>A forma mais facil e prazerosa de aprender uma lingua nova.</Text>
      <Text style={styles.footer}>Aplicativo em versao de testes. Erros podem acontecer.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 160,
    height: 60,
    marginBottom: 8,
  },
  lottie: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: typography.heading + 8,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 12,
    fontFamily: typography.fonts.heading,
  },
  subtitle: {
    fontSize: typography.subheading,
    color: colors.text,
    marginTop: 4,
    textAlign: "center",
    fontFamily: typography.fonts.body,
  },
  footer: {
    fontSize: typography.small,
    color: colors.muted,
    marginTop: 12,
    textAlign: "center",
    fontFamily: typography.fonts.body,
  },
});

export default SplashScreen;
