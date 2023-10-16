import React from "react"
import { observer } from "mobx-react-lite"
import { View, Text } from "react-native"
import { NavigationProp } from "@react-navigation/native"

import { ButtonComponent } from "@/components/Button/button.component"
import { Style } from "./user.style"
import ToggleComponent from "@/components/Toggle/toggle.component"

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

const renderConfigs = () => {
  return (
    <View
      style={{
        width: "80%",
        marginTop: 90,
        marginBottom: 90,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text>Permitir que o aplicativo envie notificações</Text>
      <ToggleComponent />
    </View>
  )
}

const UserView: React.FC<UserViewProps> = ({ navigation }) => {
  return (
    <View style={Style.container}>
      {renderLogoUser({ name: "Andre", lastName: "Santos" })}
      {renderUserInformations()}
      {renderConfigs()}
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
