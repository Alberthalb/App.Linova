import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { colors, spacing, typography, radius } from "../../styles/theme";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Campos obrigatorios", "Preencha todas as informacoes para criar sua conta.");
      return;
    }
    Alert.alert("Conta criada", "Login liberado com suas credenciais mockadas.");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <LinearGradient colors={[colors.primary, colors.accent]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroRow}>
            <Image source={require("../../../assets/Logotipo.png")} style={styles.logo} resizeMode="contain" />
            <View style={styles.badge}>
              <Feather name="award" size={14} color={colors.background} />
              <Text style={styles.badgeText}>Nova conta</Text>
            </View>
          </View>
          <Text style={styles.title}>Crie sua conta</Text>
          <Text style={styles.subtitle}>Avance para desbloquear o quiz inicial.</Text>
        </LinearGradient>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder="Nome completo" value={name} onChangeText={setName} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
          <CustomButton title="Cadastrar" onPress={handleRegister} />
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.footerLinkWrapper}>
          <Text style={styles.footerText}>Ja tem conta? </Text>
          <Text style={[styles.footerText, styles.link]}>Entrar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl + spacing.sm,
    justifyContent: "flex-start",
    gap: spacing.md,
  },
  hero: {
    gap: spacing.xs,
    padding: spacing.lg,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: typography.heading + 2,
    fontWeight: "700",
    color: colors.background,
    marginBottom: spacing.lg,
    fontFamily: typography.fonts.heading,
  },
  subtitle: {
    fontSize: typography.body,
    color: "#E8EDFF",
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    fontFamily: typography.fonts.body,
  },
  logo: {
    width: 140,
    height: 40,
    marginBottom: spacing.xs,
  },
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    backgroundColor: colors.gray,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: typography.body,
    color: colors.text,
    fontFamily: typography.fonts.body,
  },
  footerLinkWrapper: {
    flexDirection: "row",
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: typography.body,
    color: colors.text,
    fontFamily: typography.fonts.body,
  },
  link: {
    color: colors.primary,
    fontWeight: "600",
    fontFamily: typography.fonts.body,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  badgeText: {
    color: colors.background,
    fontSize: typography.small,
    fontFamily: typography.fonts.body,
  },
});

export default RegisterScreen;
