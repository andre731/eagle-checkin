import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { Text, View, StyleSheet, ScrollView } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { store } from "@/store"
import ToggleComponent from "@/components/Toggle/toggle.component"
import { schedulePushNotification } from "@/components/Notification/notification.component"

interface PickerProps {
  value: number
  onValueChange: (itemValue: number) => void
}

const renderPicker = ({ value, onValueChange }: PickerProps) => {
  return (
    <Picker
      selectedValue={value}
      onValueChange={(itemValue) => onValueChange(itemValue)}
      style={styles.picker}
      itemStyle={styles.pickerItem}
    >
      {[...Array(23).keys()].map((hour) => (
        <Picker.Item key={hour + 1} label={`${hour + 1} h`} value={hour + 1} />
      ))}
    </Picker>
  )
}

const renderConfigItem = (label: string, value: boolean, onToggle: () => void) => {
  return (
    <View style={styles.configItem}>
      <Text>{label}</Text>
      <ToggleComponent isEnabled={value} toggleSwitch={onToggle} />
    </View>
  )
}

const ScheduleView = () => {
  const [alarm1, setAlarm1] = useState(0)
  const [alarm2, setAlarm2] = useState(0)
  const [alarm3, setAlarm3] = useState(0)
  const [alarm4, setAlarm4] = useState(0)
  const [notification, setNotification] = useState(false)

  const handlePickerChange = async (
    itemValue: number,
    setAlarm: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const seconds = itemValue == 0 ? 0.1 : itemValue * 3600

    setAlarm(itemValue)

    if (notification) {
      await schedulePushNotification(seconds)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.configContainer}>
        {renderConfigItem(
          "Permitir que o aplicativo avise quando bater o ponto",
          notification,
          () => setNotification(!notification),
        )}
      </View>

      <View style={styles.alarmBody}>
        <Text style={styles.text}>Alarme 1:</Text>
        {renderPicker({
          value: alarm1,
          onValueChange: async (value) => {
            await handlePickerChange(value, setAlarm1)
          },
        })}
      </View>

      <View style={styles.alarmBody}>
        <Text style={styles.text}>Alarme 2:</Text>
        {renderPicker({
          value: alarm2,
          onValueChange: async (value) => {
            await handlePickerChange(value, setAlarm2)
          },
        })}
      </View>

      <View style={styles.alarmBody}>
        <Text style={styles.text}>Alarme 3:</Text>
        {renderPicker({
          value: alarm3,
          onValueChange: async (value) => {
            await handlePickerChange(value, setAlarm3)
          },
        })}
      </View>

      <View style={styles.alarmBody}>
        <Text style={styles.text}>Alarme 4:</Text>
        {renderPicker({
          value: alarm4,
          onValueChange: async (value) => {
            await handlePickerChange(value, setAlarm4)
          },
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexGrow: 0.5,
    padding: 16,
    justifyContent: "center",
  },
  configContainer: {
    marginBottom: 20,
  },
  configItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  picker: {
    height: 160,
    width: 100,
  },
  pickerItem: {
    fontSize: 16,
  },
  alarmBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
})

export default observer(ScheduleView)
