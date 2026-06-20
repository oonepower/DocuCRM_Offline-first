// DocuCRM Offline - Main Application Logic

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 DocuCRM Offline starting...');
    
    // Register Service Worker
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('sw.js');
            console.log('✅ Service Worker registered');
        } catch (error) {
            console.error('❌ Service Worker registration failed:', error);
        }
    }

    // Initialize App
    initApp();
    
    // Check connectivity
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Setup install button for PWA
    setupInstallPrompt();
    
    // Initialize storage
    initStorage();
});

// Update online/offline status
function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    const statusElement = document.getElementById('online');
    
    if (isOnline) {
        statusElement.textContent = '🟢 Online';
        statusElement.style.color = '#4CAF50';
        removeBanner();
    } else {
        statusElement.textContent = '🔴 Offline';
        statusElement.style.color = '#f44336';
        showBanner('📡 You are offline - App will work with locally stored data');
    }
    
    console.log(isOnline ? '🔌 Connected to internet' : '📴 Offline mode');
}

// Show offline banner
function showBanner(message) {
    let banner = document.getElementById('offlineBanner');
    if (!banner) {
        banner = document.createElement('div');
        banner.id = 'offlineBanner';
        banner.className = 'offline-banner';
        const mainContent = document.querySelector('main');
        mainContent.insertBefore(banner, mainContent.firstChild);
    }
    banner.textContent = message;
}

// Remove offline banner
function removeBanner() {
    const banner = document.getElementById('offlineBanner');
    if (banner) {
        banner.remove();
    }
}

// Setup PWA install button
function setupInstallPrompt() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.style.display = 'block';
        }
    });
    
    document.getElementById('installBtn')?.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
        }
    });
    
    window.addEventListener('appinstalled', () => {
        console.log('✅ App installed successfully!');
        const installBtn = document.getElementById('installBtn');
        if (installBtn) {
            installBtn.style.display = 'none';
        }
    });
}

// Initialize local storage
function initStorage() {
    const storage = window.localStorage;
    
    // Create default data structure if it doesn't exist
    if (!storage.getItem('docucrm_contracts')) {
        storage.setItem('docucrm_contracts', JSON.stringify([]));
        console.log('✅ Storage initialized');
    }
    
    // Update storage status in UI
    const storageElement = document.getElementById('storage');
    if (storageElement) {
        try {
            const test = '__docucrm_test__';
            storage.setItem(test, test);
            storage.removeItem(test);
            storageElement.textContent = '✅ Available (' + (navigator.storage?.estimate ? 'Quota available' : 'Browser storage') + ')';
        } catch (e) {
            storageElement.textContent = '⚠️ Limited';
        }
    }
}

// Initialize App
function initApp() {
    // Detect platform
    const platformElement = document.getElementById('platform');
    if (platformElement) {
        const userAgent = navigator.userAgent.toLowerCase();
        let platform = '🌐 Web';
        
        if (userAgent.includes('android')) {
            platform = '📱 Android';
        } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
            platform = '🍎 iOS';
        } else if (userAgent.includes('windows')) {
            platform = '🖥️ Windows';
        } else if (userAgent.includes('mac')) {
            platform = '🖥️ macOS';
        }
        
        platformElement.textContent = platform;
    }
    
    console.log('✅ App initialized');
}

// Export data functions for future use
const AppStorage = {
    // Get all contracts
    getContracts() {
        const data = window.localStorage.getItem('docucrm_contracts');
        return data ? JSON.parse(data) : [];
    },
    
    // Add new contract
    addContract(contract) {
        const contracts = this.getContracts();
        contract.id = Date.now(); // Simple ID generation
        contract.createdAt = new Date().toISOString();
        contracts.push(contract);
        window.localStorage.setItem('docucrm_contracts', JSON.stringify(contracts));
        return contract;
    },
    
    // Update contract
    updateContract(id, updatedData) {
        const contracts = this.getContracts();
        const index = contracts.findIndex(c => c.id === id);
        if (index !== -1) {
            contracts[index] = { ...contracts[index], ...updatedData, updatedAt: new Date().toISOString() };
            window.localStorage.setItem('docucrm_contracts', JSON.stringify(contracts));
            return contracts[index];
        }
        return null;
    },
    
    // Delete contract
    deleteContract(id) {
        const contracts = this.getContracts();
        const filtered = contracts.filter(c => c.id !== id);
        window.localStorage.setItem('docucrm_contracts', JSON.stringify(filtered));
        return true;
    }
};

// Export for use in other scripts
window.AppStorage = AppStorage;

console.log('✅ DocuCRM Offline loaded successfully!');
