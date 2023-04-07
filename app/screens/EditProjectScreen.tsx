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
import { projectColors } from "../theme/projectColors"
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
                    numColumns={4}
                    data={Object.entries(projectColors)}
                    renderItem={(color) => {
                        let value = color.item[1]//.slice(1,-1);
                        return (

                            <View
                                style={{
                                    padding: 3,
                                    flex: 1,
                                    backgroundColor: value == bgColor ? "white" : value,
                                    maxWidth: "25%",
                                    height: 100,
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: value,
                                        flex: 1,
                                        // padding: 40,
                                        borderColor: '#fff'
                                    }}
                                    onPress={() => {
                                        changeBgColor(value)
                                    }}
                                />
                            </View>
                        )
                    }}
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
