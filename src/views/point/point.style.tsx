import { StyleSheet, Dimensions } from "react-native"

import { Colors } from "@/common/enums/colors.enum"

const MAP_WIDTH_PERCENTAGE = 0.9
const MAP_HEIGHT_PERCENTAGE = 0.25
const { width, height } = Dimensions.get("window")

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },

  containerMap: {
    justifyContent: "center",
    alignItems: "center",
  },

  map: {
    height: height * MAP_HEIGHT_PERCENTAGE,
    width: width * MAP_WIDTH_PERCENTAGE,
    borderRadius: 8,
  },

  containerLocation: {
    width: width * MAP_WIDTH_PERCENTAGE,
    height: 80,
    marginTop: 20,
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
  },

  locationDate: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.SECONDARY,
  },

  location: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.GRAY,
  },

  containerRegistries: {
    width: width * MAP_WIDTH_PERCENTAGE,
    height: 245,
    marginTop: 20,
    marginBottom: 40,
    justifyContent: "space-around",
  },

  headerRegistries: {
    height: 60,
    justifyContent: "center",
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
  },

  headerRegistriesText: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: "800",
    color: Colors.SECONDARY,
  },

  listRegistries: {
    height: 0,
    marginTop: 5,
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
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.03,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
  },

  containerButton: {
    width: "80%",
  },

  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 170,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonOpen: {
    backgroundColor: "#002A48",
  },
  buttonClose: {
    backgroundColor: "#002A48",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 40,
    marginBottom: 15,
    textAlign: "center",
  },

  modalText2: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },

  emoji: {
    fontSize: 34,
    margin: 10,
  },

  selectedEmoji: {
    backgroundColor: "#E3E3E3",
    borderRadius: 8,
  },
})
