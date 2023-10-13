import { Image, TextInput, View } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { Style } from "./login.style"
import { Wrapper } from "@/styles/wrapper.style"

import { ButtonComponent } from "@components/Button/button.component"

export function LoginView() {
  const navigation = useNavigation()
  const logoPath = "../../../assets/logo_login.png"

  return (
    <View style={Style.container}>
      <Image source={require(logoPath)} />
      <View style={Style.containerInputs}>
        <View style={Style.containerField}>
          <TextInput style={Style.field} placeholder="pessoa.sobrenome@grupo-eagle.com" />
        </View>
        <View style={Style.containerField}>
          <TextInput style={Style.field} secureTextEntry={true} placeholder="*******" />
        </View>
      </View>
      <View style={[Style.containerButton, Wrapper.columnCenter]}>
        <ButtonComponent title={"Acessar"} onPress={() => navigation.navigate("WelcomeView")} />
      </View>
    </View>
  )
}
