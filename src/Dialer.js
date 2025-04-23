import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
    Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AddContactModal from './AddContactModal';

const Dialer = ({ checkNumber, refetchContact }) => {
    const [number, setNumber] = useState('');
    const [showAddModal, setShowAddModal] = useState(false)

    const handlePress = (digit) => {
        setNumber((prev) => prev + digit);
    };

    const handleDelete = () => {
        setNumber((prev) => prev.slice(0, -1));
    };

    const handleCall = () => {
        if (number.length > 0) {
            Linking.openURL(`tel:${number}`);
        }
    };
    const renderButton = (digit) => (
        <TouchableOpacity
            key={digit}
            style={styles.button}
            onPress={() => handlePress(digit)}
        >
            <Text style={styles.buttonText}>{digit}</Text>
        </TouchableOpacity>
    );

    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];


    useEffect(() => {
        checkNumber(number)
    }, [number])

    return (
        <>
            <AddContactModal visible={showAddModal} onClose={() => setShowAddModal(false)} onSuccess={() => refetchContact()} />
            <View style={styles.container}>
                <View style={styles.numberDisplayContainer}>
                    <Text style={styles.numberDisplay}>{number}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
                        <FontAwesome name="address-book" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.pad}>
                    {digits.map(renderButton)}
                </View>
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                        <FontAwesome name="phone" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eraseButton} onPress={handleDelete}>

                        <Entypo name="erase" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default Dialer;
const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    numberDisplayContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1,
        marginBottom: 20,
        paddingBottom: 10,
    },
    numberDisplay: {
        fontSize: 32,
        textAlign: 'center'
    },
    pad: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // backgroundColor: 'yellow',
        maxHeight: 300, // Limits the height
    },
    button: {
        width: '25%',
        marginHorizontal: 15,
        marginVertical: 5,
        aspectRatio: 1,
        backgroundColor: '#eee',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 28,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    callButton: {
        backgroundColor: '#25D366',
        height: 60,
        width: '45%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eraseButton: {
        backgroundColor: '#E33636',
        height: 60,
        width: '45%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: '#FFC107',
        height: 60,
        width: 60,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteText: {
        fontSize: 24,
        color: '#333',
    },
});

