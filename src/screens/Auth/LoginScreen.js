import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { AppContext } from "../../navigation/AppNavigator";
import { colors, spacing, typography } from "../../styles/theme";

const LoginScreen = ({ navigation }) => {
  const { setLevel } = useContext(AppContext);
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
      setLoading(false);
      navigation.replace("LevelQuiz");
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.hero}>
          <Image source={require("../../../assets/Logotipo.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Bem-vindo a Linova</Text>
          <Text style={styles.subtitle}>Entre e continue sua jornada</Text>
        </View>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8A8A8A"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#8A8A8A"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <CustomButton title="Entrar" onPress={handleLogin} loading={loading} />
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={styles.linkWrapper}>
            <Text style={styles.link}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.footerLinkWrapper}>
          <Text style={styles.footerText}>Ainda nao tem uma conta? </Text>
          <Text style={[styles.footerText, styles.link]}>Cadastre-se.</Text>
        </TouchableOpacity>
        <Text style={styles.notice}>Aplicativo em versao de testes. Erros podem acontecer.</Text>
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    justifyContent: "flex-start",
    gap: spacing.md,
  },
  hero: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.heading + 4,
    fontWeight: "700",
    color: colors.primary,
    fontFamily: typography.fonts.heading,
  },
  logo: {
    width: 140,
    height: 40,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.subheading,
    color: colors.muted,
    marginBottom: spacing.xl,
    fontFamily: typography.fonts.body,
  },
  card: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    backgroundColor: colors.gray,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: typography.body,
    color: colors.text,
    fontFamily: typography.fonts.body,
  },
  linkWrapper: {
    alignSelf: "flex-end",
  },
  link: {
    color: colors.primary,
    fontWeight: "600",
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
  notice: {
    marginTop: spacing.md,
    fontSize: typography.small,
    color: colors.muted,
    fontFamily: typography.fonts.body,
    textAlign: "center",
  },
});

export default LoginScreen;
