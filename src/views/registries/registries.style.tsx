import { Colors } from "@/common/enums/colors.enum"
import { StyleSheet } from "react-native"

export const Styles = StyleSheet.create({
  listRegistries: {
    height: 0,
    marginTop: 50,
  },
  registries: {
    height: 60,
    margin: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 16,
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.PRIMARY,
    padding: 10,
  },
  calendarButtonContainer: {
    justifyContent: "center",
  },
  calendarButton: {
    position: "absolute",
    top: 30,
    right: 10,
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 8,
  },
  calendarButtonText: {
    color: "white",
    textAlign: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  closeButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
  },

  noRecordsText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 100,
  },
})
