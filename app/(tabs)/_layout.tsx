import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Entypo from "@expo/vector-icons/Entypo";
import { Stack } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={28}
              name="house"
              color={focused ? "#6097ff" : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="menu"
              size={28}
              color={focused ? "#6097ff" : "grey"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="RequestAppointmentScreen"
        options={{
          title: "Request appointment",
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name="add-to-list"
              size={28}
              color={focused ? "#6097ff" : "grey"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
