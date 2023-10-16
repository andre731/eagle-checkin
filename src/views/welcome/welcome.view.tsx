// WelcomeScreen.js
import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { Colors } from "@/common/enums/colors.enum"

export const WelcomeScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "PointView" }],
        }),
      )
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View
      style={{
        backgroundColor: Colors.PRIMARY,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.WHITE }}>
        Bem-vindo, Usuário!
      </Text>
    </View>
  )
}
