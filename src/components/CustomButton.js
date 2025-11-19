import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { spacing, typography, radius } from "../styles/theme";
import { useThemeColors } from "../hooks/useThemeColors";

const CustomButton = ({ title, onPress, disabled = false, loading = false, style, variant = "primary" }) => {
  const colors = useThemeColors();
  const isPrimary = variant === "primary";
  const Container = isPrimary ? LinearGradient : TouchableOpacity;

  const content = loading ? (
    <ActivityIndicator color={isPrimary ? colors.background : colors.primary} />
  ) : (
    <Text style={[styles.title, !isPrimary && { color: colors.primary }]}>{title}</Text>
  );

  if (isPrimary) {
    return (
      <TouchableOpacity style={[styles.touchable, style]} onPress={onPress} activeOpacity={0.9} disabled={disabled || loading}>
        <Container colors={[colors.primary, colors.accent]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.button, disabled && styles.disabled]}>
          {content}
        </Container>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, styles.ghost, { borderColor: colors.primary }, disabled ? styles.disabled : null, style]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled || loading}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: radius.md,
    overflow: "hidden",
  },
  button: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: typography.body,
    fontWeight: "600",
    letterSpacing: 0.3,
    fontFamily: typography.fonts.button,
  },
  disabled: {
    opacity: 0.6,
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
});

export default CustomButton;
