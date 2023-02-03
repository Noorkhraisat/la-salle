import { Box, Button, Icon, IconButton, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Linking, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLocation } from 'react-router-native';
import { addStudenthomeWroktoDb } from '../../utils/homewrokServices';
import { getDocumentAsync } from 'expo-document-picker';
import { storage } from '../../database/firebaseConfig';
import { getUserFromLocalStorage } from '../../utils/usersServices';
import { createPlan } from '../../utils/lessonsPlanning';

export default function AddNewPlan({ setOpenModal }) {
    const location = useLocation()
    let subjectId = location?.state?.subjectId
    let HomeworkData = location?.state?.HomeworkData

    const [values, setValues] = useState({})
    const addStudenthomeWrok = async () => {
        const studentData = await getUserFromLocalStorage()

        const res = await createPlan({
            ...values,
            teacher_r: { ...studentData }
        })
        if (!!res?.success) {
            Alert.alert('Sucess message', res?.data?.message, [
                { text: 'OK', onPress: () => { setOpenModal(false) } },
            ]);

        }
    }
    const pickDocument = async () => {
        try {
            let result = await getDocumentAsync({});
            // alert(result.uri);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', result?.uri, true);
                xhr.send(null);
            })

            const uploadTask = storage.ref(`lessonPlans/${result?.name}`).put(blob);
            uploadTask.on("state_changed",
                snapshot => { },
                error => {

                    console.log(error);
                },
                complete => {
                    storage.ref(`lessonPlans/${result?.name}`)
                        .getDownloadURL()
                        .then((url) => {
                            setValues({ ...values, uploadedFile: url })
                            console.log("urlurlurlurlurl::", url);


                        })

                },
            )
            console.log(result);
        } catch (e) {
            console.log(e);
            alert("test")
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
                        marginTop: 30,
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
                        display:'flex',
                        flexDirection:"row",
                        paddingLeft:16,
                        width:"100%",
                        justifyContent:"space-between",
                        alignItems:"center"
                    }}
                    >
                        <Text style={{fontSize:22,fontWeight:'bold'}}>Add new plan</Text>
                        <IconButton
                            style={{
                                marginLeft: "auto",
                                marginRight: 2
                            }}
                            onPress={() => setOpenModal(false)}
                            icon={(props) => <Icon name={"close"} style={{ fontSize: 30, color: 'black' }} {...props} />}
                        ></IconButton>

                    </Box>
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
                            label='Date'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.date}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, date: e } })
                            }}
                        />
                        <TextInput
                            label='Subject'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.subject}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, subject: e } })
                            }}
                        />

                        <TextInput
                            label='Description'
                            color='#184a99'
                            multiline
                            numberOfLines={'5'}
                            style={{ width: '100%', margin: 3 }}
                            value={values?.description}
                            onChangeText={(e) =>
                                setValues((v) => { return { ...v, description: e } })
                            }
                        />
                        <Box
                            style={{ width: '100%', margin: 3 }}

                        >
                            <Button
                                title='uploadFile'
                                color='#184a99'

                                style={{ width: '100%', margin: 3, padding: 8 }}
                                onPress={() => pickDocument()}

                            />
                            <Text>{values?.uploadedFile && "file uploaded"}</Text>
                        </Box>


                        <Button
                            title="Submit"
                            onPress={() => {
                                addStudenthomeWrok()
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
