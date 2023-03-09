import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { TextInput, View } from "react-native";
import { Button, Header, Text } from "../components";
import { AppStackParamList } from "../navigators";
import { ProjectListScreen } from "./ProjectListScreen";
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'


type NavProp = StackNavigationProp<AppStackParamList, "NewActivity">

export const NewActivityScreen: FC = observer(function NewActivityScreen(props: any) {
    const navigation: NavProp = useNavigation<NavProp>()
    const { params: { id: projectId, color, title } } = props.route
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [startOpen, setStartOpen] = useState(false)
    const [endOpen, setEndOpen] = useState(false)
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

            <Button text="Pick Start Date" onPress={() => setStartOpen(true)} />
            <DatePicker
                modal
                open={startOpen}
                date={startDate}
                onConfirm={(date) => {
                    setStartOpen(false)
                    setStartDate(date)
                }}
                onCancel={() => {
                    setStartOpen(false)
                }}
            />
            <Text>{`${startDate}`}</Text>

            <Button text="Pick End Date" onPress={() => setEndOpen(true)} />
            <DatePicker
                modal
                open={endOpen}
                date={endDate}
                onConfirm={(date) => {
                    setEndOpen(false)
                    setEndDate(date)
                }}
                onCancel={() => {
                    setEndOpen(false)
                }}
            />
            <Text>{`${endDate}`}</Text>

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