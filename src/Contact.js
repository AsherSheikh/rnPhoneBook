import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Contact = ({ contact }) => {
    const handlePress = async (contact) => {
    }

    const getColorForName = (name) => {
        const colors = [
            '#F28B82', '#FBBC04', '#FFF475', '#CCFF90', '#A7FFEB',
            '#CBF0F8', '#AECBFA', '#D7AEFB', '#FDCFE8', '#E6C9A8',
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash % colors.length);
        return colors[index];
    };

    const dialNumber = (phoneNumber) => {
        let url = `tel:${phoneNumber}`;
        Linking.openURL(url);
        // Linking.canOpenURL(url)
        //     .then((supported) => {
        //         if (!supported) {
        //             Alert.alert('Phone number is not available');
        //         } else {
        //             return Linking.openURL(url);
        //         }
        //     })
        //     .catch((err) => console.error('Error dialing:', err));
    };


    return (
        <TouchableOpacity onPress={() => handlePress(contact)} style={styles.contactCon}>
            <View style={{ ...styles.imgCon, backgroundColor: getColorForName(contact?.givenName || 'Unknown') }}>
                <Text style={styles.txt}>{contact?.givenName[0]}</Text>
            </View>
            <View style={styles.contactDat}>
                <Text style={styles.name}>
                    {contact?.givenName} {contact?.middleName && contact.middleName + ' '}
                    {contact?.familyName}
                </Text>
                <Text style={styles.phoneNumber}>
                    {contact?.phoneNumbers[0]?.number}
                </Text>
            </View>
            <TouchableOpacity onPress={() => dialNumber(contact?.phoneNumbers[0]?.number)} style={styles.dialCon}>
                <Ionicons size={20} color={'#fff'} name={'call'} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contactCon: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d9d9d9',
        alignItems: 'center'
    },
    imgCon: {
        borderRadius: 30, width: 55,
        height: 55, overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialCon: {
        borderRadius: 100, width: 40,
        height: 40, overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34C759'
    },

    contactDat: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    txt: {
        fontSize: 18,
        color: '#000'
    },
    name: {
        fontSize: 16,
        color: '#000'
    },
    phoneNumber: {
        color: '#888',
    },
});
export default Contact;