# WSL2 React Native Development Guide

## Overview

This guide covers setting up React Native/Expo development in WSL2 with proper device connectivity for iPad/iPhone testing.

## Prerequisites

- Windows 11 with WSL2 enabled
- Docker Desktop for Windows
- Node.js 20.10.0 (managed by Volta)
- Yarn 4.0.2
- Android Studio (optional, for Android development)

## Development Setup

### 1. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Important WSL2-specific variables:
- `WSL2_HOST_IP`: Your WSL2 IP address
- `EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0`
- `REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0`

### 2. Find Your WSL2 IP Address

```bash
# Get your WSL2 IP address
ip addr show eth0 | grep inet

# Or use hostname
hostname -I
```

Update your `.env` file with this IP address.

### 3. Development Scripts

| Script | Purpose | Usage |
|--------|---------|--------|
| `yarn start` | Standard Expo server | Basic development |
| `yarn tunnel` | Tunnel mode (recommended for devices) | iPad/iPhone testing |
| `yarn lan` | LAN mode | Local network testing |
| `yarn android` | Android emulator | Android development |
| `yarn ios` | iOS simulator | iOS development (Mac only) |

## Device Connection Methods

### Method 1: Tunnel Mode (Recommended)

```bash
yarn tunnel
```

**Benefits:**
- Works through firewalls
- No network configuration needed
- Reliable for WSL2 + device testing

**Usage:**
1. Run `yarn tunnel`
2. Scan QR code with Expo Go app
3. App loads automatically

### Method 2: LAN Mode

```bash
yarn lan
```

**Requirements:**
- Device and WSL2 on same network
- Windows Firewall configured for Metro bundler
- May require port forwarding

**Usage:**
1. Run `yarn lan`
2. Ensure device can reach WSL2 IP
3. Scan QR code with Expo Go app

### Method 3: Direct IP Connection

If QR codes fail, manually enter the connection URL:

```
exp://YOUR_WSL2_IP:8081
```

## Windows Firewall Configuration

### Allow Metro Bundler Through Firewall

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Add Node.js and allow both Private and Public networks
4. Add port 8081 (Metro bundler)
5. Add port 19000 (Expo DevTools)

### PowerShell Command (Run as Administrator)

```powershell
New-NetFirewallRule -DisplayName "Metro Bundler" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow
New-NetFirewallRule -DisplayName "Expo DevTools" -Direction Inbound -Protocol TCP -LocalPort 19000 -Action Allow
```

## Troubleshooting

### Common Issues

**1. Device Cannot Connect**
- Verify WSL2 IP in `.env`
- Check Windows Firewall settings
- Try tunnel mode instead of LAN

**2. Metro Bundler Errors**
- Run `yarn clean` to clear cache
- Restart development server
- Check for port conflicts

**3. Slow Performance**
- Use tunnel mode for better performance
- Ensure WSL2 has sufficient resources
- Consider moving project to Windows filesystem

**4. Hot Reloading Not Working**
- Shake device and enable "Fast Refresh"
- Restart Metro bundler
- Check file watching limits

### Debug Commands

```bash
# Check Metro bundler status
curl http://localhost:8081/status

# Check Expo DevTools
curl http://localhost:19000

# Restart with cache clear
yarn clean && yarn start

# Check network connectivity
ping YOUR_WSL2_IP
```

## iPad/iPhone Testing

### Using Expo Go App

1. Install Expo Go from App Store
2. Run `yarn tunnel` in WSL2
3. Scan QR code with Expo Go
4. App loads and hot reloads automatically

### Network Requirements

- iPad/iPhone on any network (tunnel mode)
- Same WiFi network (LAN mode)
- Cellular data works with tunnel mode

### Testing Commands

```bash
# Start tunnel server for device testing
yarn tunnel

# Start with specific platform
yarn ios          # iOS simulator (Mac only)
yarn android      # Android emulator

# Build and test with EAS
yarn build:dev    # Development build
yarn build:preview # Preview build
```

## Performance Tips

1. **Use Tunnel Mode**: Most reliable for WSL2 + device testing
2. **Enable Fast Refresh**: Better development experience
3. **Optimize WSL2**: Allocate more RAM in `.wslconfig`
4. **File System**: Consider Windows filesystem for better performance

## VSCode Configuration

Add to `.vscode/settings.json`:

```json
{
  "terminal.integrated.defaultProfile.windows": "WSL",
  "react-native-tools.showUserTips": false,
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Integration with Backend

The backend runs in Docker, frontend runs natively in WSL2:

```bash
# Terminal 1: Start backend
cd ../backend
docker-compose up backend

# Terminal 2: Start frontend
cd frontend
yarn tunnel
```

This setup provides optimal development experience with proper device connectivity.