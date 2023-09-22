import React from 'react';
import { View, Image } from 'react-native';

const TabIcon = ({ focused, iconSource }) => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: focused ? '#FFAA9B' : '',
        }}>
            <Image
                source={iconSource}
                resizeMode="contain"
                style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? 'white' : '#8A97A0',
                }}
            />
        </View>
    );
};
export default TabIcon;