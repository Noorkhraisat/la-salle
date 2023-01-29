
import { Avatar, Box, ListItem, Text } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Drawer } from 'react-native-material-drawer';
import { useNavigate } from 'react-router-native';
import { getUserFromLocalStorage, logoutUser } from '../utils/usersServices';
import Header from './Header';
export default function LoggedInContainer({ children }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const getUserData = async () => {
        const user = await getUserFromLocalStorage()
        if (!user?.email && !user?.specialNumber) {
            navigate('/login')
        }
    }
    useEffect(() => {
        getUserData()
    }, [])
    return (
        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            style={{ width: "100%", height: "100%" }}
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
                        title='profile'
                        onPress={() => {
                            navigate("/Profile");
                            setOpen(false)
                        }
                        }

                    />
                    <ListItem
                        title='Home'
                        onPress={() => {
                            navigate("/Dashboard");
                            setOpen(false)
                        }
                        }

                    />
                     <ListItem
                        title='/GetStudentsBySubject'
                        onPress={() => {
                            navigate("/GetStudentsBySubject");
                            setOpen(false)
                        }
                        }

                    />
                    <ListItem
                        title='/getSubjectsByTeacher'
                        onPress={() => {
                            navigate("/getSubjectsByTeacher");
                            setOpen(false)
                        }
                        }

                    />
                    <ListItem
                        title='add user'
                        onPress={() => {
                            navigate("/AddUser");
                            setOpen(false)
                        }
                        }

                    />
                    <ListItem
                        title='add subject'
                        onPress={() => {
                            navigate("/AddSubject");
                            setOpen(false)
                        }
                        }

                    />
                    <ListItem
                        title='add reminders'
                        onPress={() => {
                            navigate("/addAnnouncment");
                            setOpen(false)
                        }
                        }

                    /> 
                     <ListItem
                        title='StudentSubjects'
                        onPress={() => {
                            navigate("/StudentSubjects");
                            setOpen(false)
                        }
                        }

                    />
                    <ListItem
                        title='logout'
                        onPress={async () => {
                            await logoutUser()
                            navigate("/login");
                            setOpen(false)
                        }}

                    />

                </ScrollView>
            }
            animationTime={250}>
            <Header setOpen={setOpen} />
            {children}
        </Drawer>
    )
}
