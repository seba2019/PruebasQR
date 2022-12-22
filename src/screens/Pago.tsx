import React, {useEffect} from 'react';
import {View, Text, ScrollView, Button} from 'react-native';
import {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BarCodeReadEvent} from 'react-native-camera';
import okpApi from '../api/okpApi';
import {IOrden} from '../interfaces/Orden';
import {IEstadoPago} from '../interfaces/IEstadoPago';
import {IPago} from '../interfaces/IPago';
import {HubConnectionBuilder} from '@microsoft/signalr';

export const Pago = () => {
  //Datos estado
  const [code, setCode] = useState<string>();
  const [orden, setOrden] = useState<IOrden>();
  const [estadoPago, setEstadoPago] = useState<IEstadoPago>();

  const cancelar = () => {
    setOrden(undefined);
    setCode(undefined);
    setEstadoPago(undefined);
    console.log('se ejecuto cancelar');
  };

  //Codigo QR
  const onReadQR = (e: BarCodeReadEvent) => {
    console.log(e.data);
    setCode(e.data);
  };

  //Manejo llamada a api con el qr
  const getDatosOrden = async () => {
    try {
      const result = await okpApi.get<IOrden>(`/pagos/orden/${code}`);
      setOrden(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code !== undefined) getDatosOrden();
  }, [code]);

  //Envio de pago
  const PostPago = async (pago: IPago) => {
    try {
      const result = await okpApi.post<IEstadoPago>('/pagos', pago);
      console.log(result.data);
      setEstadoPago(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePago = () => {
    if (orden) {
      orden.importe = orden.importe == 0 ? 1234 : orden.importe;
      orden.cuotas = orden.cuotas == 0 ? 1 : orden.cuotas;
    }

    const pago: IPago = {
      ordenId: orden!.ordenId,
      //tarjetaId: '19e63c69-17a0-40be-90a5-7f69904969e2', //Tarjeta Guille
      //tarjetaId: '4C9BD525-4855-4B2C-AACA-449269D08E18', //Tarjeta Seba
      tarjetaId: '83909B09-245D-4B86-9BC4-876969DF2BEB', //Tarjeta Tincho
      cs: '',
      importe: orden!.importe,
      cuotas: orden!.cuotas,
    };

    PostPago(pago);
  };

  if (estadoPago?.codigo == 1) {
    let connection = new HubConnectionBuilder()
      .withUrl('https://www.okpagos.com.ar/webapi/websocket/pagos')
      .build();

    connection
      .start()
      .then(() => console.log('conexion exitosa'))
      .catch(() => console.error());

    connection.on(
      `${estadoPago.pagoId}`,
      (pagoId: string, estadoPago: IEstadoPago) => {
        console.log(pagoId);
        console.log(estadoPago);
        setEstadoPago(estadoPago);
      },
    );
  }

  return (
    <View>
      {code === undefined && (
        <QRCodeScanner reactivate={true} showMarker={true} onRead={onReadQR} />
      )}
      {orden !== undefined && estadoPago === undefined && (
        <ScrollView>
          <Button title="Pagar" onPress={handlePago} />
          <Button title="Cancelar" onPress={cancelar} />
          <Text>{JSON.stringify(orden, null, 2)}</Text>
        </ScrollView>
      )}
      {estadoPago !== undefined && (
        <View>
          <Button title="Cancelar" onPress={cancelar} />
          <Text>{JSON.stringify(estadoPago, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};
