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

export const ProjectScreen: FC = observer(function ProjectScreen(props: any) {
  const navigation: NavProp = useNavigation<NavProp>();
  const { params: projectParam } = props.route;
  const rootStore = useStores();
  const { color, title, id } = projectParam || {};
  const project: any = rootStore.getProjectById(id) ;

  if (!project) return <></>

  const projectStats = { velocity: project.velocity, lastActivityDate: "2023 March 9", priority: 31, urgency: 0, frequency: 3 };
  const shade = color ? tinycolor(color).desaturate(35).darken(12).toString() : ""

  const recordActivity = () => {
    navigation.navigate("NewActivity", { projectId: +id, title: title, color: color });
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
              <View style={{ backgroundColor: color, flex: 2 }}></View>
              <View style={{ backgroundColor: shade, flex: 5 }}></View>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: 'lightgray', borderRadius: 10, marginBottom: 20, paddingHorizontal: 10, paddingVertical: 5 }}>
          <Text style={{ fontSize: 16 }}>Velocity: {project.velocity}</Text>
          <Text>Last Active: {projectStats.lastActivityDate}</Text>
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

