import { StyleSheet } from "react-native"
import { Colors } from "@/common/enums/colors.enum"

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  containerInputs: {
    width: "80%",
    minHeight: 150,
    maxHeight: 200,
    flex: 1,
    justifyContent: "space-around",
  },

  containerField: {},

  field: {
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.SECONDARY,
  },

  containerButton: {
    flex: 1,
    width: "80%",
  },
})
