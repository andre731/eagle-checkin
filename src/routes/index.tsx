import React from "react"

import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"

import { LoginView } from "@views/login/login.view"
import { PointView } from "@views/point/point.view"
import { WelcomeScreen } from "@views/welcome/welcome.view"

const stack = createStackNavigator()

export const Router = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="LoginView"
        screenOptions={{
          headerShown: false,
        }}
      >
        <stack.Screen name="LoginView" component={LoginView} />
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
        <stack.Screen name="PointView" component={PointView} />
      </stack.Navigator>
    </NavigationContainer>
  )
}
