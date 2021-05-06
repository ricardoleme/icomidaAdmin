import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import { withTheme, List, Avatar, FAB } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'
import ListaCategoria from './ListaCategoria'

function ListaCategorias({ navigation, theme }) {
    const { colors } = theme
    const [categorias, setCategorias] = useState([])
    const [carregandoCategorias, setCarregandoCategorias] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        obterCategorias()
    }, [])

    async function obterCategorias() {
        setCarregandoCategorias(true)
        let url = `${BACKEND}/categorias`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setCategorias(data)
                //console.log('Categorias obtidas com sucesso!')
            })
            .catch(function (error) {
                console.error(`Houve um problema ao obter as categorias: ${error.message}`)
            })
        setCarregandoCategorias(false)
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        try {
            await obterCategorias()
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
    }, [refreshing])

    return (
        <>
            <Header titulo="Categorias de Restaurantes" back={true} navigation={navigation} />
            <View style={{
                backgroundColor: colors.surface, paddingHorizontal: 8,
                paddingVertical: 8, flex: 1
            }}>
                <List.Subheader>
                    <Avatar.Icon size={24} icon="refresh" /> Para atualizar os dados
            </List.Subheader>

                {carregandoCategorias && <ActivityIndicator size="large" color={colors.primary} />}
                {categorias.length === 0 && !carregandoCategorias ?
                    (
                        <View style={styles.tituloAviso}>
                            <Text style={styles.titulo}>Ainda não há nenhuma categoria cadastrada.</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={categorias}
                            renderItem={({ item }) => (
                                <ListaCategoria data={item} navigation={navigation} />
                            )}
                            keyExtractor={item => item._id.toString()}
                            refreshControl={<RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh} />
                            }
                        />
                    )
                }
                <FAB
                    style={styles.fab}
                    icon='plus'
                    label=''
                    onPress={() => navigation.navigate('AdicionaCategoria', {
                        data: {
                            _id: null,
                            nome: '',
                            status: true,
                            foto: {originalname: '', path: '', size: 0, mimetype: ''}
                        }
                    })}
                />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    },

    tituloAviso: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    titulo: {
        fontSize: 20
    }
})

export default withTheme(ListaCategorias)