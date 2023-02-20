import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
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
import { AppNavigator } from "../navigators"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

// export const ProjectListScreen: FC<ProjectListScreenProps> = observer(function ProjectListScreen(params) {
export const ProjectListScreen: FC = observer(function ProjectListScreen(params) {

  const navigation = useNavigation<NavProp>()
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const projects = [
    {id: 1, title: "Development", color: "#a17"},
    {id: 2, title: "Yoga", color: "#be3"},
    {id: 3, title: "Writing", color: "#3be"},
    {id: 4, title: "Cleaning", color: "#e3b"},
    {id: 5, title: "Job Applications", color: "#17a"},
    {id: 6, title: "Guitar", color: "#7a1"},
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
                navigation.navigate("Project", {
                  id: project.item.id,
                  title: project.item.title,
                  color: project.item.color,
                })
              }}
              text={project.item.title}
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
