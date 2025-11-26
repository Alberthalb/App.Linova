import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../hooks/useThemeColors";
import { spacing, typography, radius } from "../../styles/theme";

const TermsScreen = () => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Termos de Uso</Text>
        <Text style={styles.paragraph}>
          Bem-vindo à Linova. Ao utilizar nosso aplicativo, você concorda com estes Termos de Uso. Leia-os com atenção.
        </Text>
        <Text style={styles.subheading}>1. Uso do aplicativo</Text>
        <Text style={styles.paragraph}>
          O app é destinado ao estudo de idiomas. Não é permitido copiar, redistribuir ou usar os conteúdos para fins ilícitos.
        </Text>
        <Text style={styles.subheading}>2. Conta e segurança</Text>
        <Text style={styles.paragraph}>
          Você é responsável por manter a confidencialidade de suas credenciais. Avise-nos se notar uso não autorizado da sua conta.
        </Text>
        <Text style={styles.subheading}>3. Pagamentos</Text>
        <Text style={styles.paragraph}>
          Se houver serviços pagos, os valores, prazos e condições serão informados antes da contratação.
        </Text>
        <Text style={styles.subheading}>4. Privacidade</Text>
        <Text style={styles.paragraph}>
          Tratamos seus dados de acordo com nossa Política de Privacidade. Consulte-a para saber como coletamos e usamos informações.
        </Text>
        <Text style={styles.subheading}>5. Limitação de responsabilidade</Text>
        <Text style={styles.paragraph}>
          O app é fornecido "como está". Podemos alterar, suspender ou encerrar funcionalidades sem aviso prévio, respeitando a
          legislação aplicável.
        </Text>
        <Text style={styles.subheading}>6. Contato</Text>
        <Text style={styles.paragraph}>Para dúvidas sobre estes Termos, entre em contato pelo suporte informado no aplicativo.</Text>
      </ScrollView>
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
      paddingHorizontal: spacing.layout,
      paddingVertical: spacing.layout,
      gap: spacing.md,
    },
    heading: {
      fontSize: typography.heading,
      fontFamily: typography.fonts.heading,
      color: colors.primary,
    },
    subheading: {
      fontSize: typography.subheading,
      fontFamily: typography.fonts.heading,
      color: colors.text,
      marginTop: spacing.sm,
    },
    paragraph: {
      fontSize: typography.body,
      fontFamily: typography.fonts.body,
      color: colors.text,
      lineHeight: 22,
      backgroundColor: colors.surface,
      padding: spacing.md,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
  });

export default TermsScreen;
