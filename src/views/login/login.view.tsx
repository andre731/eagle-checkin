import React from "react"
import { Image, TextInput, View } from "react-native"
import { NavigationProp } from "@react-navigation/native"
import { Style } from "./login.style"
import { Wrapper } from "@/styles/wrapper.style"
import { ButtonComponent } from "@components/Button/button.component"

interface LoginViewProps {
  navigation: NavigationProp<any>
}

const renderLogo = (): JSX.Element => {
  const logoPath = "../../../assets/logo_login.png"
  return <Image source={require(logoPath)} />
}

const renderInputField = (placeholder: string, secureTextEntry: boolean): JSX.Element => {
  return (
    <View style={Style.containerField}>
      <TextInput style={Style.field} placeholder={placeholder} secureTextEntry={secureTextEntry} />
    </View>
  )
}

const renderLoginButton = (navigation: NavigationProp<any>): JSX.Element => {
  return (
    <View style={[Style.containerButton, Wrapper.columnCenter]}>
      <ButtonComponent
        title={"Acessar"}
        onPress={() => navigation.navigate("WelcomeView" as never)}
      />
    </View>
  )
}

const LoginView: React.FC<LoginViewProps> = ({ navigation }) => {
  return (
    <View style={Style.container}>
      {renderLogo()}
      <View style={Style.containerInputs}>
        {renderInputField("pessoa.sobrenome@grupo-eagle.com", false)}
        {renderInputField("*******", true)}
      </View>
      {renderLoginButton(navigation)}
    </View>
  )
}

export { LoginView }
