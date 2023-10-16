import React, { useState } from "react"
import { Modal, Text, TextInput, TouchableOpacity, View, Keyboard } from "react-native"
import { Colors } from "@/common/enums/colors.enum"
import { Styles } from "./modal-registry.style"
import { registriesStore } from "@/store/registries.map"

interface Registry {
  id: number
  date: string
  hours: string
  local: string
  justify: string
}

const isValidDate = (date: string): boolean => {
  return !isNaN(Date.parse(date))
}

const isValidHour = (hour: string): boolean => {
  const hourRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  return hourRegex.test(hour)
}

const EditRegistryModal: React.FC<{
  visible: boolean
  onClose: () => void
  registry: Registry
}> = ({ visible, onClose, registry }) => {
  const [editedRegistry, setEditedRegistry] = useState<Registry>({ ...registry })

  const handleTextInputBlur = () => {
    Keyboard.dismiss()
  }

  const handleSave = () => {
    if (
      !editedRegistry.date ||
      !isValidDate(editedRegistry.date) ||
      !editedRegistry.hours ||
      !isValidHour(editedRegistry.hours) ||
      !editedRegistry.local ||
      !editedRegistry.justify
    ) {
      alert("Por favor, preencha todos os campos corretamente.")
      return
    }

    registriesStore.insertRegistries(editedRegistry)
    onClose()
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={Styles.modalContent}>
        <Text style={Styles.modalHeaderText}>Editar Registro</Text>
        <View style={Styles.modalRow}>
          <Text style={Styles.modalLabel}>Data:</Text>
          <TextInput
            value={editedRegistry.date}
            onChangeText={(text) => setEditedRegistry({ ...editedRegistry, date: text })}
            style={Styles.modalTextInput}
          />
        </View>
        <View style={Styles.modalRow}>
          <Text style={Styles.modalLabel}>Horas:</Text>
          <TextInput
            value={editedRegistry.hours}
            onChangeText={(text) => setEditedRegistry({ ...editedRegistry, hours: text })}
            style={Styles.modalTextInput}
          />
        </View>
        <View style={Styles.modalRow}>
          <Text style={Styles.modalLabel}>Justificativa:</Text>
          <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
            <TextInput
              value={editedRegistry.justify}
              onBlur={handleTextInputBlur}
              onChangeText={(text) => setEditedRegistry({ ...editedRegistry, justify: text })}
              style={[Styles.modalTextInput, { height: 100 }]}
              numberOfLines={20}
              multiline={true}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSave} style={Styles.button}>
          <Text style={[Styles.buttonText, { textAlign: "center", justifyContent: `center` }]}>
            Salvar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={Styles.buttonCancel}>
          <Text style={Styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default EditRegistryModal
