import { Avatar, Box, HStack, ListItem, Text } from '@react-native-material/core';
import React, { useEffect, useState } from 'react';
import { AsyncStorage, FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-material-drawer';
import { useNavigate } from 'react-router-native';
import Card from '../components/Card';
import Header from '../components/Header';
import { services } from '../mocks/mocks';
import { getUserFromLocalStorage } from '../utils/usersServices';
export default function Dashboard() {
    const [open, setOpen] = useState(false)
    const [userType, setsetUserType] = useState('')

    const navigate = useNavigate()
    const callLocalStorage = async () => {
        const user = await getUserFromLocalStorage()
        setsetUserType(user?.role)
        console.log("user::", user);
    }
    useEffect(() => {
        callLocalStorage()
    }, [])
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
            <View
                style={styles.container}
            >


                <Image
                    style={{
                        width: '100%',
                        height: '40%'
                    }}
                    source={require('../../assets/backgroundLogo.png')}
                />
                <Box
                    style={{
                        display: 'flex',
                        marginTop: 50,
                        justifyContent: 'space-around'
                    }}
                >
                    <FlatList
                        style={{ marginBottom: 400 }}
                        data={services?.filter((item) => item?.allowedTypes?.includes(userType))}
                        renderItem={({ item, idx }) => (
                            <Card
                                title={item.name}
                                color={"#193c71"}
                                icon={"exponent"}
                            />
                        )}
                        //Setting the number of column
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </Box>
            </View>
        </Drawer>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
