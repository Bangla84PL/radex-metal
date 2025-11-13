#!/bin/bash

# Radex Metal - Image Download Script
# Downloads high-quality placeholder images from free sources
# Run this script locally: chmod +x download-images.sh && ./download-images.sh

set -e  # Exit on error

echo "========================================="
echo "Radex Metal - Image Download Script"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if wget or curl is available
if command -v wget &> /dev/null; then
    DOWNLOADER="wget -q --show-progress -O"
    echo -e "${GREEN}✓${NC} Using wget for downloads"
elif command -v curl &> /dev/null; then
    DOWNLOADER="curl -L -o"
    echo -e "${GREEN}✓${NC} Using curl for downloads"
else
    echo -e "${RED}✗${NC} Error: Neither wget nor curl is installed"
    echo "Please install wget or curl and try again"
    exit 1
fi

echo ""
echo "Downloading placeholder images from Unsplash and Pexels..."
echo ""

# Create directories if they don't exist
mkdir -p public/images/hero
mkdir -p public/images/services
mkdir -p public/images/gallery

# Function to download image
download_image() {
    local url=$1
    local output=$2
    local description=$3

    echo -e "${BLUE}→${NC} Downloading $description..."

    if [ "$DOWNLOADER" = "wget -q --show-progress -O" ]; then
        wget -q --show-progress -O "$output" "$url"
    else
        curl -L -# -o "$output" "$url"
    fi

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} Downloaded: $output"
    else
        echo -e "${RED}✗${NC} Failed: $output"
    fi
}

# =============================================
# 1. HERO BACKGROUND (1920x1080)
# =============================================
echo ""
echo "1. Hero Background Image"
echo "------------------------"

# Unsplash welding image (1920x1080)
download_image \
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&h=1080&fit=crop&q=80" \
    "public/images/hero/hero-bg.jpg" \
    "Hero Background (welding scene)"

# =============================================
# 2. ABOUT SECTION (1200x800)
# =============================================
echo ""
echo "2. About Section Image"
echo "----------------------"

# Workshop image
download_image \
    "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&h=800&fit=crop&q=80" \
    "public/images/hero/workshop.jpg" \
    "About Section (workshop)"

# =============================================
# 3. SERVICE IMAGES (800x600)
# =============================================
echo ""
echo "3. Service Images"
echo "-----------------"

# Balustrady (Railings)
download_image \
    "https://images.unsplash.com/photo-1545259742-24f9c0e8a6b4?w=800&h=600&fit=crop&q=80" \
    "public/images/services/balustrady.jpg" \
    "Service - Balustrady (railings)"

# Bramy (Gates)
download_image \
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80" \
    "public/images/services/bramy.jpg" \
    "Service - Bramy (gates)"

# Ogrodzenia (Fences)
download_image \
    "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=800&h=600&fit=crop&q=80" \
    "public/images/services/ogrodzenia.jpg" \
    "Service - Ogrodzenia (fences)"

# Jachty (Yacht Fittings)
download_image \
    "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop&q=80" \
    "public/images/services/jachty.jpg" \
    "Service - Jachty (yacht fittings)"

# =============================================
# 4. GALLERY IMAGES (1200x900) - 12 images
# =============================================
echo ""
echo "4. Gallery Images (12 total)"
echo "----------------------------"

# Gates (3 images)
download_image \
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-01.jpg" \
    "Gallery 01 - Modern gate"

download_image \
    "https://images.unsplash.com/photo-1597008641621-cefdcf718025?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-02.jpg" \
    "Gallery 02 - Entrance gate"

download_image \
    "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-03.jpg" \
    "Gallery 03 - Industrial gate"

# Railings (3 images)
download_image \
    "https://images.unsplash.com/photo-1545259742-24f9c0e8a6b4?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-04.jpg" \
    "Gallery 04 - Balcony railing"

download_image \
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-05.jpg" \
    "Gallery 05 - Staircase railing"

download_image \
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-06.jpg" \
    "Gallery 06 - Glass railing"

# Fences (3 images)
download_image \
    "https://images.unsplash.com/photo-1607400201889-565b1ee75f8e?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-07.jpg" \
    "Gallery 07 - Metal fence"

download_image \
    "https://images.unsplash.com/photo-1564054074885-0497e92e7e67?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-08.jpg" \
    "Gallery 08 - Decorative fence"

download_image \
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-09.jpg" \
    "Gallery 09 - Security fence"

# Yacht/Marine (3 images)
download_image \
    "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-10.jpg" \
    "Gallery 10 - Yacht railing"

download_image \
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-11.jpg" \
    "Gallery 11 - Boat hardware"

download_image \
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=900&fit=crop&q=80" \
    "public/images/gallery/project-12.jpg" \
    "Gallery 12 - Yacht deck"

# =============================================
# SUMMARY
# =============================================
echo ""
echo "========================================="
echo "Download Complete!"
echo "========================================="
echo ""
echo -e "${GREEN}✓${NC} Hero image: public/images/hero/hero-bg.jpg"
echo -e "${GREEN}✓${NC} About image: public/images/hero/workshop.jpg"
echo -e "${GREEN}✓${NC} Service images: 4 files in public/images/services/"
echo -e "${GREEN}✓${NC} Gallery images: 12 files in public/images/gallery/"
echo ""
echo "Next steps:"
echo "1. Review images and replace with custom photos if available"
echo "2. Optimize images: npm run optimize-images (if script exists)"
echo "3. Convert to WebP: see IMAGE_SOURCES.md for instructions"
echo ""
echo "For image sources and optimization tips, see:"
echo "  IMAGE_SOURCES.md"
echo ""
