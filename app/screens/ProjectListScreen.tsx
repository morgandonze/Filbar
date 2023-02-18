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


export const ProjectListScreen: FC<ProjectListScreenProps> = observer(function ProjectListScreen(params) {

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const projects = [
    {text: "Development", color: "#a17"},
    {text: "Yoga", color: "#be3"},
    {text: "Writing", color: "#3be"},
    {text: "Cleaning", color: "#e3b"},
    {text: "Job Applications", color: "#17a"},
    {text: "Guitar", color: "#7a1"},
  ]

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Header
          title="Snowball"
          style={{backgroundColor: "#99e", marginBottom: 10,}}
          titleStyle={{ color: "white" }}
        />
        <FlatList
          data={projects}
          renderItem={project => (
            <ListItem
              style={{
                backgroundColor: project.item.color,
                padding: 15,
                alignContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                console.log(params)
              }}
              text={project.item.text}
              textStyle={{textAlign: "center"}}
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

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
