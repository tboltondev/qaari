import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type TabBarIconProps = {
  color: string
  size: number
}

export function TabBarIcon(name: 'home-sharp' | 'map') {
  return ({ color, size }: TabBarIconProps) => (
    <Ionicons name={name} size={size} color={color} />
  );
};
