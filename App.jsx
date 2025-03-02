import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Car, MapPin, Zap, Droplets, Coffee, Shield, Camera, Clock, Armchair as Wheelchair, Bike, Crown, UserCheck, Star } from 'lucide-react';

const parkingLots = [
  {
    id: 1,
    name: "Phoenix Mall Premium Parking",
    location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
    totalSpaces: 200,
    availableSpaces: 85,
    price: "₹60/hour",
    features: {
      evCharging: true,
      carWash: true,
      security: {
        guards: true,
        cctv: true,
        patrol: true
      },
      cafe: true,
      valet: true,
      wheelchairAccess: true,
      bikeParking: true,
      premiumSpots: true
    },
    prices: {
      standard: "₹60/hour",
      valet: "₹150/hour",
      premium: "₹200/hour",
      bikeParking: "₹20/hour"
    },
    washingPrice: "₹399",
    evChargingPrice: "₹150/hour",
    securityDetails: "24/7 Armed Guards, 128 CCTV Cameras, Hourly Patrols",
    premiumDetails: "Reserved spots near entrance, Extra wide spaces, Personal assistance"
  },
  {
    id: 2,
    name: "MG Road Metro Parking",
    location: { lat: 12.9758, lng: 77.6065 }, // Bangalore MG Road
    totalSpaces: 150,
    availableSpaces: 32,
    price: "₹40/hour",
    features: {
      evCharging: true,
      carWash: false,
      security: {
        guards: true,
        cctv: true,
        patrol: false
      },
      cafe: false,
      valet: false,
      wheelchairAccess: true,
      bikeParking: true,
      premiumSpots: false
    },
    prices: {
      standard: "₹40/hour",
      bikeParking: "₹15/hour"
    },
    evChargingPrice: "₹120/hour",
    securityDetails: "24/7 Security Staff, 64 CCTV Cameras"
  },
  {
    id: 3,
    name: "Indiranagar Mall Elite Parking",
    location: { lat: 12.9784, lng: 77.6408 }, // Indiranagar
    totalSpaces: 120,
    availableSpaces: 55,
    price: "₹50/hour",
    features: {
      evCharging: true,
      carWash: true,
      security: {
        guards: true,
        cctv: true,
        patrol: true
      },
      cafe: true,
      valet: true,
      wheelchairAccess: true,
      bikeParking: true,
      premiumSpots: true
    },
    prices: {
      standard: "₹50/hour",
      valet: "₹120/hour",
      premium: "₹180/hour",
      bikeParking: "₹20/hour"
    },
    washingPrice: "₹449",
    evChargingPrice: "₹130/hour",
    securityDetails: "24/7 Armed Guards, 96 CCTV Cameras, Regular Patrols",
    premiumDetails: "VIP spots, Dedicated attendant, Complimentary car care"
  }
];

function App() {
  const [selectedLot, setSelectedLot] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 77.5946,
    latitude: 12.9716,
    zoom: 12
  });

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return 'bg-green-600';
    if (percentage > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Car size={24} />
              Smart Parking Bangalore
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Crown size={20} />
                <span className="text-sm font-medium">Premium Facilities</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                <Shield size={20} />
                <span className="text-sm font-medium">24/7 Secured</span>
              </div>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                Find Parking
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <div className="w-96 bg-white shadow-lg z-10 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Available Parking Lots</h2>
            <div className="space-y-4">
              {parkingLots.map(lot => (
                <div
                  key={lot.id}
                  className="bg-white border rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedLot(lot);
                    setViewState({
                      longitude: lot.location.lng,
                      latitude: lot.location.lat,
                      zoom: 15
                    });
                  }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{lot.name}</h3>
                    {lot.features.premiumSpots && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Crown size={12} />
                        Premium
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2 space-y-1 text-gray-600">
                    <p>Available Spaces: {lot.availableSpaces}/{lot.totalSpaces}</p>
                    <p>Starting from: {lot.prices.standard}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {lot.features.security.guards && (
                        <div className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                          <Shield size={14} />
                          Security
                        </div>
                      )}
                      {lot.features.valet && (
                        <div className="flex items-center gap-1 text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          <UserCheck size={14} />
                          Valet
                        </div>
                      )}
                      {lot.features.wheelchairAccess && (
                        <div className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          <Wheelchair size={14} />
                          Accessible
                        </div>
                      )}
                      {lot.features.evCharging && (
                        <div className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          <Zap size={14} />
                          EV
                        </div>
                      )}
                      {lot.features.bikeParking && (
                        <div className="flex items-center gap-1 text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          <Bike size={14} />
                          Bike
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`${getAvailabilityColor(lot.availableSpaces, lot.totalSpaces)} h-2.5 rounded-full transition-all duration-500`}
                        style={{ width: `${(lot.availableSpaces / lot.totalSpaces) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Map
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken="pk.eyJ1Ijoicm9oaXQyMDAiLCJhIjoiY202dGczMzlnMDJueDJsc2FhNmp5NG9lNyJ9.R5cj8jjfT1iLD9eE5gXi8Q"
          >
            {parkingLots.map(lot => (
              <Marker
                key={lot.id}
                longitude={lot.location.lng}
                latitude={lot.location.lat}
                anchor="bottom"
                onClick={e => {
                  e.originalEvent.stopPropagation();
                  setSelectedLot(lot);
                }}
              >
                <div className="relative">
                  <MapPin className={`w-6 h-6 ${lot.features.premiumSpots ? 'text-yellow-500' : 'text-indigo-600'}`} />
                  {lot.features.premiumSpots && (
                    <Crown className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1" />
                  )}
                </div>
              </Marker>
            ))}

            {selectedLot && (
              <Popup
                longitude={selectedLot.location.lng}
                latitude={selectedLot.location.lat}
                anchor="bottom"
                onClose={() => setSelectedLot(null)}
                className="z-50"
              >
                <div className="p-3 max-w-sm">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{selectedLot.name}</h3>
                    {selectedLot.features.premiumSpots && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Crown size={12} />
                        Premium
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Available: {selectedLot.availableSpaces}/{selectedLot.totalSpaces}</span>
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                        <Star size={16} />
                        Pricing
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>Standard: {selectedLot.prices.standard}</p>
                        {selectedLot.features.valet && (
                          <p>Valet: {selectedLot.prices.valet}</p>
                        )}
                        {selectedLot.features.premiumSpots && (
                          <p>Premium: {selectedLot.prices.premium}</p>
                        )}
                        {selectedLot.features.bikeParking && (
                          <p>Bike Parking: {selectedLot.prices.bikeParking}</p>
                        )}
                      </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-green-50 p-2 rounded-lg">
                      <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-1">
                        <Shield size={16} />
                        Security Features
                      </h4>
                      <p className="text-sm text-green-700">{selectedLot.securityDetails}</p>
                    </div>

                    {/* Premium Features */}
                    {selectedLot.features.premiumSpots && (
                      <div className="bg-yellow-50 p-2 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 flex items-center gap-2 mb-1">
                          <Crown size={16} />
                          Premium Features
                        </h4>
                        <p className="text-sm text-yellow-700">{selectedLot.premiumDetails}</p>
                      </div>
                    )}

                    {/* Additional Services */}
                    <div className="flex flex-wrap gap-2">
                      {selectedLot.features.evCharging && (
                        <div className="flex items-center gap-2 text-sm">
                          <Zap size={16} className="text-blue-600" />
                          <span>EV Charging: {selectedLot.evChargingPrice}</span>
                        </div>
                      )}
                      {selectedLot.features.carWash && (
                        <div className="flex items-center gap-2 text-sm">
                          <Droplets size={16} className="text-cyan-600" />
                          <span>Car Wash: {selectedLot.washingPrice}</span>
                        </div>
                      )}
                      {selectedLot.features.cafe && (
                        <div className="flex items-center gap-2 text-sm">
                          <Coffee size={16} className="text-orange-600" />
                          <span>Café Available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}

export default App;