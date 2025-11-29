import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { AppContext } from "../../context/AppContext";
import { useThemeColors } from "../../hooks/useThemeColors";
import { spacing, typography, radius } from "../../styles/theme";
import CustomButton from "../../components/CustomButton";
import { createOrUpdateUserProfile, saveModuleUnlock } from "../../services/userService";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

const FALLBACK_MODULES = [
  { id: "module-a1", title: "Modulo A1", levelTag: "A1", description: "Primeiros passos e vocabulario essencial.", order: 0 },
  { id: "module-a2", title: "Modulo A2", levelTag: "A2", description: "Rotinas e expressoes frequentes.", order: 1 },
  { id: "module-a2-plus", title: "Modulo A2+", levelTag: "A2+", description: "Mensagens curtas e leitura guiada.", order: 2 },
  { id: "module-b1", title: "Modulo B1", levelTag: "B1", description: "Conversas basicas e compreensao geral.", order: 3 },
  { id: "module-b1-plus", title: "Modulo B1+", levelTag: "B1+", description: "Comunicacao mais segura em situacoes variadas.", order: 4 },
  { id: "module-b2", title: "Modulo B2", levelTag: "B2", description: "Textos claros e discussoes com confianca.", order: 5 },
  { id: "module-b2-plus", title: "Modulo B2+", levelTag: "B2+", description: "Argumentacao e nuances em temas complexos.", order: 6 },
  { id: "module-c1", title: "Modulo C1", levelTag: "C1", description: "Linguagem flexivel em contextos profissionais.", order: 7 },
  { id: "module-c1-plus", title: "Modulo C1+", levelTag: "C1+", description: "Precisao alta em temas tecnicos e abstratos.", order: 8 },
  { id: "module-c2", title: "Modulo C2", levelTag: "C2", description: "Dominio avancado e naturalidade plena.", order: 9 },
];

const ModuleListScreen = ({ navigation }) => {
  const { modules, moduleUnlocks, selectedModuleId, setSelectedModuleId, currentUser, lessonsCompleted = {} } = useContext(AppContext);
  const theme = useThemeColors();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [pendingModule, setPendingModule] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [moduleProgress, setModuleProgress] = useState({});

  const availableModules = modules?.length ? modules : FALLBACK_MODULES;
  const firstModuleId = availableModules[0]?.id || null;

  const computeModuleProgress = useCallback((lessonList, fallbackModuleId) => {
    const summary = {};
    lessonList.forEach((lesson) => {
      const moduleId = lesson.moduleId || fallbackModuleId || "unassigned";
      if (!summary[moduleId]) {
        summary[moduleId] = { total: 0, earned: 0 };
      }
      summary[moduleId].total += 1;
      const entry = lessonsCompleted[lesson.id] || {};
      const score = Number.isFinite(entry.score) ? entry.score : Number(entry.score);
      const completed = entry.watched === true || (Number.isFinite(score) && score >= 70);
      if (completed) {
        summary[moduleId].earned += 10;
      }
    });
    Object.keys(summary).forEach((key) => {
      summary[key].required = summary[key].total * 10;
    });
    setModuleProgress(summary);
  }, [lessonsCompleted]);

  useEffect(() => {
    const lessonsRef = collection(db, "lessons");
    const unsubscribe = onSnapshot(
      lessonsRef,
      (snapshot) => {
        const list = snapshot.docs.map((docSnap, index) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data?.title || `Aula ${index + 1}`,
            moduleId: data?.moduleId || data?.module || null,
          };
        });
        setLessons(list);
        computeModuleProgress(list, availableModules[0]?.id || null);
      },
      () => {
        setLessons([]);
        setModuleProgress({});
      }
    );
    return unsubscribe;
  }, [availableModules, computeModuleProgress]);

  useEffect(() => {
    if (!lessons.length) return;
    computeModuleProgress(lessons, availableModules[0]?.id || null);
  }, [lessons, availableModules, computeModuleProgress]);

  useEffect(() => {
    if (!currentUser?.uid) return;
    Object.entries(moduleProgress).forEach(([moduleId, progress]) => {
      const entry = moduleUnlocks?.[moduleId];
      if (progress?.required > 0 && progress?.earned >= progress.required && !entry) {
        saveModuleUnlock(currentUser.uid, moduleId, { passed: true, status: "unlocked", reason: "xp" });
      }
    });
  }, [moduleProgress, moduleUnlocks, currentUser?.uid]);

  const isUnlocked = (moduleId, index) => {
    if (!moduleId) return false;
    if (index === 0 || moduleId === firstModuleId) return true;
    const entry = moduleUnlocks?.[moduleId];
    const progress = moduleProgress?.[moduleId];
    const meetsXp = progress?.required > 0 && progress?.earned >= progress.required;
    return entry?.passed === true || entry?.status === "unlocked" || meetsXp;
  };

  const handleEnterModule = async (module) => {
    if (!module?.id) {
      Alert.alert("Módulo indisponível", "Nenhum módulo cadastrado no momento.");
      return;
    }
    const moduleIndex = availableModules.findIndex((item) => item.id === module.id);
    const unlocked = isUnlocked(module.id, moduleIndex);
    if (!unlocked) {
      setPendingModule(module);
      return;
    }
    setSelectedModuleId(module.id);
    if (currentUser?.uid) {
      await createOrUpdateUserProfile(currentUser.uid, { currentModuleId: module.id });
    }
    navigation.navigate("LessonList", { moduleId: module.id });
  };

  const goToAssessment = () => {
    if (!pendingModule) return;
    navigation.navigate("ModuleAssessment", { moduleId: pendingModule.id, moduleTitle: pendingModule.title });
    setPendingModule(null);
  };

  const renderItem = ({ item, index }) => {
    const unlocked = isUnlocked(item.id, index);
    const selected = item.id === selectedModuleId;
    const progress = moduleProgress?.[item.id] || { earned: 0, required: 0 };
    return (
      <TouchableOpacity style={[styles.card, selected && styles.cardSelected]} activeOpacity={0.85} onPress={() => handleEnterModule(item)}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <Feather name="layers" size={16} color={theme.primary} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
          <View style={[styles.badge, unlocked ? styles.badgeUnlocked : styles.badgeLocked]}>
            <Feather name={unlocked ? "unlock" : "lock"} size={14} color={unlocked ? theme.background : theme.accent} />
            <Text style={[styles.badgeText, unlocked ? styles.badgeTextUnlocked : styles.badgeTextLocked]}>
              {unlocked ? "Liberado" : "Prova exigida"}
            </Text>
          </View>
        </View>
        {item.levelTag ? <Text style={styles.levelTag}>Nível sugerido: {item.levelTag}</Text> : null}
        {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
        {selected ? <Text style={styles.selectedHint}>Módulo selecionado</Text> : null}
        {!unlocked && (
          <TouchableOpacity style={styles.assessmentLink} onPress={() => setPendingModule(item)} activeOpacity={0.8}>
            <Feather name="edit-3" size={14} color={theme.accent} />
            <Text style={styles.assessmentText}>Fazer prova de capacidade</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Feather name="chevron-left" size={20} color={theme.primary} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Escolha um módulo</Text>
        <Text style={styles.subheading}>
          No primeiro acesso, inicie pelo Módulo 1. Para pular para outro módulo, conclua a prova de capacidade.
        </Text>
        <FlatList
          data={availableModules}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
          showsVerticalScrollIndicator={false}
        />
        {availableModules.length === 0 ? (
          <CustomButton title="Ver aulas" onPress={() => navigation.navigate("LessonList")} />
        ) : (
          <CustomButton
            title="Ir para aulas do módulo atual"
            onPress={() =>
              handleEnterModule(
                availableModules.find((item) => item.id === selectedModuleId) || availableModules[0] || { id: null }
              )
            }
          />
        )}
      </View>
      {pendingModule ? (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Prova de capacidade</Text>
            <Text style={styles.modalText}>
              Para acessar "{pendingModule.title}", conclua a prova rápida. Se aprovado, o módulo será liberado.
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setPendingModule(null)} style={styles.modalGhost} activeOpacity={0.8}>
                <Text style={styles.modalGhostText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToAssessment} style={styles.modalButton} activeOpacity={0.9}>
                <Text style={styles.modalButtonText}>Fazer prova</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const createStyles = (colors) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.background },
    container: {
      flex: 1,
      paddingHorizontal: spacing.layout,
      paddingVertical: spacing.layout,
      gap: spacing.sm,
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
      marginBottom: spacing.sm,
    },
    list: {
      paddingVertical: spacing.sm,
      gap: spacing.sm,
      flexGrow: 1,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.lg,
      gap: spacing.xs,
      shadowColor: colors.cardShadow,
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    cardSelected: {
      borderColor: colors.primary,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.sm,
    },
    cardTitleRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs, flex: 1 },
    cardTitle: {
      fontFamily: typography.fonts.heading,
      fontSize: typography.subheading,
      color: colors.text,
      flex: 1,
    },
    levelTag: {
      color: colors.muted,
      fontFamily: typography.fonts.body,
      fontSize: typography.small,
    },
    description: {
      color: colors.text,
      fontFamily: typography.fonts.body,
      fontSize: typography.body,
      lineHeight: 20,
    },
    selectedHint: {
      color: colors.primary,
      fontFamily: typography.fonts.body,
      fontWeight: "700",
    },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      borderRadius: radius.sm,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
    },
    badgeUnlocked: {
      backgroundColor: colors.primary,
    },
    badgeLocked: {
      backgroundColor: colors.gray,
      borderWidth: 1,
      borderColor: colors.border,
    },
    badgeText: { fontFamily: typography.fonts.body, fontSize: typography.small, fontWeight: "700" },
    badgeTextUnlocked: { color: colors.background },
    badgeTextLocked: { color: colors.accent },
    xpText: {
      color: colors.muted,
      fontFamily: typography.fonts.body,
      fontSize: typography.small,
    },
    assessmentLink: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      marginTop: spacing.xs,
    },
    assessmentText: {
      color: colors.accent,
      fontFamily: typography.fonts.body,
      fontWeight: "700",
    },
    backRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      marginBottom: spacing.sm,
    },
    backText: {
      color: colors.primary,
      fontFamily: typography.fonts.body,
      fontWeight: "600",
    },
    modalOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.lg,
    },
    modalCard: {
      width: "100%",
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      padding: spacing.lg,
      gap: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    modalTitle: {
      fontSize: typography.subheading,
      fontFamily: typography.fonts.heading,
      color: colors.text,
      fontWeight: "700",
    },
    modalText: {
      fontFamily: typography.fonts.body,
      color: colors.textSecondary,
      fontSize: typography.body,
      lineHeight: 20,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: spacing.sm,
    },
    modalButton: {
      backgroundColor: colors.accent,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: radius.sm,
    },
    modalButtonText: {
      color: colors.surface,
      fontFamily: typography.fonts.button,
      fontWeight: "700",
    },
    modalGhost: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    modalGhostText: {
      color: colors.muted,
      fontFamily: typography.fonts.body,
      fontWeight: "600",
    },
  });

export default ModuleListScreen;
