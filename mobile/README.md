# Flatbase Mobile App

A production-ready React Native mobile application for the Flatbase project, built with Expo and Bun. It consumes the existing deployed GraphQL backend.

## Features

- **Authentication Flow**: Complete login and registration screens with JWT storage, persisting state across app relaunches using `Zustand` and `@react-native-async-storage/async-storage`.
- **Properties Discovery**:
  - Browse trending properties and popular destinations on the Home Screen.
  - Search flats by city/location.
  - Sort search results by pricing.
- **Details Screen**: View descriptions, capacity restrictions, and amenities mapping. Select months to book using a custom month-level calendar blocking booked months.
- **Bookings Management**:
  - Customer bookings listing, writing guest reviews, and cancelling pending reservations.
  - Seller bookings listing showing guest contact information.
- **Seller Tools**:
  - Add property listings with image uploading (uses `expo-image-picker` with base64 conversion).
  - Edit and delete listings.
  - Seller performance analytics tracking 6-month revenue and booking volumes with native-drawn bar charts.
- **Mobile UX Details**:
  - Dynamic pulse-animation skeletons (`CardSkeleton.tsx`) for premium loading feedback.
  - Full safe area context handling.
  - Pull-to-refresh (`RefreshControl`) support.
  - Robust keyboard avoidance using `KeyboardAwareScrollView`.
  - Cryptographic payment verification signature calculation simulated on the client side (using `crypto-js`) for 100% compatibility with Expo Go and Render backend.

## Tech Stack

- **Framework**: Expo SDK 54 (Expo Router)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: Zustand
- **Server API**: Apollo Client (GraphQL)
- **Data Persistence**: AsyncStorage (Secure token & session storage)
- **Utilities**: `expo-image` (aggressive image caching), `expo-image-picker` (photo uploads), `@shopify/flash-list` (re-render optimized listing view), `crypto-js` (payment simulations)

## Getting Started

### Prerequisites

You must have [Bun](https://bun.sh) installed.

### Setup Configuration

1. Create a `.env` file in the `mobile` directory:
   ```env
   EXPO_PUBLIC_API_URL=https://flatbase.onrender.com/graphql
   ```

### Installation

Navigate to the `mobile` directory and run:

```bash
bun install
```

### Starting the App

To start the Expo development server, run:

```bash
bun start
```

Press **a** to run on an Android Emulator or device.
Press **i** to run on an iOS Simulator (requires macOS).
You can also scan the QR code printed in the terminal using the **Expo Go** app on your phone.
