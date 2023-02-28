import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import {
  Header,
  ListItem,
} from "../components"
import { colors, spacing } from "../theme"
import { useStores } from "../models"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

// export const ProjectListScreen: FC<ProjectListScreenProps> = observer(function ProjectListScreen(params) {
export const ProjectListScreen: FC = observer(function ProjectListScreen() {

  const navigation = useNavigation<NavProp>();
  const rootStore = useStores();
  const { projects } = rootStore;
  console.log("projects", Array.from(projects.values()))

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Header
          title="Snowbol"
          titleStyle={{ color: "#000" }}
          rightIcon="plus"
          rightIconColor="#000"
          onRightPress={() => {
            navigation.navigate("NewProject")
          }}
        />
        <FlatList
          data={Array.from(projects.values())}
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
              textStyle={{ textAlign: "center" }}
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



