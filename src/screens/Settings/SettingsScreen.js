import React, { useContext, useMemo } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing, typography, radius } from "../../styles/theme";
import { Feather } from "@expo/vector-icons";
import { AppContext } from "../../context/AppContext";
import { useThemeColors, useIsDarkMode } from "../../hooks/useThemeColors";

const SettingsScreen = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);
  const theme = useThemeColors();
  const isDark = useIsDarkMode();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={[styles.heading, { color: theme.primary }]}>Configurações</Text>
        <Text style={[styles.subheading, { color: theme.muted }]}>Ajuste preferências gerais do aplicativo.</Text>

        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: theme.cardShadow }]}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Feather name="moon" size={18} color={theme.primary} />
              <View>
                <Text style={[styles.title, { color: theme.text }]}>Modo escuro</Text>
                <Text style={[styles.caption, { color: theme.muted }]}>Alternar tema do aplicativo.</Text>
              </View>
            </View>
            <Switch value={isDark} onValueChange={(val) => setDarkMode(val)} trackColor={{ true: theme.primary }} />
          </View>
        </View>
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
      paddingHorizontal: spacing.layout,
      paddingVertical: spacing.layout,
      gap: spacing.md,
      backgroundColor: colors.background,
    },
    heading: {
      fontSize: typography.heading + 2,
      fontFamily: typography.fonts.heading,
      color: colors.primary,
    },
    subheading: {
      fontSize: typography.body,
      fontFamily: typography.fonts.body,
      color: colors.muted,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      gap: spacing.lg,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.md,
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      flex: 1,
    },
    title: {
      fontFamily: typography.fonts.heading,
      color: colors.text,
      fontSize: typography.body,
    },
    caption: {
      fontFamily: typography.fonts.body,
      color: colors.muted,
    },
  });

export default SettingsScreen;
