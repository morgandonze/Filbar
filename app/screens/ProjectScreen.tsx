import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, FlatListProps, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackParamList } from "../navigators"
import {
  Header,
  ListItem,
  Text,
} from "../components"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

export const ProjectScreen: FC = observer(function ProjectScreen(props: any) {
  const navigation: NavProp = useNavigation<NavProp>()
  const { params: {color, title} } = props.route

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
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
