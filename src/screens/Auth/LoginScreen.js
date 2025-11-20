import React, { useContext, useMemo, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { AppContext } from "../../context/AppContext";
import { spacing, typography, radius } from "../../styles/theme";
import { getDisplayName } from "../../utils/userName";
import { useThemeColors } from "../../hooks/useThemeColors";

const LoginScreen = ({ navigation }) => {
  const { setLevel, setUserName, userName, setUserEmail } = useContext(AppContext);
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos obrigatorios", "Preencha email e senha para continuar.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLevel(null); // reset onboarding level for a fresh start
      const derivedName = getDisplayName(null, email, userName);
      setUserName(derivedName);
      setUserEmail(email);
      setLoading(false);
      navigation.replace("MainTabs");
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={styles.container}
          overScrollMode="always"
          bounces
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.heroTop}>
              <Image source={require("../../../assets/Logotipo Branco.png")} style={styles.logo} resizeMode="contain" />
              <View style={styles.badge}>
                <Feather name="zap" size={14} color="#FFFFFF" />
                <Text style={styles.badgeText}>Beta</Text>
              </View>
            </View>
            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.subtitle}>Entre e continue sua jornada</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>Email</Text>
              <Feather name="mail" size={16} color={theme.muted} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8A8A8A"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.fieldHeader}>
              <Text style={styles.fieldLabel}>Senha</Text>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.fieldAction}>Esqueci</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#8A8A8A"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <CustomButton title="Entrar" onPress={handleLogin} loading={loading} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.footerLinkWrapper}>
            <Text style={styles.footerText}>Ainda nao tem uma conta? </Text>
            <Text style={[styles.footerText, styles.link]}>Cadastre-se.</Text>
          </TouchableOpacity>
          <Text style={styles.notice}>Aplicativo em versao de testes. Erros podem acontecer.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    flex: {
      flex: 1,
    },
    safe: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: spacing.layout,
      paddingVertical: spacing.layout,
      paddingBottom: spacing.layout * 1.5,
      justifyContent: "flex-start",
      gap: spacing.md,
    },
    hero: {
      gap: spacing.xs,
      marginBottom: spacing.lg,
      padding: spacing.lg,
      borderRadius: radius.lg,
      backgroundColor: theme.primary,
      shadowColor: theme.cardShadow,
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.accent,
    },
    title: {
      fontSize: typography.heading + 4,
      fontWeight: "700",
      color: "#FFFFFF",
      fontFamily: typography.fonts.heading,
    },
    logo: {
      width: 102,
      height: undefined,
      aspectRatio: 102 / 34,
      marginBottom: 0,
    },
    subtitle: {
      fontSize: typography.subheading,
      color: "rgba(255,255,255,0.9)",
      marginBottom: spacing.sm,
      fontFamily: typography.fonts.body,
    },
    card: {
      width: "100%",
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: spacing.lg,
      gap: spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.cardShadow,
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    input: {
      backgroundColor: theme.gray,
      borderRadius: 12,
      padding: spacing.md,
      fontSize: typography.body,
      color: theme.text,
      fontFamily: typography.fonts.body,
    },
    linkWrapper: {
      alignSelf: "flex-end",
    },
    link: {
      color: theme.primary,
      fontWeight: "600",
      fontFamily: typography.fonts.body,
    },
    footerLinkWrapper: {
      flexDirection: "row",
      marginTop: spacing.lg,
    },
    footerText: {
      fontSize: typography.body,
      color: theme.text,
      fontFamily: typography.fonts.body,
    },
    notice: {
      marginTop: spacing.md,
      fontSize: typography.small,
      color: theme.muted,
      fontFamily: typography.fonts.body,
      textAlign: "center",
    },
    fieldHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    fieldLabel: {
      color: theme.text,
      fontFamily: typography.fonts.body,
      fontWeight: "600",
    },
    fieldAction: {
      color: theme.primary,
      fontWeight: "700",
    },
    heroTop: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: "rgba(255,255,255,0.25)",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: radius.sm,
    },
    badgeText: {
      color: "#FFFFFF",
      fontSize: typography.small,
      fontFamily: typography.fonts.body,
    },
  });

export default LoginScreen;
