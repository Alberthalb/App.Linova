import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../hooks/useThemeColors";
import { spacing, typography, radius } from "../../styles/theme";

const PrivacyScreen = () => {
  const colors = useThemeColors();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Política de Privacidade</Text>
        <Text style={styles.paragraph}>
          Esta Política descreve como coletamos, usamos e protegemos suas informações no aplicativo Linova.
        </Text>
        <Text style={styles.subheading}>1. Dados coletados</Text>
        <Text style={styles.paragraph}>
          Coletamos dados de conta (nome, email) e uso (progresso em aulas e quizzes). Podemos coletar informações de dispositivo
          conforme necessário para melhorar o serviço.
        </Text>
        <Text style={styles.subheading}>2. Uso dos dados</Text>
        <Text style={styles.paragraph}>
          Usamos seus dados para autenticar, sincronizar progresso, personalizar sua experiência e oferecer suporte.
        </Text>
        <Text style={styles.subheading}>3. Compartilhamento</Text>
        <Text style={styles.paragraph}>
          Não vendemos seus dados. Podemos compartilhá-los apenas com provedores necessários ao funcionamento do app e conforme
          exigido por lei.
        </Text>
        <Text style={styles.subheading}>4. Segurança</Text>
        <Text style={styles.paragraph}>
          Aplicamos práticas de segurança para proteger suas informações, mas nenhum sistema é 100% seguro. Mantenha suas
          credenciais em sigilo.
        </Text>
        <Text style={styles.subheading}>5. Seus direitos</Text>
        <Text style={styles.paragraph}>
          Você pode solicitar acesso, atualização ou exclusão de seus dados pelo suporte disponível no app.
        </Text>
        <Text style={styles.subheading}>6. Contato</Text>
        <Text style={styles.paragraph}>Em caso de dúvidas sobre esta Política, entre em contato com o suporte da Linova.</Text>
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

export default PrivacyScreen;
