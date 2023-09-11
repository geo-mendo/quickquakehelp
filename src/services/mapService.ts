import { LatLngLiteral } from 'leaflet';
const openInGoogleMapsIOS = (position: LatLngLiteral) => {
    const url = `maps://?q=${position.lat},${position.lng}`;
    window.location.href = url;
  };

  const openInGoogleMapsAndroid = (position: LatLngLiteral) => {
    const url = `google.navigation:q=${position.lat},${position.lng}`;
    window.location.href = url;
  };
  
  
export const openInMapApp = (position: LatLngLiteral) => {
    const isAndroid = /Android/.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    
    if (isAndroid) {
      openInGoogleMapsAndroid(position);
    } else if (isIOS) {
      openInGoogleMapsIOS(position);
    } else {
      // Fallback pour les autres systèmes ou pour le navigateur web
      const url = `https://www.google.com/maps?q=${position.lat},${position.lng}`;
      window.open(url, '_blank');
    }
  };