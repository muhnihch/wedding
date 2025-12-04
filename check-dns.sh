#!/bin/bash

echo "🔍 Checking DNS configuration for nihadfathiwedding.info..."
echo ""

echo "📍 Current A records:"
getent hosts nihadfathiwedding.info | awk '{print $1}' | sort -u

echo ""
echo "📍 Expected GitHub Pages IPs:"
echo "185.199.108.153"
echo "185.199.109.153"  
echo "185.199.110.153"
echo "185.199.111.153"

echo ""
echo "🌐 Testing connectivity:"
curl -I http://nihadfathiwedding.info 2>/dev/null | head -3 || echo "❌ Not accessible yet"

echo ""
echo "⏰ DNS propagation can take 15 minutes to 48 hours"
echo "✅ Once DNS matches expected IPs, GitHub can issue SSL certificate"