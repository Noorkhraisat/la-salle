import { Icon, IconButton } from '@react-native-material/core'
import React from 'react'
import { Text, View } from 'react-native'

export default function Header({ setOpen }) {
    return (
        <View
            style={{
                marginTop: -50,
                height: 90,
                paddingLeft:16,
                paddingRight:16,

                paddingTop: 40,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: "#193c71",
                alignItems: "center",
                flexDirection: 'row',
            }}
        >
            <IconButton
                onPress={() => setOpen(true)}
                icon={(props) => <Icon name={"menu"} style={{ fontSize: 30, color: 'white' }} {...props} />}
            >

                <Icon name={"menu"} style={{ fontSize: 30, color: 'black' }} />
            </IconButton>

            <Text style={{ color: 'white', fontSize: 18}}>noor khraisat</Text>
            {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Welcom Noor :)</Text> */}

        </View>
    )
}
