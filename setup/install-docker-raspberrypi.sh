#!/bin/bash
# install-docker-raspberrypi.sh
# Clean Docker install for a fresh Raspberry Pi (Debian / Raspberry Pi OS).
# Uses Docker's official convenience script, which auto-detects the correct
# distro/repo (avoids manually hardcoding Ubuntu vs Debian).

# TO RUN THIS SCRIPT, ENTER THE FOLLOWING COMMANDS
# chmod +x install-docker.sh
# ./install-docker.sh

set -e  # exit immediately if any command fails

echo "==> Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

echo "==> Downloading and running Docker's official install script..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
rm get-docker.sh

echo "==> Adding current user ($USER) to the docker group..."
sudo usermod -aG docker "$USER"

echo ""
echo "=================================================================="
echo "Docker installation complete."
echo "A reboot is required for the group change to take effect."
echo "After rebooting, verify with:"
echo "    docker run hello-world"
echo "    docker compose version"
echo "=================================================================="
echo ""

read -p "Reboot now? [y/N] " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo reboot
else
    echo "Skipping reboot. Remember to reboot (or log out/in) before using docker without sudo."
fi