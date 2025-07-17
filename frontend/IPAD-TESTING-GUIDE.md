# iPad Testing Guide for Expo App

## Overview

This guide provides step-by-step instructions for testing the Story Generator app on physical iPad devices using Expo Go and tunnel mode.

## Prerequisites

### Required Software
- **Expo Go App**: Download from iPad App Store
- **WSL2 Development Environment**: Set up per WSL2-DEVELOPMENT-GUIDE.md
- **Tunnel Dependencies**: @expo/ngrok installed (already configured)

### Network Requirements
- **Internet Connection**: Required for tunnel mode
- **Firewall Configuration**: WSL2 firewall rules applied
- **Environment Variables**: `.env` file configured with WSL2_HOST_IP

## Quick Start

### Method 1: Tunnel Mode (Recommended)

1. **Start Tunnel Server**
   ```bash
   yarn tunnel
   ```

2. **Wait for Tunnel Ready**
   - Look for "Tunnel connected" and "Tunnel ready" messages
   - QR code will be displayed in terminal

3. **Connect iPad**
   - Open Expo Go app on iPad
   - Tap "Scan QR code"
   - Point camera at QR code in terminal
   - App should load automatically

### Method 2: LAN Mode (Backup)

1. **Start LAN Server**
   ```bash
   yarn lan
   ```

2. **Connect iPad**
   - Ensure iPad is on same WiFi network as WSL2 machine
   - Open Expo Go app on iPad
   - Scan QR code displayed in terminal

## Troubleshooting

### Common Issues and Solutions

#### 1. QR Code Not Scanning
**Symptoms**: iPad camera doesn't recognize QR code
**Solutions**:
- Ensure good lighting when scanning
- Try holding iPad closer/farther from screen
- Use manual URL entry (see Manual Connection section)

#### 2. "Unable to Connect" Error
**Symptoms**: QR code scans but app fails to load
**Solutions**:
```bash
# Check tunnel connection
yarn tunnel
# Look for "Tunnel connected" message

# Try restarting tunnel
# Stop current process (Ctrl+C) and run:
yarn tunnel
```

#### 3. Slow Loading/Timeout
**Symptoms**: App takes >30 seconds to load
**Solutions**:
- Switch to LAN mode if on same network
- Check internet connection stability
- Restart WSL2 if needed

#### 4. Hot Reloading Not Working
**Symptoms**: Code changes don't appear on iPad
**Solutions**:
- Shake iPad device
- Tap "Reload" in Expo Go
- Enable "Fast Refresh" in development menu

### Manual Connection

If QR code scanning fails, you can manually enter the tunnel URL:

1. **Get Tunnel URL**
   - Look for URL in terminal output (e.g., `exp://ab-123.example.tunnel.dev:443`)
   
2. **Manual Entry**
   - In Expo Go, tap "Enter URL manually"
   - Type the full tunnel URL
   - Tap "Connect"

## Validation Checklist

Use this checklist to ensure iPad testing is working properly:

### Initial Setup
- [ ] Expo Go app installed on iPad
- [ ] WSL2 development environment running
- [ ] `.env` file configured with proper variables
- [ ] Tunnel dependencies installed (`@expo/ngrok`)

### Connection Testing
- [ ] `yarn tunnel` starts successfully
- [ ] "Tunnel connected" message appears
- [ ] QR code visible in terminal
- [ ] iPad can scan QR code
- [ ] App loads on iPad within 30 seconds

### Functionality Testing
- [ ] "Hello, Storytime!" text displays on iPad
- [ ] App responds to touch interactions
- [ ] Hot reloading works (make code change, see update)
- [ ] Navigation functions properly
- [ ] No console errors in terminal

### Performance Testing
- [ ] App launch time < 30 seconds
- [ ] Hot reload time < 5 seconds
- [ ] No noticeable lag in UI interactions
- [ ] Memory usage stable over time

## Network Configuration

### WSL2 IP Configuration
```bash
# Find your WSL2 IP
ip addr show eth0 | grep inet

# Update .env file
WSL2_HOST_IP=your-wsl2-ip-here
```

### Firewall Rules (Windows)
```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Metro Bundler" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow
New-NetFirewallRule -DisplayName "Expo DevTools" -Direction Inbound -Protocol TCP -LocalPort 19000 -Action Allow
New-NetFirewallRule -DisplayName "Expo Tunnel" -Direction Inbound -Protocol TCP -LocalPort 19001 -Action Allow
```

## Advanced Configuration

### Environment Variables
```bash
# Required for tunnel mode
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
WSL2_HOST_IP=your-wsl2-ip

# Optional performance settings
EXPO_PUBLIC_ENABLE_DEVELOPMENT_TOOLS=true
REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
```

### Development Scripts
```bash
# All available testing modes
yarn start        # Standard mode
yarn tunnel       # Tunnel mode (best for iPad)
yarn lan          # LAN mode (same network)
yarn dev          # Development client mode
```

## Known Limitations

1. **Corporate Networks**: Some corporate firewalls block tunnel connections
2. **VPN Interference**: VPN connections may interfere with tunnel mode
3. **IPv6 Issues**: Some networks have IPv6 configuration issues
4. **Cellular Data**: Tunnel mode works on cellular, LAN mode does not

## Future Enhancements

### EAS Build Integration
When ready for production testing:
```bash
# Build development client
yarn build:dev

# Build preview version
yarn build:preview
```

### TestFlight Integration
For iOS production testing:
- EAS Build → iOS App Store Connect
- TestFlight distribution to testers
- Production-ready builds with proper certificates

## Support

### Debug Commands
```bash
# Check Metro bundler
curl http://localhost:8081/status

# Check tunnel connection
yarn tunnel --verbose

# Clear cache and restart
yarn clean && yarn tunnel
```

### Log Collection
When reporting issues, include:
- Terminal output from `yarn tunnel`
- Expo Go error messages
- WSL2 IP configuration
- Network configuration details

This guide ensures robust iPad testing even without a physical device for initial validation.