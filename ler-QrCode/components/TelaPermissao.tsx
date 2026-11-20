import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

interface TelaPermissaoProps {
  podePerguntarDeNovo: boolean;
  onPedirPermissao: () => void;
}

export default function TelaPermissao({ podePerguntarDeNovo, onPedirPermissao }: TelaPermissaoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Precisamos da sua câmera 📷</Text>
      <Text style={styles.texto}>
        O "Tem na lista?" usa a câmera do celular para ler o código de barras dos produtos e
        verificar se eles estão cadastrados. Nenhuma foto é salva.
      </Text>

      {podePerguntarDeNovo ? (
        <Pressable style={styles.botao} onPress={onPedirPermissao}>
          <Text style={styles.textoBotao}>Permitir câmera</Text>
        </Pressable>
      ) : (
        <>
          <Text style={styles.aviso}>
            O acesso à câmera foi negado. Libere a permissão nas configurações do celular.
          </Text>
          <Pressable style={styles.botao} onPress={() => Linking.openSettings()}>
            <Text style={styles.textoBotao}>Abrir configurações</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#101828',
    marginBottom: 12,
    textAlign: 'center',
  },
  texto: {
    fontSize: 16,
    color: '#475467',
    textAlign: 'center',
    marginBottom: 24,
  },
  aviso: {
    fontSize: 14,
    color: '#b42318',
    textAlign: 'center',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#1d4ed8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});