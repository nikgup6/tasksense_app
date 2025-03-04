// // This file is a fallback for using MaterialIcons on Android and web.

// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { SymbolWeight } from 'expo-symbols';
// import React from 'react';
// import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// // Add your SFSymbol to MaterialIcons mappings here.
// const MAPPING = {
//   // See MaterialIcons here: https://icons.expo.fyi
//   // See SF Symbols in the SF Symbols app on Mac.
//   'house.fill': 'home',
//   'paperplane.fill': 'send',
//   'chevron.left.forwardslash.chevron.right': 'code',
//   'chevron.right': 'chevron-right',
//   'space.dashboard': 'space-dashboard',
// } as Partial<
//   Record<
//     import('expo-symbols').SymbolViewProps['name'],
//     React.ComponentProps<typeof MaterialIcons>['name']
//   >
// >;

// export type IconSymbolName = keyof typeof MAPPING;

// /**
//  * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
//  *
//  * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
//  */
// export function IconSymbol({
//   name,
//   size = 24,
//   color,
//   style,
// }: {
//   name: IconSymbolName;
//   size?: number;
//   color: string | OpaqueColorValue;
//   style?: StyleProp<ViewStyle>;
//   weight?: SymbolWeight;
// }) {
//   return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
// }

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MenuIcon from "@mui/icons-material/Menu";

// Extended mapping of SF Symbols to Material Icons
const MAPPING = {
  // Navigation & Essentials
  house: "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "space.dashboard": "space-dashboard",
  menu: "menu",

  // Common Actions
  plus: "add",
  minus: "remove",
  xmark: "close",
  checkmark: "check",
  trash: "delete",
  pencil: "edit",
  magnifyingglass: "search",

  // Media & Files
  photo: "image",
  video: "videocam",
  mic: "mic",
  doc: "description",
  folder: "folder",

  // Communication
  message: "message",
  bell: "notifications",
  envelope: "mail",
  phone: "phone",

  // Settings & Tools
  gear: "settings",
  "person.circle": "account-circle",
  lock: "lock",
  key: "vpn-key",

  // Status & Feedback
  "info.circle": "info",
  "exclamationmark.triangle": "warning",
  "checkmark.circle": "check-circle",
  "xmark.circle": "cancel",

  // Navigation
  "arrow.left": "arrow-back",
  "arrow.right": "arrow-forward",
  "arrow.up": "arrow-upward",
  "arrow.down": "arrow-downward",
  "list.bullet": "list",
  grid: "grid-view",

  // Social & Sharing
  heart: "favorite",
  star: "star",
  share: "share",
  link: "link",

  // Device & Hardware
  wifi: "wifi",
  "battery.100": "battery-full",
  location: "location-on",
  bluetooth: "bluetooth",

  // Date & Time
  clock: "access-time",
  calendar: "calendar-today",
  alarm: "alarm",

  // Weather & Nature
  "sun.max": "wb-sunny",
  cloud: "cloud",
  moon: "nightlight",

  // Transportation
  car: "directions-car",
  airplane: "flight",
  bus: "directions-bus",

  // Shopping & Commerce
  cart: "shopping-cart",
  tag: "local-offer",
  creditcard: "credit-card",

  // Audio Controls
  play: "play-arrow",
  pause: "pause",
  stop: "stop",
  forward: "fast-forward",
  backward: "fast-rewind",
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses MaterialIcons on Android and web.
 * This component provides a consistent look across platforms and optimal resource usage.
 *
 * @param name - The name of the icon (based on SF Symbol names)
 * @param size - The size of the icon (default: 24)
 * @param color - The color of the icon
 * @param style - Additional styles to apply to the icon
 * @param weight - The weight of the icon (only applicable for SF Symbols on iOS)
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const materialName = MAPPING[name];

  if (!materialName) {
    console.warn(`No Material Icon mapping found for SF Symbol: ${name}`);
    return null;
  }

  return (
    <MaterialIcons
      name={materialName}
      size={size}
      color={color}
      style={style}
    />
  );
}
