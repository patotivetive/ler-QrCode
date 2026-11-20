import { BarcodeScanningResult, CameraView } from 'expo-camera';
import { StyleSheet, View } from 'react-native';

interface AreaCameraProps {
  onBarcodeScanned: ((resultado: BarcodeScanningResult) => void) | undefined;
}

export default function AreaCamera({ onBarcodeScanned }: AreaCameraProps) {
  return (
    <View style={styles.area}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['ean13'] }}
        onBarcodeScanned={onBarcodeScanned}
      />
      <View style={styles.moldura} />
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    height: 220,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moldura: {
    width: '80%',
    height: 110,
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 8,
    pointerEvents: 'none',
  },
});