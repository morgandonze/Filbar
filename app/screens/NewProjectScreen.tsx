import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, FlatListProps, Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackParamList } from "../navigators"
import {
  Button,
  Header,
  ListItem,
  Text,
} from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { TextInput } from "react-native-gesture-handler"
import { useStores } from "../models"
import { projectColors } from "../theme/projectColors"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

export const NewProjectScreen: FC = observer(function NewProjectScreen() {
  const snowbolBlue = "#0792e3";
  const filbarPurple = "#B664B2"
  const rootStore = useStores()
  const { addProject } = rootStore
  const navigation: NavProp = useNavigation<NavProp>()
  const [title, onChangeTitle] = React.useState(null);
  const [bgColor, changeBgColor] = React.useState(snowbolBlue);
  const saveProject = () => {
    addProject(title, bgColor);
    navigation.goBack();
  }

  return (
    <View style={$container}>
      <Header
        title={title ? title : "New Project"}
        style={{ backgroundColor: bgColor, marginBottom: 10 }}
        titleStyle={{ color: "white" }}
        leftIcon="back"
        onLeftPress={() => {
          navigation.goBack()
        }}
      />
      <View style={{ marginBottom: 20 }}>
        <Text>Project Title</Text>
        <TextInput
          style={styles.input}
          value={null}
          placeholder="Project Title"
          onChangeText={onChangeTitle}
        />
      </View>
      <View>
        <Text>Color</Text>
        <FlatList
          data={Object.entries(projectColors)}
          numColumns={4}
          renderItem={(color) => {
            let value = color.item[1]
            return (
              <View
                style={{
                  padding: 3,
                  flex: 1,
                  width: "25%",
                  backgroundColor: value == bgColor ? "white" : value,
                  maxWidth: "25%",
                  height: 100,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: value,
                    flex: 1,
                    borderColor: '#fff'
                  }}
                  onPress={() => {
                    changeBgColor(value)
                  }}
                />
              </View>
            )
          }}
        />
        <Button
          text="Save Project"
          onPress={saveProject}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const styles = {
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
}
