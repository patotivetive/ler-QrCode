import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Produto } from '../interfaces/Produto';

interface ListaProdutosProps {
  produtos: Produto[];
  codigoDestacado: string | undefined;
}

export default function ListaProdutos({ produtos, codigoDestacado }: ListaProdutosProps) {
  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.codigo}
      extraData={codigoDestacado}
      contentContainerStyle={styles.conteudo}
      ListHeaderComponent={<Text style={styles.tituloLista}>Produtos cadastrados</Text>}
      renderItem={({ item }) => {
        const destacado = item.codigo === codigoDestacado;
        return (
          <View style={[styles.item, destacado && styles.itemDestacado]}>
            <Text style={[styles.nome, destacado && styles.textoDestacado]}>{item.nome}</Text>
            <Text style={[styles.codigo, destacado && styles.textoDestacado]}>{item.codigo}</Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  conteudo: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  tituloLista: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#101828',
    marginTop: 16,
    marginBottom: 8,
  },
  item: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eaecf0',
  },
  itemDestacado: {
    backgroundColor: '#12b76a',
    borderColor: '#027a48',
  },
  nome: {
    fontSize: 15,
    color: '#101828',
  },
  codigo: {
    fontSize: 13,
    color: '#667085',
    marginTop: 2,
  },
  textoDestacado: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});