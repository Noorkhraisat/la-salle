import { Box, Button, Icon, Text, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigate } from 'react-router-native';
import { grades } from '../../mocks/mocks';
import { addSubjectToDb } from '../../utils/subjectsServices';
import { getStudentsByRole } from '../../utils/usersServices';

export default function AddSubject() {
    const [values, setValues] = useState({})
    const [open, setOpen] = useState(false)
    const [openGrade, setOpenGrade] = useState(false)

    const [dialogContent, setDialogContent] = useState('')
    const [teachers, setTeachers] = useState([])
    const [teachersAlData, setTeachersAllData] = useState([])

    const navigate = useNavigate()
    const getTeachers = async () => {
        try {
            console.log("test33");
            const teachers = await getStudentsByRole({ role: "2" })
            if (!teachers?.success) {
                console.log("errs::", teachers?.message);
                Alert.alert('Message', teachers?.message, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                return
            }
            console.log("test44::", teachers?.data?.users);
            setTeachersAllData(teachers?.data?.users)
            setTeachers(teachers?.data?.users?.map(user => { return { value: user?.id, label: (user?.name || 'test') } }))
        } catch (e) {
            console.log("test", e);
        }
    }
    const addSubject = async () => {
        console.log("addSubject::", values);
        const data = {
            ...values,
            teacher_r: teachersAlData?.find((item) => values?.teacher_r == item?.id)

        }
        const res = await addSubjectToDb(data)
        if (!!res?.success) {
            setDialogContent(res?.data?.message)
            Alert.alert('Sucess message', res?.data?.message, [
                { text: 'OK', onPress: () => navigate('/Dashboard') },
            ]);

        }
    }
    useEffect(() => {
        console.log("test");
        getTeachers()
    }, [])
    return (
        <KeyboardAwareScrollView>

            <Box
                style={{
                    width: '100%',
                    alignItems: "center"
                }}
            >
                <Text style={{ marginTop: 30, paddingLeft: 16, fontSize: 22, fontWeight: 'bold' }}>Add Subject</Text>

                <View style={
                    {
                        width: '100%',
                        height: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'center',
                        marginTop: 20
                    }
                }
                >

                    <Box
                        style={{
                            alignSelf: 'center',
                            height: '60%',
                            display: 'flex',
                            padding: 16,
                            width: '100%',
                            alignItems: 'center'
                        }}
                    >

                        <TextInput
                            label='Subject Name'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.name}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, name: e } })
                            }}
                        />


                        <SelectDropdown
                            buttonStyle={{
                                width: '100%',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '1px',
                                borderColor: "white",
                                borderBottomColor: "red",
                                margin: 8,

                            }}
                            buttonTextStyle={{
                                textAlign: 'start',
                                fontSize: 15,
                            }}
                            defaultButtonText='Select Grade'
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem);
                                setValues((v) => { return { ...v, grade: selectedItem.value } })

                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.label
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.label
                            }}
                            data={grades}
                        />
                        <SelectDropdown
                            buttonStyle={{
                                width: '100%',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '1px',
                                borderColor: "white",
                                borderBottomColor: "red",
                                margin: 8,

                            }}
                            buttonTextStyle={{
                                textAlign: 'start',
                                fontSize: 15,
                            }}
                            defaultButtonText='Select Teacher'
                            onSelect={(selectedItem, index) => {
                                setValues((v) => { return { ...v, teacher_r: selectedItem.value } })

                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.label
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.label
                            }}
                            data={teachers}
                        />

                        <Button
                            title="Add Subject"
                            onPress={() => {
                                addSubject()
                            }}
                            style={{
                                margin: 24,
                                padding: 8,
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                backgroundColor: "#193c71"
                            }}
                        />
                    </Box>

                    <StatusBar style="auto" />
                </View>

            </Box>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        margin: 16,
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        alignItems: 'center',
        color: 'white',
        width: "100%",
        justifyContent: 'center',
    },
});
