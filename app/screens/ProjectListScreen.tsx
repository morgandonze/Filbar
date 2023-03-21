import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { AppStackParamList } from "../navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { FlatList, View, ViewStyle } from "react-native"
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
            const shade = '#888'; //lightenDarkenColor(project.item.color, -80);

            return (
              <TouchableOpacity style={{
                backgroundColor: 'gray',
                width: '100%',
                marginBottom: 20,
                height: 80,
                borderRadius: 20,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}
                onPress={() => {
                  navigation.navigate(
                    "Project",
                    { id: +project.item.id, title: project.item.title, color: project.item.color }
                  )
                }}
              >
                <Text style={{ color: '#fff', fontSize: 24 }}>{project.item.title}</Text>
                <View style={{ position: 'absolute', height: 80, width: '100%', zIndex: -1, flexDirection: 'row' }}>
                  <View style={{ backgroundColor: project.item.color, flex: 1 }}></View>
                  <View style={{ backgroundColor: shade, flex: 5 }}></View>
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



