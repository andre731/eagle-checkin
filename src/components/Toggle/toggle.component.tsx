import { Colors } from "@/common/enums/colors.enum"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Switch, SwitchProps } from "react-native"

interface ToggleProps extends SwitchProps {
  isEnabled: boolean
  toggleSwitch: any
}

const ToggleComponent: React.FC<ToggleProps> = ({ isEnabled, toggleSwitch, ...opts }) => {
  return (
    <Switch
      trackColor={{ false: "#767577", true: Colors.SECONDARY }}
      thumbColor={isEnabled ? Colors.WHITE : Colors.WHITE}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      {...opts}
      value={isEnabled}
    />
  )
}

export default observer(ToggleComponent)
