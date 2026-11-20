import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BarcodeScanningResult, useCameraPermissions } from 'expo-camera';

import { PRODUTOS } from './dados/produtos';
import AreaCamera from './components/AreaCamera';
import CartaoResultado from './components/CartaoResultado';
import ListaProdutos from './components/ListaProdutos';
import TelaPermissao from './components/TelaPermissao';

export default function App() {
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [codigoLido, setCodigoLido] = useState<string | null>(null);

  const leituraTravada = useRef(false);

  const produtoEncontrado =
    codigoLido !== null ? PRODUTOS.find((produto) => produto.codigo === codigoLido) : undefined;

  function aoLerCodigo({ data }: BarcodeScanningResult) {
    if (leituraTravada.current) return;
    leituraTravada.current = true;
    setCodigoLido(data);
  }

  function escanearNovamente() {
    leituraTravada.current = false;
    setCodigoLido(null);
  }

  function renderConteudo() {
    if (!permissao) {
      return (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#1d4ed8" />
        </View>
      );
    }

    if (!permissao.granted) {
      return (
        <TelaPermissao
          podePerguntarDeNovo={permissao.canAskAgain}
          onPedirPermissao={pedirPermissao}
        />
      );
    }

    return (
      <>
        <AreaCamera onBarcodeScanned={codigoLido === null ? aoLerCodigo : undefined} />
        <CartaoResultado
          codigoLido={codigoLido}
          produto={produtoEncontrado}
          onEscanearNovamente={escanearNovamente}
        />
        <ListaProdutos produtos={PRODUTOS} codigoDestacado={produtoEncontrado?.codigo} />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.cabecalho}>
          <Text style={styles.tituloApp}>Tem na lista?</Text>
        </View>
        {renderConteudo()}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  cabecalho: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#101828',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});