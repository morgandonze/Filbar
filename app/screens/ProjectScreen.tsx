import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { AppStackParamList } from "../navigators"
import {
  Button,
  Header,
  Text,
} from "../components"
import { colors } from "../theme"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

export const ProjectScreen: FC = observer(function ProjectScreen(props: any) {
  const navigation: NavProp = useNavigation<NavProp>();
  const { params: { color, title, id } } = props.route;
  const projectStats = { velocity: 10, lastActivityDate: "2023 March 9", priority: 31, urgency: 0, frequency: 3 };

  const recordActivity = () => {
    navigation.navigate("NewActivity", { projectId: +id, title: title, color: color });
  }

  return (
    <View style={$container}>
      <Header
        title={title}
        style={{ backgroundColor: color, marginBottom: 10, borderRadius: 5 }}
        titleStyle={{ color: "white" }}
        leftIcon="back"
        onLeftPress={() => {
          navigation.goBack()
        }}
      />
      <View>
        <Button
          text="Record Activity"
          onPress={recordActivity}
        />
      </View>

      <View style={{ backgroundColor: "#dcdcdc", marginTop: 10, borderRadius: 5 }}>
        <View style={{ padding: 20 }}>
          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Text>Last Activity Date:</Text>
            <Text>{projectStats.lastActivityDate}</Text>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Text>Velocity:</Text>
            <Text>{projectStats.velocity}</Text>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Text>Priority:</Text>
            <Text>{projectStats.priority}</Text>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Text>Urgency:</Text>
            <Text>{projectStats.urgency}</Text>
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
            <Text>Frequency:</Text>
            <Text>{projectStats.frequency}</Text>
          </View>
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
  padding: 10,
}
