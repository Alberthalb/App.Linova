import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { AppContext } from "../../navigation/AppNavigator";
import { colors, spacing, typography } from "../../styles/theme";

const HomeScreen = ({ navigation }) => {
  const { level } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.welcome}>Ola!</Text>
          <Text style={styles.subtitle}>Seu nivel atual: {level || "Beginner (mock)"}</Text>
        </View>
        <View style={styles.card}>
          <CustomButton title="Aulas" onPress={() => navigation.navigate("LessonList")} />
          <TouchableOpacity style={[styles.fakeButton, styles.spaced]} activeOpacity={0.85}>
            <Text style={styles.fakeButtonText}>Conversacao IA (visual)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    gap: spacing.lg,
    justifyContent: "flex-start",
  },
  hero: {
    gap: spacing.xs,
  },
  welcome: {
    fontSize: typography.heading + 2,
    fontWeight: "700",
    color: colors.primary,
    fontFamily: typography.fonts.heading,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.muted,
    fontFamily: typography.fonts.body,
  },
  card: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  fakeButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  fakeButtonText: {
    fontSize: typography.body,
    color: colors.text,
    fontWeight: "600",
    fontFamily: typography.fonts.body,
  },
  spaced: {
    marginTop: spacing.sm,
  },
});

export default HomeScreen;
