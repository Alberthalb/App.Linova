const light = {
  primary: "#3D7FFC",
  accent: "#FF6B5C",
  background: "#FFF4F0",
  surface: "#FFFFFF",
  text: "#111827",
  textSecondary: "#4B5563",
  muted: "#6B7280",
  gray: "#F3E6E0",
  border: "#FFD8CD",
  overlay: "rgba(17,24,39,0.05)",
  cardShadow: "rgba(61,127,252,0.15)",
};

const dark = {
  primary: "#82A8FF",
  accent: "#FF8A78",
  background: "#0F172A",
  surface: "#111827",
  text: "#E5E7EB",
  textSecondary: "#A5B4FC",
  muted: "#9CA3AF",
  gray: "#1F2937",
  border: "#1F2937",
  overlay: "rgba(255,255,255,0.04)",
  cardShadow: "rgba(0,0,0,0.4)",
};

export const colors = { ...light };
export const darkColors = { ...dark };
export const lightColors = { ...light };

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  layout: 28,
};

export const typography = {
  heading: 24,
  subheading: 18,
  body: 16,
  small: 14,
  fonts: {
    heading: "Poppins_700Bold",
    body: "Inter_400Regular",
    button: "Poppins_700Bold",
  },
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
};
