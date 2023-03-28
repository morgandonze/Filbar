import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Alert, FlatList, FlatListProps, Image, ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackParamList } from "../navigators"
import {
    Button,
    Header,
    ListItem,
    Text,
} from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { TextInput } from "react-native-gesture-handler"
import { useStores } from "../models"

type NavProp = StackNavigationProp<AppStackParamList, "Project">

export const EditProjectScreen: FC = observer(function EditProjectScreen() {
    const navigation: NavProp = useNavigation<NavProp>()
    const rootStore = useStores()
    const { addProject, deleteProject, currentProject: currentProjectId, activities } = rootStore;
    const project = rootStore.getProjectById(currentProjectId);
    const [title, onChangeTitle] = React.useState(project.title);


    const snowbolBlue = "#0792e3";
    const filbarPurple = "#b664b2";
    const colors = [
        { name: "snowbol blue", value: snowbolBlue },
        { name: "filbar purple", value: filbarPurple },
        { name: "goldenrod", value: "goldenrod"},
        { name: "eggplant", value: "#aa1177" },
        { name: "neon green", value: "#bbee33" },
        { name: "aqua", value: "#33bbee" },
        { name: "hot pink", value: "#ee33bb" },
        { name: "smurf", value: "#1177aa" },
        { name: "grouch", value: "#77aa11" },
        { name: "fuscia", value: "#bb77dd" },
    ]

    const [bgColor, changeBgColor] = React.useState(project.color);

    const saveProject = () => {
        project.update(title, bgColor)
        navigation.goBack();
    }

    const onDeleteProject = () => {
        Alert.alert(
            `Deleting ${project.title}`,
            "Are you sure?",
            [
                {
                    text: "Delete",
                    onPress: () => {
                        deleteProject(project.id);
                        navigation.navigate("ProjectList");
                    }
                },
                {
                    text: "Cancel",
                    onPress: null
                }
            ]
        )
    }

    return (
        <View style={$container}>
            <Header
                title={title ? title : "Edit Project"}
                style={{ backgroundColor: bgColor, marginBottom: 10 }}
                titleStyle={{ color: "white" }}
                leftIcon="back"
                onLeftPress={() => {
                    navigation.goBack()
                }}
            />

            <View style={{ marginBottom: 20 }}>
                <Text>Project Title</Text>
                <TextInput
                    style={styles.input}
                    value={null}
                    placeholder="Project Title"
                    onChangeText={onChangeTitle}
                />
            </View>

            <View style={{ marginBottom: 20 }}>
                <Text>Color</Text>
                <FlatList
                    horizontal={true}
                    data={colors}
                    renderItem={color => (
                        <TouchableOpacity
                            style={{
                                backgroundColor: color.item.value,
                                flex: 1,
                                padding: 40,
                                borderWidth: color.item.value == bgColor ? 3 : 0,
                                borderColor: '#fff'
                            }}
                            onPress={() => {
                                changeBgColor(color.item.value)
                            }}
                        />
                    )}
                />
            </View>

            <View>
                <Button
                    text="Save Project"
                    onPress={saveProject}
                />
            </View>

            <View>
                <Button
                    text="Delete Project"
                    onPress={onDeleteProject}
                    textStyle={{ color: "red" }}
                />
            </View>
        </View>
    )
})

const $container: ViewStyle = {
    flex: 1,
    backgroundColor: colors.background,
}

const styles = {
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
}
