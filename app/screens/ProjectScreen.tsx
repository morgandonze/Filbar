import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC, useLayoutEffect } from "react"
import { SafeAreaView, View, ViewStyle } from "react-native"
import { AppStackParamList } from "../navigators"
import {
  Button,
  Header,
  Text,
} from "../components"
import { colors } from "../theme"
import tinycolor from "tinycolor2";
import { useStores } from "../models"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

export const ProjectScreen: FC = observer(function ProjectScreen() {
  const navigation: NavProp = useNavigation<NavProp>();
  const rootStore = useStores();
  const { currentProject: currentProjectId, activities } = rootStore;
  const project = rootStore.getProjectById(currentProjectId);

  // TODO do something better than this if there's no project
  if (!project) return <></>

  const { color, title, id } = project;
  const shade = color ? tinycolor(color).desaturate(35).darken(12).toString() : ""

  const recordActivity = () => {
    navigation.navigate("NewActivity");
  }

  const edit = () => {
    rootStore.setCurrentProject(project.id)
    navigation.navigate("EditProject");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header
        title={title}
        style={{ backgroundColor: shade, marginBottom: 10 }}
        titleStyle={{ color: "white" }}
        leftIcon="back"
        onLeftPress={() => { navigation.goBack() }}
        rightIcon="settings"
        onRightPress={edit}
        backgroundColor={shade}
      />
    })
  })

  return (
    <View style={$container}>
      <SafeAreaView>
        <View style={{
          width: '100%',
          marginBottom: 20,
        }}
        >
          <View style={{
            height: 70,
            backgroundColor: 'gray',
            borderRadius: 20,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
            <View style={{ height: 80, width: '100%', zIndex: -1, flexDirection: 'row' }}>
              <View style={{ backgroundColor: color, flex: (project.velocity / 100) }}></View>
              <View style={{ backgroundColor: shade, flex: ((100 - project.velocity)/100) }}></View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: 'lightgray', borderRadius: 10, marginBottom: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
          <Text style={{ fontSize: 16 }}>Velocity: {project.velocity}</Text>
          <Text>Activity count: {project.activityCount}</Text>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Button
            text="Record Activity"
            onPress={recordActivity}
          />
        </View>

      </SafeAreaView>
    </View >
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  padding: 10,
  paddingTop: 20,
}

