import { StyleSheet } from 'react-native';
import colors from '@parkyourself-frontend/shared/config/colors';

const globalStyles = StyleSheet.create({
    // example in profile screen dashboard

    // use for touableOpacity
    listItemWrapperNoBorder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    listItemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1
    }
});

const heading = StyleSheet.create({
    screen: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: colors.secondary,
        paddingTop: 5,
    },
    section: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#B2B2B2',
        fontSize: 18,
        marginTop: 30,
    }
});

const menu = StyleSheet.create({
    title: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#121212',
        fontSize: 18
    },
    subtitle: {
        fontFamily: 'Montserrat-Regular',
        color: '#5a5a5a',
        paddingTop: 5,
        fontSize: 14
    },
    text: {
        fontFamily: 'Helvetica',
        letterSpacing: 0.4,
        color: '#121212',
        fontSize: 16,
        marginLeft: 24
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: 1
    },
    wrapperNoBorder: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center'
    },
    wrapperInner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
});

const icons = StyleSheet.create({
    arrowIcon: {
        color: '#B2B2B2',
        fontSize: 14
    },
    menuLabelIcon: {
        color: '#121212',
        fontSize: 22,
        maxWidth: 25
    }
});

const buttons = StyleSheet.create({
    // example in profile screen dashboard
    save: {
        minWidth: 100,
        elevation: 0,
        marginTop: 10,
        backgroundColor: colors.secondary,
        paddingVertical: 12,
        borderRadius: 30
    },
    cancel: {
        color: 'black',
        minWidth: 100,
        elevation: 0,
        marginTop: 10,
        backgroundColor: '#6c757D',
        paddingVertical: 12,
        borderRadius: 30,
        marginRight: 10
    },
    delete: {
        minWidth: 100,
        elevation: 0,
        marginTop: 10,
        backgroundColor: colors.error,
        paddingVertical: 12,
        borderRadius: 30,
        marginLeft: 10
    },
    create: {
        minWidth: 120,
        elevation: 0,
        marginTop: 10,
        backgroundColor: colors.secondary,
        paddingVertical: 12,
        borderRadius: 30
    },
    text: {
        fontFamily: 'Montserrat-Medium',
        color: 'white',
        textAlign: 'center'
    },
});

export { globalStyles, buttons, icons, menu, heading } 