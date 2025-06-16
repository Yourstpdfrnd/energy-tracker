export async function getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {
            // Если отказ или ошибка — используем координаты Москвы
            resolve({
              latitude: 55.7558,
              longitude: 37.6176,
            });
          }
        );
      } else {
        // Если браузер вообще не поддерживает геолокацию
        resolve({
          latitude: 55.7558,
          longitude: 37.6176,
        });
      }
    });
  }