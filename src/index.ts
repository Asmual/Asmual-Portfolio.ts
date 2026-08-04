// Theme type definition
export type ThemeMode = "light" | "dark" | "gray";

// Navigation item interface
export interface NavItem {
  name: string;
  href: string;
}

// Global theme state interface (if needed for context/props)
export interface ThemeContextType {
  theme: ThemeMode;
  changeTheme: (newTheme: ThemeMode) => void;
}