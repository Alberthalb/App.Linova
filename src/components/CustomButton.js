import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from "react-native";
import { spacing, typography, radius } from "../styles/theme";
import { useThemeColors } from "../hooks/useThemeColors";

const CustomButton = ({ title, onPress, disabled = false, loading = false, style, variant = "primary" }) => {
  const colors = useThemeColors();
  const isPrimary = variant === "primary";

  const content = loading ? (
    <ActivityIndicator color={isPrimary ? colors.background : colors.accent} />
  ) : (
    <Text style={[styles.title, !isPrimary && { color: colors.accent }]}>{title}</Text>
  );

  const buttonStyle = [
    styles.button,
    isPrimary ? { backgroundColor: colors.accent } : [styles.ghost, { borderColor: colors.accent }],
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress} activeOpacity={0.9} disabled={disabled || loading}>
      <View style={buttonStyle}>{content}</View>
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
