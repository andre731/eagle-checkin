import React from "react"
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"

import { Styles } from "./button.style"

interface ButtonBody extends TouchableOpacityProps {
  title: string
  buttonStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export const ButtonComponent: React.FC<ButtonBody> = ({
  title,
  onPress,
  style,
  buttonStyle,
  textStyle,
  ...opts
}) => {
  return (
    <TouchableOpacity style={[Styles.button, buttonStyle]} onPress={onPress} {...opts}>
      <Text style={[Styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}
