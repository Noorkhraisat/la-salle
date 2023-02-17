import { Box } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import AnnouncmentCard from '../../components/AnnouncmentCard'
import { getAnnouncmentsFromDb } from '../../utils/remindersServices'
import Spinner from 'react-native-loading-spinner-overlay';

export default function Announcments() {
    const [announcemnts, setAnnouncemnts] = useState([])
    const [loading, setLoading] = useState(true)

    const getAnnouncemnts = async () => {
        setLoading(true)
        const announcmentRes = await getAnnouncmentsFromDb()
        if (!announcmentRes?.success) {
            setLoading(false)
            return
        }
        setLoading(false)
        setAnnouncemnts(announcmentRes?.data?.announcments)
    }
    useEffect(() => {
        getAnnouncemnts()
    }, [])
    return (<>
        {
            loading ?
                <Spinner
                    visible={loading}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle
                    }
                />
                : <View
                    style={styles.container}
                >


                    <Text style={{ marginTop: 30, paddingLeft: 24, fontSize: 22, fontWeight: 'bold' }}>School Announcments</Text>


                    <Box
                        style={{
                            display: 'flex',
                            marginTop: 30,
                            justifyContent: 'space-around'
                        }}
                    >
                        {announcemnts?.length == 0
                            ? <Text>no Announcments :(</Text>

                            : <FlatList
                                style={{ marginBottom: 20 }}
                                data={announcemnts}
                                renderItem={({ item, idx }) => (
                                    <View style={{ display: "flex", alignItems: "center" }}>

                                        <AnnouncmentCard announcment={item} />

                                    </View>
                                )}
                                //Setting the number of column
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        }
                    </Box>
                </View>
        }
    </>
    )
}
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",

        display: "flex"
    },
});
