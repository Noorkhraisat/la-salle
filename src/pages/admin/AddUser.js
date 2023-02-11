import { Box, Button, Text, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigate } from 'react-router-native';
import firebase from '../../database/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { grades } from '../../mocks/mocks';
import SelectDropdown from 'react-native-select-dropdown';
import { getStudentsByRole, getUserBySpecialNumberAndPassword } from '../../utils/usersServices';

export default function AddUser() {
    const [values, setValues] = useState({})
    const [students, setStudents] = useState([])
    const navigate = useNavigate()

    const data = [
        { label: 'Student', value: '1' },
        { label: 'Teacher', value: '2' },
        { label: 'Admin', value: '3' },
        { label: 'Head of section', value: '4' },
        { label: 'Director', value: '5' },
        { label: 'parent', value: '6' },



    ];
    const sections = [
        { label: 'section1', value: '1' },
        { label: 'section2', value: '2' },
        { label: 'section3', value: '3' },
        { label: 'section4', value: '4' },

    ];
    const dbRef = firebase.firestore().collection('users');
    const addUser = () => {
        console.log(values);
        if (values?.role == '1') { values.section = null }
        if (values?.role == '2') { values.grade = null }

        dbRef.add({
            ...values
        }).then((res) => {
            setValues({})
            Alert.alert('Sucess message', res?.data?.message, [
                { text: 'OK', onPress: () => navigate('/Dashboard') },
            ]);

        })
            .catch((err) => {
                console.error("Error found: ", err);

            });
    }
    const getStudents = async () => {
        const studentsRes = await getStudentsByRole({ role: '1' })
        if (!studentsRes?.success) { return }
        setStudents(studentsRes?.data?.users)
    }
    useEffect(() => {
        getStudents()
    }, [])
    return (
        <KeyboardAwareScrollView>

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
                <Text style={{ marginTop: 30, paddingLeft: 16, fontSize: 22, fontWeight: 'bold' }}>Add new user</Text>

                <Box
                    style={{
                        alignSelf: 'start',
                        height: '70%',
                        display: 'flex',
                        padding: 16,
                        width: '100%',
                        alignItems: 'center'
                    }}
                >


                    <TextInput
                        label='full Name'
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
                        defaultButtonText='Select Role'
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem);
                            setValues((v) => { return { ...v, role: selectedItem.value } })

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
                        data={data}
                    />



                    <TextInput
                        label='Special Number'
                        color='#184a99'
                        style={{ width: '100%', margin: 3 }}
                        value={values?.specialNumber}
                        onChangeText={(e) =>
                            setValues((v) => { return { ...v, specialNumber: e } })
                        }
                    />

                    {
                        values?.role == '2' || values?.role == '4' || values?.role == '1'
                        && <SelectDropdown
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
                            defaultButtonText='Select section'
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem);
                                setValues((v) => { return { ...v, section: selectedItem.value } })

                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem.label
                            }}
                            rowTextForSelection={(item, index) => {
                                return item.label
                            }}
                            data={sections}
                        />
                    }
                    {values?.role == '1'
                        && <SelectDropdown
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
                    }
                    {values?.role == '6'
                        && <SelectDropdown
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
                            defaultButtonText='Select Child'
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem);
                                setValues((v) => { return { ...v, child: selectedItem } })

                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return item.name + " | " + item.specialNumber
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.name + " | " + item.specialNumber
                            }}
                            data={students}
                        />
                    }
                    <TextInput
                        color='#184a99'
                        label='password'
                        value={values?.password}
                        secureTextEntry={true}
                        style={{ width: '100%', margin: 3 }}
                        onChangeText={(e) => {
                            setValues((v) => { return { ...v, password: e } })

                        }}
                    />
                    <Button
                        title={'Add user'}
                        onPress={() => {
                            addUser()
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
        </KeyboardAwareScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        alignItems: 'center',
        color: 'white',
        justifyContent: 'center',
    },
});
