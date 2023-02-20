import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, FlatListProps, Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackParamList } from "../navigators"
import {
  Header,
  ListItem,
  Text,
} from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { TextInput } from "react-native-gesture-handler"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

export const NewProjectScreen: FC = observer(function NewProjectScreen() {
  const navigation: NavProp = useNavigation<NavProp>()
  const [title, onChangeTitle] = React.useState(null);
  const [bgColor, changeBgColor] = React.useState('#0792e3');
  const colors = [
    { name: "snowbol blu", value: "#0792e3" },
    { name: "eggplant", value: "#a17" },
    { name: "neon green", value: "#be3" },
    { name: "aqua", value: "#3be" },
    { name: "hot pink", value: "#e3b" },
    { name: "smurf", value: "#17a" },
    { name: "grouch", value: "#7a1" },
    { name: "fuscia", value: "#b7d" },
  ]

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
          horizontal={true}
          data={colors}
          contentContainerStyle={{
            // flexDirection: "row",
            // display: "flex",
            // flexWrap: "wrap",
            // justifyContent: "space-evenly",
            // paddingTop: 20,
          }}
          renderItem={color => (
            <TouchableOpacity
              style={{ backgroundColor: color.item.value, flex: 1, padding: 40 }}
              onPress={() => {
                changeBgColor(color.item.value)
              }}
            />
          )}
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
