# Chrome Extension Intrusion Detection System

Chrome extension that monitors browsing history and detects potentially malicious, suspicious, or inappropriate websites in real-time. Benedict provides enterprise-grade threat detection with customizable keyword filtering and detailed analytics.

## 🔍 Overview

Benedict is an intrusion detection system (IDS) designed as a Chrome extension that continuously monitors user browsing patterns and alerts on suspicious activities. The extension categorizes threats into different risk levels and provides comprehensive logging and analysis capabilities.

## 📸 Screenshots

### Main Dashboard
![image](https://github.com/user-attachments/assets/ef86a5f9-13e4-43d1-afe6-6b006aee2fcd)


### Dismissable Warning
![Screenshot 2025-05-23 183331](https://github.com/user-attachments/assets/1c888d22-c0e8-44a3-8dbc-c0862fb97b9b)


### Non-Dismissable Warning
![Screenshot 2025-05-23 183541](https://github.com/user-attachments/assets/72d31fcd-bb33-41e3-a8e0-0813336db81a)


## ✨ Features

* **Real-time Threat Detection**: Monitors browsing activity every 10 seconds
* **Multi-category Risk Assessment**: Detects malware, phishing, NSFW content, gambling, drugs, and more
* **Custom Keyword Filtering**: Add organization-specific keywords for monitoring
* **Risk Severity Levels**: Categorizes threats as Low, Medium, or High risk
* **Comprehensive Logging**: Maintains detailed event logs with timestamps
* **Data Export**: Download logs as CSV for further analysis
* **Visual Analytics**: Circular charts showing risk distribution
* **Blacklist Integration**: Uses PhishTank and custom blacklists
* **Non-dismissible Alerts**: Optional strict mode for high-security environments

## 🏗️ Architecture

![image](https://github.com/user-attachments/assets/267e3057-63b1-4aaa-8118-ca7d4582bede)


The extension consists of several key components:

* **Background Service Worker** (`background.js`): Handles periodic history scanning
* **Content Script** (`content-check.js`): Real-time page analysis and blocking
* **Popup Interface** (`popup.html/js`): User dashboard and controls
* **Manifest Configuration** (`manifest.json`): Extension permissions and settings


## 🚀 Installation

### Method 1: Developer Mode (Recommended for Testing)

1. Download the extension files to a local folder
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer Mode** (toggle in top-right corner)
4. Click **"Load unpacked"** and select your project folder
5. Pin the extension to your toolbar for easy access

### Method 2: Chrome Web Store (Coming Soon)

The extension will be available on the Chrome Web Store once published.

## 🔧 Configuration

### Basic Setup

1. Click the Benedict icon in your Chrome toolbar
2. Run initial analysis by clicking the **"Analyze"** button
3. Review risk categories and adjust settings as needed





