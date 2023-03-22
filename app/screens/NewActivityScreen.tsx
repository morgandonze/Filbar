import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { TextInput, View } from "react-native";
import { Button, Header, Text } from "../components";
import { AppStackParamList } from "../navigators";
import { ProjectListScreen } from "./ProjectListScreen";
import React, { useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { useStores } from "../models";
import { FlatList } from "react-native-gesture-handler";


type NavProp = StackNavigationProp<AppStackParamList, "NewActivity">

export const NewActivityScreen: FC = observer(function NewActivityScreen() {
    const navigation: NavProp = useNavigation<NavProp>()
    const rootStore = useStores();

    const [showDatePickers, setShowDatePickers] = useState(false)
    const [startOpen, setStartOpen] = useState(false)
    const [endOpen, setEndOpen] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [value, setValue] = useState(1);
    // useEffect(() => { }, [value])

    const project = rootStore.getProjectById(rootStore.currentProject);
    const { id: projectId, color, title } = project;
    const sizeValues = {
        "XS": 1,
        "S": 2,
        "M": 3,
        "L": 5,
        "XL": 8,
        "XXL": 13,
    }

    const saveActivity = () => {
        rootStore.addActivity(Date.now(), value, projectId);
        navigation.goBack();
    }

    const renderDatePickers = () => (
        <>
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
        </>
    )

    const renderActivitySizes = () => (
        <View style={{ marginBottom: 40 }}>
            <FlatList
                data={Object.entries(sizeValues)}
                contentContainerStyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
                renderItem={({ item }) => {
                    const size = item[0]
                    const thisValue = item[1]
                    return <Button text={size} onPress={() => {
                        setValue(thisValue)
                    }} style={{
                        flex: 1,
                        backgroundColor: value == thisValue ? project.color : '#fff'
                    }} />
                }}
            />
        </View>
    )

    return (
        <View >
            <Header
                title={`New Activity for ${title}`}
                titleStyle={{ color: "white" }}
                style={{ backgroundColor: color, marginBottom: 40 }}
                leftIcon="back"
                onLeftPress={() => {
                    navigation.goBack()
                }}
            />

            {showDatePickers && renderDatePickers()}

            {renderActivitySizes()}

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