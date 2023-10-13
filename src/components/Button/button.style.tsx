import { StyleSheet } from "react-native"

import { Colors } from "@/common/enums/colors.enum"

export const Styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 8,
  },

  text: {
    color: Colors.WHITE,
  },
})
