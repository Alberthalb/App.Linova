import React, { useContext, useMemo, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import { AppContext } from "../../context/AppContext";
import { spacing, typography, radius } from "../../styles/theme";
import { getDisplayName } from "../../utils/userName";
import { useThemeColors, useIsDarkMode } from "../../hooks/useThemeColors";
import { defaultSummaryStats } from "../../utils/progressStats";
import { normalizeLevel, LEVEL_SEQUENCE } from "../../utils/levels";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

const min100 = (value) => Math.max(0, Math.min(100, value));

const levelDescriptions = {
  A1: "Entende frases muito simples e vocabulario inicial.",
  A2: "Consegue lidar com rotinas e expressoes frequentes.",
  "A2+": "Le e escreve mensagens curtas com mais confianca.",
  B1: "Sustenta conversas basicas e entende o essencial em textos.",
  "B1+": "Comunica-se em situacoes variadas com poucos deslizes.",
  B2: "Produz textos claros e participa de discussoes com seguranca.",
  "B2+": "Argumenta e compreende nuances em temas mais complexos.",
  C1: "Usa linguagem flexivel e eficaz em contextos sociais e profissionais.",
  "C1+": "Navega temas abstratos e tecnicos com alta precisao.",
  C2: "Domina o idioma em nivel avancado e natural.",
};

const HomeScreen = ({ navigation }) => {
  const { level, userName, setDarkMode, authReady, progressStats, selectedModuleId, lessonsCompleted = {} } =
    useContext(AppContext);
  const displayName = authReady && userName ? getDisplayName(userName, null, "Linova") : "";
  const [isIaModalVisible, setIaModalVisible] = useState(false);
  const [statInfo, setStatInfo] = useState(null);
  const [levelInfo, setLevelInfo] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lessonsMeta, setLessonsMeta] = useState({});
  const [moduleLessonCounts, setModuleLessonCounts] = useState({});
  const stats = progressStats || defaultSummaryStats;
  const theme = useThemeColors();
  const isDarkMode = useIsDarkMode();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const currentLevelLabel = normalizeLevel(level);
  const currentModuleId = selectedModuleId || Object.keys(moduleLessonCounts)[0] || null;
  const lessonToModule = lessonsMeta;
  const xpFromCurrentModule = Object.entries(lessonsCompleted).reduce((acc, [lessonId, entry]) => {
    const moduleId = lessonToModule[lessonId] || null;
    if (currentModuleId && moduleId !== currentModuleId) return acc;
    const score = Number.isFinite(entry.score) ? entry.score : Number(entry.score);
    const completed = entry.watched === true || (Number.isFinite(score) && score >= 70);
    return completed ? acc + 10 : acc;
  }, 0);
  const xpTargetForModule = (moduleLessonCounts[currentModuleId] || 15) * 10;
  const xpTotal = xpFromCurrentModule;
  const currentIndex = LEVEL_SEQUENCE.indexOf(currentLevelLabel);
  const nextLevel = currentIndex >= 0 && currentIndex < LEVEL_SEQUENCE.length - 1 ? LEVEL_SEQUENCE[currentIndex + 1] : null;
  const progressPercent = nextLevel ? min100(Math.round((xpTotal / xpTargetForModule) * 100)) : 100;
  const remainingXp = nextLevel ? Math.max(0, xpTargetForModule - xpTotal) : 0;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };
  const handleIaInDevelopment = () => {
    setIaModalVisible(true);
  };
  const closeIaModal = () => setIaModalVisible(false);
  useEffect(() => {
    const lessonsRef = collection(db, "lessons");
    const unsubscribe = onSnapshot(
      lessonsRef,
      (snapshot) => {
        const map = {};
        const counts = {};
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const moduleId = data?.moduleId || data?.module || null;
          map[docSnap.id] = moduleId;
          const key = moduleId || null;
          counts[key] = (counts[key] || 0) + 1;
        });
        setLessonsMeta(map);
        setModuleLessonCounts(counts);
      },
      () => {
        setLessonsMeta({});
        setModuleLessonCounts({});
      }
    );
    return unsubscribe;
  }, []);
  const handleStatPress = (type) => {
    const messages = {
      days: `Dias em que voce estudou: ${stats.days}.`,
      lessons: `Aulas concluidas: ${stats.lessons}.`,
      activities: `Atividades respondidas: ${stats.activities}.`,
      xp: `Pontos acumulados: ${stats.xp || 0}. Cada aula vale 10 pontos.`,
    };
    setStatInfo(messages[type]);
  };
  const handleLevelInfo = () => {
    setLevelInfo(true);
  };

  const handleThemeToggle = () => {
    setDarkMode((prev) => {
      if (prev === null) {
        return !isDarkMode;
      }
      return !prev;
    });
  };

  const subtitleText =
    stats.lessons > 0
      ? "Continue de onde parou e desbloqueie novas aulas."
      : "Comece sua primeira aula para desbloquear novos níveis.";

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={theme.primary} colors={[theme.primary]} />}
      >
        <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.statPill} onPress={() => handleStatPress("lessons")} activeOpacity={0.8}>
            <Feather name="book" size={14} color="#3D7FFC" />
            <Text style={styles.statText}>{stats.lessons}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statPill} onPress={() => handleStatPress("activities")} activeOpacity={0.8}>
            <Feather name="check-circle" size={14} color="#FFB347" />
            <Text style={styles.statText}>{stats.activities}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statPill} onPress={() => handleStatPress("xp")} activeOpacity={0.8}>
            <Feather name="star" size={14} color="#8B5CF6" />
            <Text style={styles.statText}>{stats.xp || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.themeButton} onPress={handleThemeToggle} activeOpacity={0.8}>
            <Feather name={isDarkMode ? "sun" : "moon"} size={16} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={[styles.hero, { backgroundColor: theme.primary }]}>
          <View style={styles.heroRow}>
            <View style={styles.heroCopy}>
              <Text style={styles.heroLabel}>Bem-vindo</Text>
              {displayName ? (
                <Text style={styles.welcome}>Olá, {displayName}!</Text>
              ) : (
                <Text style={styles.welcome}>
                  Olá, <Text style={styles.loadingDots}>...</Text>
                </Text>
              )}
              <Text style={styles.subtitle}>{subtitleText}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.levelPillFloating} onPress={handleLevelInfo} activeOpacity={0.8}>
            <Feather name="star" size={16} color={theme.primary} />
            <Text style={styles.levelText}>{currentLevelLabel}</Text>
          </TouchableOpacity>
          <View style={styles.heroActions}>
            <TouchableOpacity style={styles.heroChip} activeOpacity={0.9} onPress={() => navigation.navigate("ModuleList")}>
              <Feather name="book-open" size={16} color="#FFFFFF" />
              <Text style={styles.heroChipText}>Aulas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.heroChip, styles.heroChipGhost]} activeOpacity={0.9} onPress={handleIaInDevelopment}>
              <Feather name="message-circle" size={16} color="#FFFFFF" />
              <Text style={styles.heroChipText}>IA em breve</Text>
            </TouchableOpacity>
          </View>
        </View>

          <View style={styles.actions}>
            <CustomButton title="Ver aulas" onPress={() => navigation.navigate("ModuleList")} />
            <CustomButton title="Conversação IA (Em breve)" variant="ghost" onPress={handleIaInDevelopment} />
          </View>
        </View>
      </ScrollView>
      <Modal
        transparent
        animationType="fade"
        visible={isIaModalVisible || !!statInfo || levelInfo}
        onRequestClose={() => (statInfo ? setStatInfo(null) : levelInfo ? setLevelInfo(false) : closeIaModal())}
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {statInfo ? (
              <>
                <Text style={styles.modalTitle}>Seu progresso</Text>
                <Text style={styles.modalText}>{statInfo}</Text>
              </>
            ) : levelInfo ? (
              <>
                <Text style={styles.modalTitle}>Seu nivel e: {currentLevelLabel}</Text>
                {nextLevel ? (
                  <>
                    <View style={styles.progressWide}>
                      <View style={[styles.progressFillWide, { width: `${progressPercent}%` }]} />
                    </View>
                    <Text style={styles.modalText}>
                      Faltam {remainingXp} pontos para chegar em {nextLevel}. Cada aula concluida vale +10 pontos.
                    </Text>
                  </>
                ) : (
                  <Text style={styles.modalText}>Voce atingiu o nivel maximo.</Text>
                )}
                <View style={styles.levelList}>
                  {Object.entries(levelDescriptions).map(([lvl, desc]) => (
                    <Text key={lvl} style={[styles.levelLine, lvl === currentLevelLabel && styles.levelLineActive]}>
                      {lvl}: {desc}
                    </Text>
                  ))}
                </View>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Funcao em desenvolvimento</Text>
                <Text style={styles.modalText}>A Conversacao IA esta em desenvolvimento e ficara disponivel em breve.</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.modalButton}
              activeOpacity={0.8}
              onPress={() => (statInfo ? setStatInfo(null) : levelInfo ? setLevelInfo(false) : closeIaModal())}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.layout,
      paddingVertical: spacing.layout,
      gap: spacing.lg,
      justifyContent: "flex-start",
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      flexWrap: "wrap",
    },
    statPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statText: {
      color: colors.text,
      fontFamily: typography.fonts.body,
      fontWeight: "700",
    },
    themeButton: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
      marginLeft: "auto",
    },
    welcome: {
      fontSize: typography.heading + 2,
      fontWeight: "700",
      color: "#FFFFFF",
      fontFamily: typography.fonts.heading,
      flexShrink: 1,
      flexWrap: "wrap",
    },
    subtitle: {
      fontSize: typography.body,
      color: "#FFFFFF",
      fontFamily: typography.fonts.body,
      marginTop: spacing.xs,
    },
    hero: {
      padding: spacing.lg,
      paddingRight: spacing.xl * 1.5,
      borderRadius: radius.lg,
      shadowColor: colors.primary,
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 3,
      gap: spacing.sm,
      position: "relative",
      overflow: "hidden",
    },
    heroRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      gap: spacing.md,
    },
    heroCopy: {
      gap: spacing.xs,
    },
    heroLabel: {
      fontSize: typography.subheading,
      color: "#FFFFFF",
      fontFamily: typography.fonts.body,
    },
    levelPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.sm,
      maxWidth: "50%",
    },
    levelPillFloating: {
      position: "absolute",
      top: spacing.sm,
      right: spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.sm,
      maxWidth: "60%",
    },
    levelText: {
      color: colors.primary,
      fontWeight: "700",
      fontFamily: typography.fonts.body,
      flexShrink: 1,
      flexWrap: "wrap",
    },
    heroActions: {
      flexDirection: "row",
      gap: spacing.sm,
      marginTop: spacing.md,
      flexWrap: "wrap",
    },
    heroChip: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      backgroundColor: "rgba(255,255,255,0.2)",
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.sm,
    },
    heroChipGhost: {
      backgroundColor: "rgba(255,255,255,0.1)",
    },
    heroChipText: {
      color: "#FFFFFF",
      fontFamily: typography.fonts.body,
      fontWeight: "600",
    },
    loadingDots: {
      letterSpacing: 2,
    },
    actions: {
      gap: spacing.sm,
    },
    modalOverlay: {
      flex: 1,
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
      fontFamily: typography.fonts.heading,
      fontSize: typography.subheading,
      color: colors.text,
      fontWeight: "700",
    },
    modalText: {
      fontFamily: typography.fonts.body,
      fontSize: typography.body,
      color: colors.textSecondary,
    },
    progressWide: {
      height: 12,
      backgroundColor: colors.gray,
      borderRadius: radius.md,
      overflow: "hidden",
      marginTop: spacing.xs,
    },
    progressFillWide: {
      height: "100%",
      backgroundColor: colors.primary,
    },
    levelList: {
      gap: spacing.xs,
      marginTop: spacing.sm,
    },
    levelLine: {
      fontFamily: typography.fonts.body,
      color: colors.text,
      fontSize: typography.small,
    },
    levelLineActive: {
      color: colors.primary,
      fontWeight: "700",
    },
    modalButton: {
      alignSelf: "flex-end",
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
    },
    modalButtonText: {
      color: colors.primary,
      fontSize: typography.body,
      fontFamily: typography.fonts.body,
      fontWeight: "700",
    },
  });

export default HomeScreen;
