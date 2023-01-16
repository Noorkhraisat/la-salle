import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogHeader, ListItem, Text, TextInput } from '@react-native-material/core';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-material-drawer';
import { useNavigate } from 'react-router-native';
import Header from '../components/Header';
import { addSubjectToDb } from '../utils/subjectsServices';

export default function AddSubject() {
    const [values, setValues] = useState({})
    const [open, setOpen] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [dialogContent, setDialogContent] = useState('')


    const navigate = useNavigate()
    const addSubject = async () => {
        const res = await addSubjectToDb(values)
        if (!!res?.success) {
            setDialogContent(res?.data?.message)
            Alert.alert('Sucess message', res?.data?.message, [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);

        }
    }
    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            // style={styles.container}
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

            <Box
                style={{
                    width: '100%'
                }}
            >
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
                        <TextInput
                            label='teacher'
                            color='#184a99'
                            style={{ width: '100%', margin: 3 }}
                            value={values?.teacherRef}
                            onChangeText={(e) => {
                                setValues((v) => { return { ...v, teacher_r: e } })
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
        </Drawer>
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
