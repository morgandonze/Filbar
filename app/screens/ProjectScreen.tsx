import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, FlatListProps, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  Header,
  ListItem,
  Text,
} from "../components"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")


export const ProjectScreen: FC<ProjectScreenProps> = observer(function ProjectScreen(props) {

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  console.log(props)

  return (
    <View style={$container}>
        <Header
          title='somethngz'
          style={{backgroundColor: "#99e", marginBottom: 10,}}
          titleStyle={{ color: "white" }}
        />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
