import { Icon, IconButton } from '@react-native-material/core'
import React from 'react'
import { Text, View } from 'react-native'

export default function Header({ setOpen }) {
    return (
        <View
            style={{
                height: 40,
                paddingTop: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: "center",
                flexDirection: 'row',
                backgroundColor: ''
            }}
        >
            <IconButton
            onPress={()=>setOpen(true)}
            icon={(props)=> <Icon name={"menu"} style={{ fontSize: 30, color: 'black' }} {...props}/>}
            >

                <Icon name={"menu"} style={{ fontSize: 30, color: 'black' }} />
            </IconButton>
            {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Welcom Noor :)</Text> */}

        </View>
    )
}
