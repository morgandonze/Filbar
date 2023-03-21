import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, View, ViewStyle } from "react-native"
import tinycolor from "tinycolor2";
import {
  Header,
  ListItem,
  Text,
} from "../components"
import { colors, spacing } from "../theme"
import { useStores } from "../models"
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
  const { projects } = rootStore;
  // rootStore.deleteProjects()

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
        <FlatList
          data={Array.from(projects.values())}
          renderItem={project => {
            // const shade = '#888';
            const shade = tinycolor(project.item.color).desaturate(35).darken(12).toString()
            // const lOrD = lightOrDark(project.item.color);
            const lOrD = lightOrDark(shade);
            const projectColor = project.item.color;

            return (
              <TouchableOpacity style={{
                width: '100%',
                marginBottom: 20,
              }}
                onPress={() => {
                  navigation.navigate(
                    "Project",
                    { id: +project.item.id, title: project.item.title, color: projectColor }
                  )
                }}
              >
                <View>
                  <Text style={{ fontSize: 24 }}>{project.item.title}</Text>
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
                  {/* <View style={{backgroundColor: projectColor, padding: 10, borderRadius: 10, borderColor: shade, borderWidth: 2, marginLeft: 10}}> */}
                  {/* <View style={{ position: 'absolute', height: 80, width: '100%', zIndex: -1, flexDirection: 'row' }}> */}
                  <View style={{ height: 80, width: '100%', zIndex: -1, flexDirection: 'row' }}>
                    <View style={{ backgroundColor: projectColor, flex: 2 }}></View>
                    {/* <View style={{ backgroundColor: projectColor, flex: 2, borderRightColor: tinycolor(projectColor).darken(10).toString(), borderRightWidth: 3 }}></View> */}
                    <View style={{ backgroundColor: shade, flex: 5 }}></View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
          }
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
  marginBottom: 100,
}



