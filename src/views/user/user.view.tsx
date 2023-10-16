import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, Platform, Button } from "react-native"
import { NavigationProp } from "@react-navigation/native"

import { ButtonComponent } from "@/components/Button/button.component"
import { Style } from "./user.style"
import ToggleComponent from "@/components/Toggle/toggle.component"
import { store } from "@/store"

interface UserViewProps {
  navigation: NavigationProp<any>
}

const renderLogoUser = ({ name, lastName }: { name: string; lastName: string }) => {
  return (
    <View style={Style.containerLogo}>
      <Text style={Style.textLogo}>
        {name[0].toLocaleUpperCase()}
        {lastName[0].toUpperCase()}
      </Text>
    </View>
  )
}

const renderUserInformations = () => {
  return (
    <View style={Style.containerUserInfos}>
      <View style={Style.viewUserInfo}>
        <Text style={Style.nameTextUserInfo}>NOME DA PESSOA</Text>
        <Text style={Style.matTextUserInfo}>Matricula: 10003210031</Text>
      </View>

      <View style={Style.hrUserInfo} />

      <View>
        <Text style={Style.bankTextUserInfo}>Saldo Banco de Horas: 14:23</Text>
      </View>
    </View>
  )
}

const UserView: React.FC<UserViewProps> = ({ navigation }) => {
  return (
    <View style={Style.container}>
      {renderLogoUser({ name: "Andre", lastName: "Santos" })}
      {renderUserInformations()}

      <View
        style={{
          width: "80%",
        }}
      >
        <ButtonComponent
          title={"Sair do Aplicativo"}
          onPress={() => navigation.navigate("LoginView")}
          buttonStyle={{ backgroundColor: "#FF4539" }}
        ></ButtonComponent>
      </View>
    </View>
  )
}

export default observer(UserView)
