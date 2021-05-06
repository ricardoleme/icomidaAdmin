import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { BACKEND, SIZES } from '../constants'

import { List, withTheme, Avatar } from 'react-native-paper'

function ListaCategoria({ data, navigation, theme }) {
    const { colors } = theme
    const renderizaImagem = (uri) => {
        return (
          <Image
            style={{ width: 50, height: 50, marginTop: -65, marginLeft: 5 }}
            source={{ uri }}
          />
        )
      }

    function botaoLadoDireito() {
        return (
            <View>
                <TouchableOpacity style={styles.botaoApagar}
                    onPress={confirmaExclusaoRegistro}>
                    <Avatar.Icon size={24} icon="delete" style={{ backgroundColor: colors.background }} />
                    <Text style={{ color: colors.text }}>Excluir</Text>
                </TouchableOpacity>
            </View>
        )
    }

    async function confirmaExclusaoRegistro() {
        try {
            Alert.alert('Atenção!', 'Deseja mesmo excluir esta categoria?', [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', style: 'cancel' } //implementar a exclusão
            ])
        } catch (response) {
            Alert.alert(response.data.error)
        }
    }

    return (
        <>
            <Swipeable renderRightActions={botaoLadoDireito}>
                <TouchableOpacity styles={styles.container}
                    onPress={() => alteraCategoria(data)}
                >
                    <View style={{
                        flex: 1, justifyContent: 'center', backgroundColor: colors.background,
                        borderRadius: 20, margin: 8
                    }}>
                        <List.Item
                            title={data.nome}
                            description={`status: ${data.status}`}
                            leftAvatar={{ source: { uri: `${BACKEND}/${data.foto.path}` } }}
                            left={props => <List.Icon {...props} icon="image" />}
                        />
  {renderizaImagem(`${BACKEND}/${data.foto.path}`)}
                    </View>
                </TouchableOpacity>
            </Swipeable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        height: 100,
        borderRadius: 8,
        marginBottom: 2,
        marginHorizontal: 8
    },
    botaoApagar: {
        backgroundColor: '#d9534f',
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderTopEndRadius: SIZES.borderRadius,
        borderBottomEndRadius: SIZES.borderRadius
    }
})

export default withTheme(ListaCategoria)