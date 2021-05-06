import React, { useState } from 'react'
import { View, Text, Image, Alert, StyleSheet } from 'react-native'
import { withTheme, Caption, TextInput } from 'react-native-paper'
import Header from '../components/Header'
import { BACKEND } from '../constants'

function AdicionaCategoria({navigation, route, theme}){
    const { colors } = theme
    const [nome, setNome] = useState('')

    return (
        <>
        <Header titulo="Cadastro de Categorias" back={true} navigation={navigation} />
        <View style={{flex:1, backgroundColor: colors.surface,
        paddingHorizontal: 24, paddingVertical: 24}}>
        <Caption>Informações da Categoria</Caption>
        <TextInput
          label="Nome da Categoria"
          name="nome"
          value={nome}
          mode='outlined'
          onChangeText={setNome}
          />


        </View>
        </>
    )
}

export default withTheme(AdicionaCategoria)