import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useLayoutEffect, useState } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import tinycolor from "tinycolor2";
import {
  Header,
  ListItem,
  Text,
} from "../components"
import { colors, spacing } from "../theme"
import { RootStore, useStores } from "../models"
import { toNumber } from "i18n-js"
import { lightenDarkenColor } from "../utils/lightenDarkenColor"
import { TouchableOpacity } from "react-native-gesture-handler"
import { lightOrDark } from "../utils/lightOrDarkColor"
import { processColor } from "react-native-reanimated"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

// export const ProjectListScreen: FC<ProjectListScreenProps> = observer(function ProjectListScreen(params) {
export const ProjectListScreen: FC = observer(function ProjectListScreen() {
  const navigation = useNavigation<NavProp>();
  const rootStore = useStores();
  // const [project, setProject] = useState({});
  const { projects } = rootStore;

  const renderProjectBar = projectItem => {
    const project = projectItem.item;
    const shade = tinycolor(project.color).desaturate(35).darken(12).toString()
    const projectColor = project.color;

    return (
      <TouchableOpacity style={{
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
            <View style={{ backgroundColor: projectColor, flex: 2 }}></View>
            <View style={{ backgroundColor: shade, flex: 5 }}></View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={$container}>
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
        {
          projects.size === 0
            ?
            (<Text>No projects yet!</Text>)
            :
            (<FlatList
              data={Array.from(projects.values())}
              renderItem={(project) => renderProjectBar(project)}
            />)
        }
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
  marginBottom: 100,
}



