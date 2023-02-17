
import { Avatar, Box, ListItem, Text } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Drawer } from 'react-native-material-drawer';
import { useNavigate } from 'react-router-native';
import { services } from '../mocks/mocks';
import { getUserFromLocalStorage, logoutUser } from '../utils/usersServices';
import Header from './Header';
export default function LoggedInContainer({ children }) {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({})


    const navigate = useNavigate()
    const getUserData = async () => {
        const user = await getUserFromLocalStorage()
        if (!user?.email && !user?.specialNumber) {
            navigate('/login')
        }
        setUser(user)
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
                            marginRight: 8,
                            marginBottom: 20
                        }}
                    >
                        <Avatar style={{ marginRight: 8, marginLeft: 8 }} color='black' label={user?.name} />
                        <Text>{user?.name}</Text>
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
                        title='All Students'
                        onPress={() => {
                            navigate("/AllStudents");
                            setOpen(false)
                        }
                        }

                    />

                    {
                        services?.filter((item) => item?.allowedTypes?.includes(user?.role)).map((item) => {
                            return <ListItem
                                title={item?.name}
                                onPress={async () => {
                                    await logoutUser()
                                    navigate(item?.navigation);
                                    setOpen(false)
                                }}

                            />
                        })
                    }

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
