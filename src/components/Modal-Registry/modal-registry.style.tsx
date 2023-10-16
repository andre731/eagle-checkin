import { Colors } from "@/common/enums/colors.enum"
import { StyleSheet } from "react-native"

export const Styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalRow: {
    flexDirection: "column",
    marginBottom: 10,
    width: "100%",
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalTextInput: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    height: 50,
    width: "100%",
  },
  button: {
    width: "80%",
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonCancel: {
    textAlign: "center",
    width: "80%",
    backgroundColor: Colors.GRAY,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
})
