import React from "react"

import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import MobxProvider from "@/store/provider"

import PointView from "@views/point/point.view"
import userView from "@/views/user/user.view"
import { LoginView } from "@views/login/login.view"
import { WelcomeScreen } from "@views/welcome/welcome.view"

const stack = createStackNavigator()

export const Router = () => {
  return (
    <NavigationContainer>
      <MobxProvider>
        <stack.Navigator
          initialRouteName="LoginView"
          screenOptions={{
            headerShown: false,
          }}
        >
          <stack.Screen name="LoginView" component={LoginView} />
          <stack.Screen name="PointView" component={PointView} />
          <stack.Screen name="UserView" component={userView} />
          <stack.Screen
            options={{
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
