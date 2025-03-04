import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Menu",
        }}
      />
      <Stack.Screen
        name="report"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="crowdfund"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="budget"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="feedback"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="resource"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
