import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, typography } from "../../styles/theme";

const LESSONS = [
  { id: 1, title: "Basic Greetings", level: "Beginner" },
  { id: 2, title: "Daily Activities", level: "Beginner" },
  { id: 3, title: "Advanced Grammar", level: "Advanced" },
];

const LessonListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Lesson", { lesson: item })} activeOpacity={0.85}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.level}>Nivel: {item.level}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Text style={styles.heading}>Aulas disponiveis</Text>
      <FlatList
        data={LESSONS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  heading: {
    fontSize: typography.heading,
    color: colors.primary,
    fontWeight: "700",
    marginBottom: spacing.md,
    fontFamily: typography.fonts.heading,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: typography.subheading + 1,
    fontWeight: "700",
    color: colors.text,
    fontFamily: typography.fonts.body,
  },
  level: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.muted,
    fontFamily: typography.fonts.body,
  },
});

export default LessonListScreen;
