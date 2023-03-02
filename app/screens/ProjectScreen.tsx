import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { AppStackParamList } from "../navigators"
import {
  Button,
  Header,
} from "../components"
import { colors } from "../theme"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

export const ProjectScreen: FC = observer(function ProjectScreen(props: any) {
  const navigation: NavProp = useNavigation<NavProp>()
  const { params: {color, title, id } } = props.route

  const recordActivity = () => {
    navigation.navigate("NewActivity", {projectId: +id, title: title, color: color})
  }

  return (
    <View style={$container}>
        <Header
          title={title}
          style={{backgroundColor: color, marginBottom: 10}}
          titleStyle={{ color: "white" }}
          leftIcon="back"
          onLeftPress={() => {
            navigation.goBack()
          }}
        />
        <Button
          text="Record Activity"
          onPress={recordActivity}
        />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
