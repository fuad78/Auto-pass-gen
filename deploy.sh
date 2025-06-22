#!/bin/bash

# Password Generator App - AWS EC2 Deployment Script
# Developed by Fuad Hasan

set -e

echo "🚀 Starting deployment of Password Generator App..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root"
   exit 1
fi

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    print_status "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    print_success "Docker installed successfully"
else
    print_success "Docker is already installed"
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    print_status "Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose installed successfully"
else
    print_success "Docker Compose is already installed"
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2..."
    sudo npm install -g pm2
    print_success "PM2 installed successfully"
else
    print_success "PM2 is already installed"
fi

# Create logs directory
print_status "Creating logs directory..."
mkdir -p logs

# Build and start the application
print_status "Building Docker image..."
docker-compose build

print_status "Starting the application..."
docker-compose up -d

# Wait for the application to start
print_status "Waiting for application to start..."
sleep 10

# Check if the application is running
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    print_success "Application is running successfully!"
    print_success "Access your app at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
else
    print_error "Application failed to start. Check logs with: docker-compose logs"
    exit 1
fi

# Setup PM2 for process management (alternative to Docker)
print_status "Setting up PM2 configuration..."
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'password-generator',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
}
EOF

print_success "PM2 configuration created"

# Create systemd service for auto-start
print_status "Creating systemd service..."
sudo tee /etc/systemd/system/password-generator.service > /dev/null << EOF
[Unit]
Description=Password Generator App
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$(pwd)
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl enable password-generator.service
sudo systemctl start password-generator.service

print_success "Systemd service created and enabled"

# Create monitoring script
cat > monitor.sh << 'EOF'
#!/bin/bash
echo "=== Password Generator App Status ==="
echo "Docker containers:"
docker-compose ps
echo ""
echo "Application logs:"
docker-compose logs --tail=20
echo ""
echo "System resources:"
docker stats --no-stream
EOF

chmod +x monitor.sh

# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/home/$USER/backups"
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "$BACKUP_DIR/password-generator-$DATE.tar.gz" \
    --exclude=node_modules \
    --exclude=logs \
    --exclude=.git \
    .
echo "Backup created: $BACKUP_DIR/password-generator-$DATE.tar.gz"
EOF

chmod +x backup.sh

print_success "Deployment completed successfully!"
echo ""
echo "📋 Useful commands:"
echo "  • View logs: docker-compose logs -f"
echo "  • Stop app: docker-compose down"
echo "  • Restart app: docker-compose restart"
echo "  • Monitor app: ./monitor.sh"
echo "  • Backup app: ./backup.sh"
echo "  • Update app: git pull && docker-compose up -d --build"
echo ""
echo "🌐 Your app is accessible at:"
echo "  • Local: http://localhost:3000"
echo "  • Public: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
echo ""
echo "🔐 Developed by Fuad Hasan" 