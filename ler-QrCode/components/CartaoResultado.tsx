import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Produto } from '../interfaces/Produto';

interface CartaoResultadoProps {
  codigoLido: string | null;
  produto: Produto | undefined;
  onEscanearNovamente: () => void;
}

function formatarPreco(preco: number): string {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

export default function CartaoResultado({
  codigoLido,
  produto,
  onEscanearNovamente,
}: CartaoResultadoProps) {
  if (codigoLido === null) {
    return (
      <View style={[styles.cartao, styles.cartaoAguardando]}>
        <Text style={styles.textoAguardando}>Aponte para um código de barras</Text>
      </View>
    );
  }

  return (
    <View style={[styles.cartao, produto ? styles.cartaoEncontrado : styles.cartaoNaoEncontrado]}>
      {produto ? (
        <>
          <Text style={[styles.titulo, styles.tituloEncontrado]}>✅ Produto encontrado</Text>
          <Text style={styles.nome}>{produto.nome}</Text>
          <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
        </>
      ) : (
        <>
          <Text style={[styles.titulo, styles.tituloNaoEncontrado]}>❌ Produto não encontrado</Text>
          <Text style={styles.codigo}>Código lido: {codigoLido}</Text>
        </>
      )}

      <Pressable
        style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        onPress={onEscanearNovamente}
      >
        <Text style={styles.textoBotao}>Escanear novamente</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  cartaoAguardando: {
    backgroundColor: '#f2f4f7',
    borderColor: '#d0d5dd',
    alignItems: 'center',
  },
  cartaoEncontrado: {
    backgroundColor: '#ecfdf3',
    borderColor: '#12b76a',
  },
  cartaoNaoEncontrado: {
    backgroundColor: '#fef3f2',
    borderColor: '#f04438',
  },
  textoAguardando: {
    fontSize: 16,
    color: '#475467',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  tituloEncontrado: {
    color: '#027a48',
  },
  tituloNaoEncontrado: {
    color: '#b42318',
  },
  nome: {
    fontSize: 16,
    color: '#101828',
  },
  preco: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#101828',
    marginTop: 4,
  },
  codigo: {
    fontSize: 16,
    color: '#101828',
  },
  botao: {
    marginTop: 12,
    backgroundColor: '#1d4ed8',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoPressionado: {
    opacity: 0.8,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});