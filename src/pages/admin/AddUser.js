import { Box, Button, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigate } from 'react-router-native';
import firebase from '../../database/firebaseConfig';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function AddUser() {
    const [values, setValues] = useState({})
    const [open, setOpen] = useState(false)

    const data = [
        { label: 'Student', value: '1' },
        { label: 'Teacher', value: '2' },
        { label: 'Admin', value: '3' },
    ];
    const dbRef = firebase.firestore().collection('users');
    const addUser = () => {
        dbRef.add({
            ...values
        }).then((res) => {
            setValues({})

        })
            .catch((err) => {
                console.error("Error found: ", err);

            });
    }
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
                        label='fullName'
                        color='#184a99'
                        style={{ width: '100%', margin: 3 }}
                        value={values?.name}
                        onChangeText={(e) => {
                            setValues((v) => { return { ...v, name: e } })
                        }}
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
                    <DropDownPicker
                        open={open}
                        value={values?.role}
                        labelProps={'ss'}
                        items={data}
                        placeholder="role"
                        setOpen={setOpen}
                        setValue={
                            (e) => setValues((v) => { return { ...v, role: e() } })
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
                        label='grade'
                        color='#184a99'
                        style={{ width: '100%', margin: 3 }}
                        value={values?.grade}
                        onChangeText={(e) => {
                            setValues((v) => { return { ...v, grade: e } })
                        }}
                    />
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
