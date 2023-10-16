import React from "react"
import "react-native-gesture-handler"
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native"

import MobxProvider from "@/store/provider"

import PointView from "@views/point/point.view"
import UserView from "@/views/user/user.view"
import { LoginView } from "@views/login/login.view"
import { WelcomeScreen } from "@views/welcome/welcome.view"
import RegistriesView from "@/views/registries/registries.view"
import ScheduleView from "@/views/schedule/schedule.view"

const stack = createStackNavigator()
const drawer = createDrawerNavigator()

const DrawerScreens = () => (
  <drawer.Navigator>
    <drawer.Screen name="Registro de batidas" component={RegistriesView} />
    <drawer.Screen name="Bater Ponto" component={PointView} />
    <drawer.Screen name="Alarmes" component={ScheduleView} />
    <drawer.Screen name="Perfil do Usuário" component={UserView} />
  </drawer.Navigator>
)

export const Router = () => {
  return (
    <NavigationContainer>
      <MobxProvider>
        <stack.Navigator initialRouteName="LoginView">
          <stack.Screen
            options={{ headerShown: false }}
            name="Eagle CheckIn"
            component={DrawerScreens}
          />
          <stack.Screen options={{ headerShown: false }} name="LoginView" component={LoginView} />

          <stack.Screen
            options={{
              headerShown: false,
              gestureDirection: "horizontal",
              headerStyleInterpolator: HeaderStyleInterpolators.forFade,
              transitionSpec: {
                open: TransitionSpecs.FadeOutToBottomAndroidSpec,
                close: TransitionSpecs.FadeOutToBottomAndroidSpec,
              },
            }}
            name="WelcomeView"
            component={WelcomeScreen}
          />
        </stack.Navigator>
      </MobxProvider>
    </NavigationContainer>
  )
}
