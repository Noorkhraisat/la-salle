import { Avatar, Box, Button, ListItem, Text, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-material-drawer';
import { useNavigate } from 'react-router-native';
import Header from '../components/Header';
import firebase from '../database/firebaseConfig';

export default function AddUser() {
    const [values, setValues] = useState({})
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
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
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            style={styles.container}
            useNativeDriver={'true'}
            drawerContent={
                <ScrollView
                    style={{
                        marginTop: 60,
                    }}
                >
                    <Box
                        style={{
                            flexDirection: "row",
                            alignItems: 'center',
                            marginRight: 8
                        }}
                    >
                        <Avatar style={{ marginRight: 8, marginLeft: 8 }} color='grey' label={"noor khraisat"} />
                        <Text>Noor Khraisat</Text>
                    </Box>
                    <ListItem
                        title='logout'
                        onPress={() => navigate("/login")}

                    />
                </ScrollView>
            }
            animationTime={250}>
            <Header setOpen={setOpen} />

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
                    <TextInput
                        label='Role'
                        color='#184a99'
                        style={{ width: '100%', margin: 3 }}
                        value={values?.role}
                        onChangeText={(e) => {
                            setValues((v) => { return { ...v, role: e } })
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
                        title="Add User"
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
        </Drawer>
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
