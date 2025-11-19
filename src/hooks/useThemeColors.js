import { useColorScheme } from "react-native";
import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { colors as lightColors, darkColors } from "../styles/theme";

export const useThemeColors = () => {
  const scheme = useColorScheme();
  const { darkMode } = useContext(AppContext);
  const isDark = darkMode === null ? scheme === "dark" : darkMode;
  return useMemo(() => (isDark ? darkColors : lightColors), [isDark]);
};

export const useIsDarkMode = () => {
  const scheme = useColorScheme();
  const { darkMode } = useContext(AppContext);
  return darkMode === null ? scheme === "dark" : darkMode;
};
