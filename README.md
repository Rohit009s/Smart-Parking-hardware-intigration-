# SMART-PARKING-SYSTEM-HARDWARE

Smart parking system integrated with ESP32 using an RFID sensor for real-time monitoring!

## 🚀 Project Overview

This is a **Smart Parking System** web application designed to efficiently manage and monitor parking spaces using modern web technologies. It integrates **ESP32** with an **RFID sensor** to update parking status in real-time on the web application.

## 🌍 Live Demo

**Deployed Link:** [Smart Parking System](https://smart-parking-system-hardware-axmquic9p.vercel.app/)

## 🛠️ Tech Stack

- **Hardware:** ESP32, RFID Sensor (RC522)
- **Frontend:** Vite + React + TypeScript
- **Backend:** Express.js (for real-time updates)
- **Database:** Firebase / MongoDB (for storing parking status)
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📂 Project Structure

```
/extracted_files
│── .gitignore            # Specifies files to ignore in Git
│── index.html            # Main entry point for the app
│── package.json          # Manages project dependencies and scripts
│── package-lock.json     # Locks the dependency versions
│── tsconfig.json         # TypeScript configuration
│── vite.config.ts        # Vite configuration file
│── tailwind.config.js    # Tailwind CSS configuration
│── src/
│   │── App.tsx           # Main React component
│   │── main.tsx          # Entry point for rendering
│   │── index.css         # Global styles
│   │── firebase.js       # Firebase configuration (if used)
│   │── services/
│   │   │── api.ts        # API functions for fetching parking status
```

## 🚀 Installation & Setup

Follow these steps to set up the project on your local machine:

### **1. Clone the Repository**

```sh
git clone <your-repository-url>
cd <your-repository-name>
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Run the Development Server**

```sh
npm run dev
```

Then, open `http://localhost:5173` in your browser.

## 🚀 ESP32 & RFID Sensor Integration

### **Hardware Components**

- **ESP32** (Microcontroller)
- **RFID Module (RC522)**
- **Parking Slots with RFID Tags**

### **ESP32 Wiring with RFID (RC522)**

```
RC522        ESP32
----------------------
SDA          GPIO 5
SCK          GPIO 18
MOSI         GPIO 23
MISO         GPIO 19
IRQ          Not Connected
GND          GND
RST          GPIO 22
VCC          3.3V
```

### **ESP32 Code (Arduino IDE)**

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 5
#define RST_PIN 22

MFRC522 rfid(SS_PIN, RST_PIN);
const char* ssid = "Your_SSID";
const char* password = "Your_PASSWORD";
const char* serverURL = "https://your-backend-endpoint.com/updateParking";

void setup() {
    Serial.begin(115200);
    SPI.begin();
    rfid.PCD_Init();
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected!");
}

void loop() {
    if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial()) {
        String tagID = "";
        for (byte i = 0; i < rfid.uid.size; i++) {
            tagID += String(rfid.uid.uidByte[i], HEX);
        }
        Serial.println("RFID Tag: " + tagID);
        sendUpdate(tagID);
        rfid.PICC_HaltA();
    }
}

void sendUpdate(String tagID) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverURL);
        http.addHeader("Content-Type", "application/json");
        String payload = "{\"rfid\": \"" + tagID + "\"}";
        int httpResponseCode = http.POST(payload);
        Serial.println("Response: " + String(httpResponseCode));
        http.end();
    }
}
```

## 🚀 Real-Time Updates on Website

To display real-time updates, we use **WebSockets** with Express.js:

### **Backend (Express.js)**

```js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

let parkingStatus = {};

app.post('/updateParking', (req, res) => {
    const { rfid } = req.body;
    parkingStatus[rfid] = !parkingStatus[rfid]; // Toggle parking status
    io.emit('updateParking', parkingStatus);
    res.send({ success: true });
});

io.on('connection', (socket) => {
    console.log('Client connected');
    socket.emit('updateParking', parkingStatus);
});

server.listen(8080, () => console.log('Server running on port 8080'));
```

### **Frontend (React + Socket.io)**

```tsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

export default function ParkingStatus() {
    const [parkingData, setParkingData] = useState({});

    useEffect(() => {
        socket.on('updateParking', (data) => setParkingData(data));
        return () => socket.off('updateParking');
    }, []);

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Real-Time Parking Status</h1>
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(parkingData).map(([tag, status]) => (
                    <div key={tag} className={`p-4 rounded-lg ${status ? 'bg-green-400' : 'bg-red-400'}`}>
                        <p className="text-white">Tag: {tag}</p>
                        <p className="text-white">Status: {status ? 'Occupied' : 'Available'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
```

## 📌 Features

✔️ Real-time parking space monitoring via **ESP32 & RFID**\
✔️ WebSockets for instant updates\
✔️ Responsive UI with Tailwind CSS\
✔️ Fast performance with Vite + React\
✔️ Easy deployment on Vercel

## 🤝 Contributing

Feel free to fork this repository, create a feature branch, and submit a pull request!

## 📜 License

This project is **open-source** and free to use.

---

🚀 **Happy Coding!**

singing off Rohit Neelam
