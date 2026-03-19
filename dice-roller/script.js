// DOM Elements
const diceCountSelect = document.getElementById('dice-count');
const rollButton = document.getElementById('roll-btn');
const diceContainer = document.getElementById('dice-container');
const totalValue = document.getElementById('total-value');
const historyList = document.getElementById('history-list');

// History array to store all rolls
let rollHistory = [];

// Event listener for roll button
rollButton.addEventListener('click', rollDice);

// Function to roll dice
function rollDice() {
    const diceCount = parseInt(diceCountSelect.value);
    
    // Disable button during animation
    rollButton.disabled = true;
    
    // Clear previous dice
    diceContainer.innerHTML = '';
    totalValue.textContent = '-';
    
    // Create dice elements
    const diceValues = [];
    for (let i = 0; i < diceCount; i++) {
        const die = document.createElement('div');
        die.className = 'die rolling';
        die.textContent = '?';
        diceContainer.appendChild(die);
        diceValues.push(die);
    }
    
    // Animate and show results after delay
    setTimeout(() => {
        let total = 0;
        const rolls = [];
        
        diceValues.forEach(die => {
            const value = Math.floor(Math.random() * 6) + 1;
            die.textContent = value;
            die.classList.remove('rolling');
            total += value;
            rolls.push(value);
        });
        
        // Display total
        totalValue.textContent = total;
        
        // Add to history
        addToHistory(rolls, total);
        
        // Re-enable button
        rollButton.disabled = false;
    }, 500);
}

// Function to add roll to history
function addToHistory(rolls, total) {
    const timestamp = new Date();
    const timeString = timestamp.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    const historyEntry = {
        rolls: rolls,
        total: total,
        time: timeString
    };
    
    // Add to beginning of array
    rollHistory.unshift(historyEntry);
    
    // Keep only last 20 rolls
    if (rollHistory.length > 20) {
        rollHistory.pop();
    }
    
    // Update history display
    updateHistoryDisplay();
}

// Function to update history display
function updateHistoryDisplay() {
    // Clear empty message if it exists
    historyList.innerHTML = '';
    
    if (rollHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No rolls yet. Click "Roll Dice" to get started!</p>';
        return;
    }
    
    // Create history items
    rollHistory.forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const leftSection = document.createElement('div');
        const rollsText = document.createElement('div');
        rollsText.className = 'history-rolls';
        rollsText.textContent = `🎲 ${entry.rolls.join(', ')}`;
        
        const timeText = document.createElement('div');
        timeText.className = 'history-time';
        timeText.textContent = entry.time;
        
        leftSection.appendChild(rollsText);
        leftSection.appendChild(timeText);
        
        const totalText = document.createElement('div');
        totalText.className = 'history-total';
        totalText.textContent = `Total: ${entry.total}`;
        
        historyItem.appendChild(leftSection);
        historyItem.appendChild(totalText);
        
        historyList.appendChild(historyItem);
    });
}

// Initialize with empty history display
updateHistoryDisplay();
