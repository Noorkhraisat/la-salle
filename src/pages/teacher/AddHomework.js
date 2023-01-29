import { Box, Button, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLocation } from 'react-router-native';
import { addHomewrokToDb } from '../../utils/homewrokServices';
import { getSubjectsByTeacherRef } from '../../utils/subjectsServices';
import { getUserFromLocalStorage } from '../../utils/usersServices';
export default function AddHomework({ setOpenModal }) {
    const location = useLocation()
    let subjectId = location?.state?.subjectId
    const [values, setValues] = useState({})
    const [openDropDown, setOpenDropdown] = useState(false)
    const [teacherData, setTeacherData] = useState()
    const [subjects, setSubjects] = useState([])
    const [subjectsData, setSubjectsData] = useState([])


    const addHomewrok = async () => {
        console.log("testttt::", subjectsData);
        console.log("testttt::", subjectsData?.find((item) => item?.id == values?.subject));

        const res = await addHomewrokToDb({
            teacher_r: teacherData,
            ...values,
            subject_r: subjectsData?.find((item) => item?.id == values?.subject)
        })
        if (!!res?.success) {
            Alert.alert('Sucess message', res?.data?.message, [
                { text: 'OK', onPress: () => { } },
            ]);

        }
    }
    const getSubjects = async () => {
        try {
            console.log("test33");
            const userData = await getUserFromLocalStorage()
            setTeacherData(userData)
            const subjects = await getSubjectsByTeacherRef(userData?.id)
            if (!subjects?.success) {
                console.log("errs::", subjects?.message);
                Alert.alert('Message', subjects?.message, [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                return
            }
            console.log("test44::", subjects?.data?.users);
            setSubjectsData(subjects?.data?.subjects)
            setSubjects(subjects?.data?.subjects?.map(subject => { return { value: subject?.id, label: (subject?.name || 'test') } }))
        } catch (e) {
            console.log("test", e);
        }
    }
    useEffect(() => {
        getSubjects()
    }, [])
    return (
        <KeyboardAwareScrollView>
            <Box
                style={{
                    width: '100%'
                }}
            >

                <View style={
                    {
                        marginTop:40,
                        width: '100%',
                        height: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }
                }
                >
                    <Button
                        title="close"
                        onPress={() => setOpenModal(false)}
                    ></Button>
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
                        <DropDownPicker
                            open={openDropDown}
                            value={values?.subject}
                            labelProps={'ss'}
                            items={subjects}
                            placeholder="Subject"
                            setOpen={(e) => setOpenDropdown(e)}
                            setValue={
                                (e) => setValues((v) => { return { ...v, subject: e() } })
                            }
                            // setItems={setItems}
                            placeholderStyle={{
                                color: "black",
                                paddingLeft: 6,
                                fontSize: 16
                            }}
                            theme="LIGHT"
                            multiple={false}

                            style={{
                                width: '100%',
                                backgroundColor: '#f9f9f9',
                                borderRadius: '1px',
                                borderColor: "white",
                                borderBottomColor: "grey",
                                margin: 3
                            }}
                        />

                        <TextInput
                            label='Homework title'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.title}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, title: e } })
                            }}
                        />
                        <TextInput
                            label='homewrok Description'
                            color='#184a99'
                            numberOfLines={'5'}
                            style={{ width: '100%', margin: 3 }}
                            value={values?.description}
                            onChangeText={(e) =>
                                setValues((v) => { return { ...v, description: e } })
                            }
                        />

                        <TextInput
                            label='Due date'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.dueDate}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, dueDate: e } })
                            }}
                        />


                        <Button
                            title="Add Homework"
                            onPress={() => {
                                addHomewrok()
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
    )
}
