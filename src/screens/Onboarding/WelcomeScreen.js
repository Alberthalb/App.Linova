import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { spacing, radius, typography } from "../../styles/theme";
import { useThemeColors } from "../../hooks/useThemeColors";

const WelcomeScreen = ({ navigation }) => {
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image source={require("../../../assets/icon.png")} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.title}>Comece a falar com confiança</Text>
          <Text style={styles.subtitle}>Descubra como a Linova pode acelerar seu inglês com rotinas simples.</Text>
        </View>
        <View style={styles.actions}>
          <CustomButton title="Começar agora" onPress={() => navigation.navigate("Register")} />
          <CustomButton title="Já tenho conta" variant="ghost" onPress={() => navigation.navigate("Login")} />
        </View>
        <Text style={styles.footer}>Ao continuar, você concorda com nossos Termos e Política de Privacidade.</Text>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: spacing.layout,
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.xl,
    },
    logoWrapper: {
      width: 140,
      height: 140,
      borderRadius: 32,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.cardShadow,
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 8,
    },
    logo: {
      width: "70%",
      height: "70%",
    },
    textContent: {
      alignItems: "center",
      gap: spacing.sm,
    },
    title: {
      fontSize: typography.heading + 6,
      fontFamily: typography.fonts.heading,
      color: colors.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: typography.body,
      color: colors.textSecondary,
      textAlign: "center",
      fontFamily: typography.fonts.body,
      lineHeight: 22,
    },
    actions: {
      width: "100%",
      gap: spacing.sm,
    },
    footer: {
      fontSize: typography.small,
      color: colors.muted,
      textAlign: "center",
      fontFamily: typography.fonts.body,
    },
  });

export default WelcomeScreen;
