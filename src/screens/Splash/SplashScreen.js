import React, { useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, ImageBackground, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { typography } from "../../styles/theme";
import { useThemeColors } from "../../hooks/useThemeColors";

const SplashScreen = ({ navigation }) => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(textTranslate, { toValue: 0, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation, logoOpacity, logoScale, textOpacity, textTranslate]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <ImageBackground source={require("../../../assets/Background Splash.png")} style={styles.background} resizeMode="cover">
        <View style={styles.container}>
          <Animated.Image
            source={require("../../../assets/Logotipo Branco.png")}
            style={[styles.logo, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
            resizeMode="contain"
          />
          <Animated.Text
            style={[
              styles.subtitle,
              {
                opacity: textOpacity,
                transform: [{ translateY: textTranslate }],
              },
            ]}
          >
            A forma mais facil e prazerosa de aprender um novo idioma.
          </Animated.Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    background: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      paddingHorizontal: 24,
    },
    subtitle: {
      fontSize: 16,
      color: "#FFFFFF",
      textAlign: "center",
      fontFamily: "Manrope_400Regular",
      width: 282,
    },
    logo: {
      width: 282,
      height: undefined,
      aspectRatio: 282 / 84,
    },
  });

export default SplashScreen;
