import { Box, Button, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLocation } from 'react-router-native';
import { createMark } from '../../utils/marksServices';
export default function AddMark({ subjectData, studentData, setOpenModal }) {
    const location = useLocation()

    const [values, setValues] = useState({})
    // const [open, setOpen] = useState(false)
    const addMark = async () => {
        let markBody = {
            student_r: studentData,
            subject_r: subjectData,
            teacher_r: {}, //will be from local storage
            mark: values?.mark,
            examType: values?.examType
            ,

        }
        const res = await createMark(markBody)
        if (!!res?.success) {
            Alert.alert('Sucess message', res?.data?.message, [
                { text: 'OK', onPress: () => { setOpenModal(false) } },
            ]);

        }
    }
    return (
        <KeyboardAwareScrollView>
            <Box
                style={{
                    width: '100%'
                }}
            >

                <View style={
                    {
                        width: '100%',
                        height: '80%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
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
                            label='student'
                            color='#184a99'
                            readOnly
                            style={{ width: '100%', margin: 3 }}
                            value={studentData?.name}
                        />
                        <TextInput
                            label='subject'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={subjectData?.name}
                        />
                        <TextInput
                            label='exam type (quiz, first,second, final)'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.examType}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, examType: e } })
                            }}
                        />

                        <TextInput
                            label='mark'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.mark}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, mark: e } })
                            }}
                        />
                        <Button
                            title="Add Mark"
                            onPress={() => {
                                addMark()
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
