import { StyleSheet, useColorScheme } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAuth } from "@/hooks/useAuth";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

export default function ExploreScreen() {
  const { signOut } = useAuth();
  const colorScheme = useColorScheme();
  const router = useRouter(); // Initialize router

  const links = [
    {
      label: "Profile",
      icon: <MaterialIcons name="person" size={30} color="#6097ff" />,
      onPress: () => router.push("/explore/profile"), // Correct route navigation
    },
    {
      label: "Sign Out",
      icon: <MaterialIcons name="logout" size={30} color="#6097ff" />,
      onPress: signOut,
    },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#6097ff", dark: "#6097ff" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#FFBABA"
          name="space.dashboard"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">Menu</ThemedText>
      </ThemedView>

      <ThemedView
        style={[colorScheme === "dark" ? styles.darkBg : styles.lightBg]}
      >
        {links.map((link, index) => (
          <TouchableOpacity
            key={index}
            onPress={link.onPress}
            style={[
              styles.card,
              colorScheme === "dark"
                ? { backgroundColor: "black", borderColor: "white" }
                : { backgroundColor: "white", borderColor: "black" },
            ]}
          >
            <View style={styles.iconTextContainer}>
              {link.icon}
              <ThemedText
                type="link"
                style={[
                  styles.linkText,
                  colorScheme === "dark"
                    ? { color: "white" }
                    : { color: "black" },
                ]}
              >
                {link.label}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#4e5180",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  darkBg: { backgroundColor: "black" },
  lightBg: { backgroundColor: "white" },
  card: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#4e5180",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
