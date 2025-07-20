# GitHub CLI Installation Script for Windows
# Run this in PowerShell as Administrator

# Install GitHub CLI using winget (Windows Package Manager)
winget install --id GitHub.cli

# Alternative: Install using Chocolatey (if you have it)
# choco install gh

# Alternative: Install using Scoop (if you have it)
# scoop install gh

# After installation, authenticate with:
# gh auth login

# Then you can create releases directly from command line:
# gh release create v2.0.0 --title "Website Version 2.0.0 - Complete Redesign" --notes-file RELEASE_NOTES_v2.0.0.md
