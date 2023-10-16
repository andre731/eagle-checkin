import { StyleSheet } from "react-native"
import { Colors } from "@/common/enums/colors.enum"

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 80,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 90,
  },

  containerLogo: {
    backgroundColor: "#DEDEDE",
    width: 150,
    height: 150,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },

  textLogo: {
    color: Colors.WHITE,
    fontWeight: "bold",
    fontSize: 38,
  },

  containerUserInfos: {
    width: "100%",
    height: 160,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-around",
  },

  viewUserInfo: {
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },

  nameTextUserInfo: {
    fontSize: 22,
    fontWeight: "600",
    color: "#BDB3B3",
  },

  matTextUserInfo: {
    fontSize: 18,
    color: "#BDB3B3",
  },

  hrUserInfo: {
    backgroundColor: "#BDB3B3",
    width: "70%",
    padding: 0.4,
  },

  bankTextUserInfo: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.SECONDARY,
  },
})
