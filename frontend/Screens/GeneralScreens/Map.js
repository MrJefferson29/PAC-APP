import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const locations = [
    { id: 1, latitude: 5.98479, longitude: 10.36064, title: "Bamesing Fon's Palace" },
    { id: 2, latitude: 5.97931, longitude: 10.36142, title: 'Presybyterian Church, Mbesoh' },
    { id: 3, latitude: 5.98034, longitude: 10.36102, title: 'Mbenjung Community center' },
    { id: 4, latitude: 5.98329, longitude: 10.36092, title: 'Obj 1k, post office' },
    { id: 5, latitude: 5.97902, longitude: 10.36183, title: '3 Corners, Mbesoh' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }}>
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.title}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;
