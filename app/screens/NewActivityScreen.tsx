import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { TextInput, View } from "react-native";
import { Button, Header, Text } from "../components";
import { AppStackParamList } from "../navigators";
import { ProjectListScreen } from "./ProjectListScreen";


type NavProp = StackNavigationProp<AppStackParamList, "NewActivity">

export const NewActivityScreen: FC = observer(function NewActivityScreen(props: any) {
    const navigation: NavProp = useNavigation<NavProp>()
    const { params: { id: projectId, color, title } } = props.route
    // navigation.navigate("ProjectList")

    const saveActivity = () => {

    }

    return (
        <View >
            <Header
                title={`New Activity for ${title}`}
                titleStyle={{ color: "white" }}
                style={{ backgroundColor: color, marginBottom: 10 }}
                leftIcon="back"
                onLeftPress={() => {
                    navigation.goBack()
                }}
            />

            <Text>Start Time</Text>
            <TextInput
                style={styles.input}
                value={null}
                placeholder="Start Time"
                onChangeText={() => (null)}
            />

            <Text>End Time</Text>
            <TextInput
                style={styles.input}
                value={null}
                placeholder="End Time"
                onChangeText={() => (null)}
            />

            <Text>Efficiency</Text>
            <TextInput
                style={styles.input}
                value={null}
                placeholder="Efficiency"
                onChangeText={() => (null)}
            />

        <Button
          text="Save"
          onPress={saveActivity}
        />
        </View>
    )
})

const styles = {
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
}