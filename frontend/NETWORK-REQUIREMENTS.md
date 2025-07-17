# Network Requirements for iPad Testing

## Overview

This document outlines the network requirements and configurations needed for successful iPad testing with Expo tunnel mode.

## Network Architecture

```
iPad (Expo Go) → Internet → Expo Tunnel Service → WSL2 (Metro Bundler)
```

## Required Network Configuration

### WSL2 Configuration
```bash
# WSL2 IP Range (typically)
172.16.0.0/16 - 172.31.255.255/16

# Find WSL2 IP
ip addr show eth0 | grep inet

# Required in .env
WSL2_HOST_IP=172.xx.xx.xx
```

### Windows Firewall Rules
```powershell
# Metro Bundler
New-NetFirewallRule -DisplayName "Metro Bundler" -Direction Inbound -Protocol TCP -LocalPort 8081 -Action Allow

# Expo DevTools
New-NetFirewallRule -DisplayName "Expo DevTools" -Direction Inbound -Protocol TCP -LocalPort 19000 -Action Allow

# Expo Tunnel
New-NetFirewallRule -DisplayName "Expo Tunnel" -Direction Inbound -Protocol TCP -LocalPort 19001 -Action Allow
```

## Connection Methods

### 1. Tunnel Mode (Recommended)
- **Advantages**: Works through NAT/firewall, cellular data supported
- **Requirements**: Internet connection, Expo tunnel service
- **Command**: `yarn tunnel`

### 2. LAN Mode (Backup)
- **Advantages**: Faster, no external dependency
- **Requirements**: Same WiFi network, direct WSL2 access
- **Command**: `yarn lan`

## Network Limitations

### Corporate Networks
- **Issue**: Firewall blocks tunnel connections
- **Solution**: Use LAN mode or configure firewall exceptions

### VPN Interference
- **Issue**: VPN routes conflict with tunnel service
- **Solution**: Disable VPN during development or use LAN mode

### IPv6 Issues
- **Issue**: Some networks have IPv6 configuration problems
- **Solution**: Force IPv4 with environment variables

## Port Requirements

| Service | Port | Protocol | Purpose |
|---------|------|----------|---------|
| Metro Bundler | 8081 | TCP | JavaScript bundle serving |
| Expo DevTools | 19000 | TCP | Development interface |
| Expo Tunnel | 19001 | TCP | Tunnel connection |
| Metro WebSocket | 8081 | WebSocket | Hot reloading |

## Testing Network Connectivity

### Basic Connectivity
```bash
# Test Metro bundler
curl http://localhost:8081/status

# Test from external device (LAN mode)
curl http://WSL2_IP:8081/status
```

### Tunnel Validation
```bash
# Start tunnel and check for:
yarn tunnel

# Look for these messages:
# "Tunnel connected"
# "Tunnel ready"
# QR code display
```

## Troubleshooting Network Issues

### Connection Timeout
```bash
# Check WSL2 IP
ip addr show eth0

# Verify firewall rules
Get-NetFirewallRule -DisplayName "*Metro*"

# Test direct connection
curl http://localhost:8081
```

### Slow Performance
```bash
# Check tunnel latency
ping tunnel-service.expo.io

# Switch to LAN mode
yarn lan
```

This ensures robust network configuration for iPad testing.