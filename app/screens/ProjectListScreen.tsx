import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import tinycolor from "tinycolor2";
import {
  Header,
  Text,
} from "../components"
import { colors, spacing } from "../theme"
import { useStores } from "../models"
import { TouchableOpacity } from "react-native-gesture-handler"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

export const ProjectListScreen: FC = observer(function ProjectListScreen() {
  const navigation = useNavigation<NavProp>();
  const rootStore = useStores();
  const { projects: projectsObj } = rootStore;
  const projects = Array.from(projectsObj.slice());
  

  const renderProjectBar = project => {
    const shade = tinycolor(project.color).desaturate(35).darken(12).toString()
    const projectColor = project.color;

    return (
      <TouchableOpacity key={`project-${project.id}`} style={{
        width: '100%',
        marginBottom: 20,
      }}
        onPress={() => {
          rootStore.setCurrentProject(project.id)
          navigation.navigate("Project")
        }}
      >
        <View>
          <Text style={{ fontSize: 24 }}>{project.title}</Text>
        </View>
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
            <View style={{ backgroundColor: projectColor, flex: (project.velocity / 100) }}></View>
            <View style={{ backgroundColor: shade, flex: ((100 - project.velocity)/100) }}></View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <ScrollView style={$container}>
      <View style={$topContainer}>
        <Header
          title="Filbar"
          titleStyle={{ color: "#000" }}
          rightIcon="plus"
          rightIconColor="#000"
          onRightPress={() => {
            navigation.navigate("NewProject")
          }}
        />
        <View>
          {
            projects.length == 0 ?
              (<Text>No projects yet!</Text>)
              :
              <View>
                {projects.map((project) => renderProjectBar(project))}
              </View>
          }
        </View>
      </View>
    </ScrollView>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  justifyContent: "center",
  paddingHorizontal: spacing.large,
  marginBottom: 100,
}
