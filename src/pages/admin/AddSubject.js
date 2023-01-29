import { Box, Button, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigate } from 'react-router-native';
import { addSubjectToDb } from '../../utils/subjectsServices';
import { getStudentsByRole } from '../../utils/usersServices';

export default function AddSubject() {
    const [values, setValues] = useState({})
    const [open, setOpen] = useState(false)
    const [dialogContent, setDialogContent] = useState('')
    const [teachers, setTeachers] = useState([])

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
            setTeachers(teachers?.data?.users?.map(user => { return { value: user?.id, label: (user?.name || 'test') } }))
        } catch (e) {
            console.log("test", e);
        }
    }
    const addSubject = async () => {
        const res = await addSubjectToDb(values)
        if (!!res?.success) {
            setDialogContent(res?.data?.message)
            Alert.alert('Sucess message', res?.data?.message, [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
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
                            label='Subject Name'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.name}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, name: e } })
                            }}
                        />
                        <TextInput
                            label='grade'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.grade}
                            onChangeText={(e) =>
                                setValues((v) => { return { ...v, grade: e } })
                            }
                        />


                        <DropDownPicker
                            open={open}
                            value={values?.teacher_r}
                            items={teachers}
                            placeholder="Teacher"
                            setOpen={setOpen}
                            setValue={
                                (e) => setValues((v) => { return { ...v, teacher_r: e() } })

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
