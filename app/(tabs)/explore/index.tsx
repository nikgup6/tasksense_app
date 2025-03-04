import { StyleSheet, useColorScheme } from "react-native";
import { Link } from "expo-router";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Button } from "react-native-paper";
import { useAuth } from "@/hooks/useAuth";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ExploreScreen() {
  const { signOut } = useAuth();
  const colorScheme = useColorScheme();

  const links: {
    href:
      | "/explore/report"
      | "/explore/crowdfund"
      | "/explore/resource"
      | "/explore/feedback"
      | "/explore/budget"
      | "/login";
    label: string;
    icon: JSX.Element;
    onPress?: () => void;
  }[] = [
    {
      href: "/explore/report",
      label: "Infrastructure Report",
      icon: (
        <MaterialIcons
          name="report"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
    {
      href: "/explore/crowdfund",
      label: "CSR Funding",
      icon: (
        <FontAwesome5
          name="hand-holding-usd"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
    {
      href: "/explore/resource",
      label: "Resource Optimization",
      icon: (
        <MaterialIcons
          name="settings"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
    {
      href: "/explore/feedback",
      label: "Feedback",
      icon: (
        <MaterialIcons
          name="feedback"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
    {
      href: "/explore/budget",
      label: "Budget Allocation",
      icon: (
        <MaterialIcons
          name="account-balance"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
    },
    {
      href: "/login",
      label: "Sign Out",
      icon: (
        <MaterialIcons
          name="logout"
          size={30}
          color="#ea495c"
          marginRight={10}
        />
      ),
      onPress: signOut,
    },
  ];
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FFE4E4", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#FFBABA"
          // name="chevron.left.forwardslash.chevron.right"
          name="space.dashboard"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">Menu</ThemedText>
      </ThemedView>

      <ThemedView
        style={[
          colorScheme === "dark"
            ? { backgroundColor: "black" }
            : { backgroundColor: "white" },
        ]}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            href={{ pathname: link.href }}
            onPress={link.onPress}
            style={[
              styles.card,
              colorScheme === "dark"
                ? { backgroundColor: "black", borderColor: "white" }
                : { backgroundColor: "white", borderColor: "black" },
            ]}
          >
            <TouchableOpacity>{link.icon}</TouchableOpacity>
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
          </Link>
        ))}

        {/* <Button onPress={signOut}>Sign Out</Button> */}
      </ThemedView>
    </ParallaxScrollView>
  );
}
// const styles = StyleSheet.create({
//   headerImage: {
//     color: "#808080",
//     bottom: -90,
//     left: -35,
//     position: "absolute",
//   },
//   titleContainer: {
//     flexDirection: "row",
//     gap: 8,
//   },
//   linksContainer: {
//     marginVertical: 20,
//     gap: 10,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerImage: {
    color: "#ee495c",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "100%",
    // backgroundColor: "#f8f9fa",
    // backgroundColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    gap: 20,
  },

  linkText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  // linksContainer: {
  //   width: "100%",
  //   marginBottom: 10,
  //   justifyContent: "center",
  //   paddingHorizontal: 10,
  //   backgroundColor: "#f8f9fa",
  //   borderRadius: 8,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 3,
  //   elevation: 3,
  // },
});
