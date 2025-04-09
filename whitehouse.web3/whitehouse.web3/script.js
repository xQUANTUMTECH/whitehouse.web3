// Funzioni di animazione e interattività per whitehouse.web3
document.addEventListener('DOMContentLoaded', () => {
    // Animazione scroll
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Smette di osservare dopo l'animazione
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Simulatore 1: Dazi e Prezzi
    const tariffSlider = document.getElementById('tariff-slider');
    const tariffValue = document.getElementById('tariff-value');
    const resultPrice = document.getElementById('result-price');
    
    if (tariffSlider && tariffValue && resultPrice) {
        // Aggiungi attributi ARIA per accessibilità
        tariffSlider.setAttribute('aria-valuenow', tariffSlider.value);
        tariffSlider.setAttribute('aria-valuemin', '0');
        tariffSlider.setAttribute('aria-valuemax', '25');
        
        tariffSlider.addEventListener('input', () => {
            const value = tariffSlider.value;
            tariffValue.textContent = value;
            tariffSlider.setAttribute('aria-valuenow', value);
            
            // Calcola prezzo basato sul dazio
            const basePrice = 50;
            const productionCost = 20;
            const tariff = (basePrice * value) / 100;
            const totalPrice = basePrice + tariff + productionCost;
            
            resultPrice.textContent = '$' + totalPrice.toFixed(2);
        });
    } else {
        console.error('Simulator 1 elements not found');
    }
    
    // Simulatore 2: Toggle Dazi con grafico
    initSimulator2();
    
    // Simulatore 3: Tasse e Dazi con grafico
    initSimulator3();
    
    // Simulatore 4: Settori
    initSimulator4();
});

// Funzioni separate per ciascun simulatore
function initSimulator2() {
    const tariffToggle = document.getElementById('tariff-toggle');
    let tradeChart = null;
    
    // Funzione per creare/aggiornare grafico commercio
    function createOrUpdateTradeChart(withTariffs) {
        const ctx = document.getElementById('trade-chart');
        
        if (!ctx) return;
        
        const labels = ['USA Exports', 'World Exports', 'Total Trade'];
        
                const dataTariffs = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'With Tariffs (Current Policy 2025)',
                            data: [2210, 19550, 21760],
                            backgroundColor: 'rgba(255, 59, 48, 0.6)',
                            borderColor: 'rgba(255, 59, 48, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Without Tariffs (Friedman Model)',
                            data: [2860, 25300, 28160],
                            backgroundColor: 'rgba(0, 102, 204, 0.6)',
                            borderColor: 'rgba(0, 102, 204, 1)',
                            borderWidth: 1
                        }
                    ]
                };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value ($ Trillions)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Trade Volume Comparison'
                }
            }
        };
        
        // Destroy previous chart if it exists
        if (tradeChart) {
            tradeChart.destroy();
        }
        
        // Create new chart
        tradeChart = new Chart(ctx, {
            type: 'bar',
            data: dataTariffs,
            options: options
        });
        
        // Update trade values on the page
        function updateTradeValues(isChecked) {
            const toggleLabel = document.querySelector('.toggle-label');
            const tradeTotalEl = document.querySelector('#trade-value');
            
            if (toggleLabel) {
                toggleLabel.textContent = isChecked ? 'Tariffs Active' : 'Tariffs Disabled';
            }
            
            // Update trade value display con maggior discrepanza
            if (tradeTotalEl) {
                tradeTotalEl.textContent = isChecked ? '$21.76T' : '$28.16T';
                tradeTotalEl.className = isChecked ? 'price' : 'price positive';
            }
            
            // Update losses/gains display con maggior discrepanza
            const tradeLossEl = document.querySelector('#trade-loss');
            if (tradeLossEl) {
                tradeLossEl.textContent = isChecked ? '$3.84T lost to tariffs' : '$0 lost to tariffs';
                tradeLossEl.className = isChecked ? 'output-loss' : 'output-gain';
            }
            
            // Highlight appropriate bars in chart
            if (tradeChart) {
                tradeChart.data.datasets.forEach((dataset, index) => {
                    dataset.backgroundColor = 'rgba(200, 200, 200, 0.2)';
                    dataset.borderColor = 'rgba(200, 200, 200, 0.5)';
                });
                
                const activeIndex = isChecked ? 0 : 1;
                tradeChart.data.datasets[activeIndex].backgroundColor = isChecked ? 
                    'rgba(255, 59, 48, 0.6)' : 'rgba(0, 102, 204, 0.6)';
                tradeChart.data.datasets[activeIndex].borderColor = isChecked ? 
                    'rgba(255, 59, 48, 1)' : 'rgba(0, 102, 204, 1)';
                
                tradeChart.update();
            }
        }
        
        // Initial toggle state
        updateTradeValues(withTariffs);
        
        // Return the updater function
        return updateTradeValues;
    }
    
    if (tariffToggle) {
        // Create chart and get updater function
        const updateTradeValues = createOrUpdateTradeChart(tariffToggle.checked);
        
        // Add event listener
        tariffToggle.addEventListener('change', () => {
            updateTradeValues(tariffToggle.checked);
        });
    }
}

function initSimulator3() {
    const taxSlider = document.getElementById('tax-slider');
    const importSlider = document.getElementById('import-slider');
    const taxValue = document.getElementById('tax-value');
    const importValue = document.getElementById('import-value');
    let growthChart = null;
    
    // Funzione per creare/aggiornare grafico crescita
    function createOrUpdateGrowthChart(taxRate, importTariff) {
        const ctx = document.getElementById('growth-chart');
        
        if (!ctx) return;
        
        // Calculate growth rates based on tax and tariff rates - formula più realistica
        function calculateGrowth(tax, tariff) {
            // Base growth rate of 2%
            const baseGrowth = 2;
            
            // Penalità tasse: ogni 1% sopra il 15% riduce la crescita dello 0.02%
            const taxPenalty = tax > 15 ? (tax - 15) * 0.02 : 0;
            
            // Penalità dazi: ogni 1% di dazi riduce la crescita dello 0.03%
            const tariffPenalty = tariff * 0.03;
            
            // Bonus libertà: dazi zero aumentano la crescita dello 0.2%
            const libertyBonus = tariff === 0 ? 0.2 : 0;
            
            // Final growth rate basato su studi economici WTO 2025
            return baseGrowth - taxPenalty - tariffPenalty + libertyBonus;
        }
        
        // Calculate GDP over 5 years with different growth rates
        function calculateGDP(initialGDP, growthRate, years) {
            let gdp = initialGDP;
            let yearlyGDP = [gdp];
            
            for (let i = 0; i < years; i++) {
                gdp = gdp * (1 + growthRate / 100);
                yearlyGDP.push(gdp);
            }
            
            return yearlyGDP;
        }
        
        const currentGrowthRate = calculateGrowth(taxRate, importTariff);
        const friedmanGrowthRate = calculateGrowth(15, 0);
        
        const initialGDP = 25; // $25T
        const years = 5;
        const labels = Array.from({length: years + 1}, (_, i) => `Year ${i}`);
        
        const currentGDP = calculateGDP(initialGDP, currentGrowthRate, years);
        const friedmanGDP = calculateGDP(initialGDP, friedmanGrowthRate, years);
        
        const data = {
            labels: labels,
            datasets: [
                {
                    label: `Current Policies (${currentGrowthRate.toFixed(1)}% growth)`,
                    data: currentGDP,
                    borderColor: 'rgba(255, 59, 48, 1)',
                    backgroundColor: 'rgba(255, 59, 48, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: `Friedman Model (${friedmanGrowthRate.toFixed(1)}% growth)`,
                    data: friedmanGDP,
                    borderColor: 'rgba(0, 102, 204, 1)',
                    backgroundColor: 'rgba(0, 102, 204, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        };
        
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'GDP ($ Trillions)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'GDP Growth Over 5 Years'
                }
            }
        };
        
        // Destroy previous chart if it exists
        if (growthChart) {
            growthChart.destroy();
        }
        
        // Create new chart
        growthChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }
    
    if (taxSlider && importSlider && taxValue && importValue) {
        // Create initial chart
        createOrUpdateGrowthChart(parseInt(taxSlider.value), parseInt(importSlider.value));
        
        // Add event listeners
        taxSlider.addEventListener('input', () => {
            taxValue.textContent = taxSlider.value;
            createOrUpdateGrowthChart(parseInt(taxSlider.value), parseInt(importSlider.value));
        });
        
        importSlider.addEventListener('input', () => {
            importValue.textContent = importSlider.value;
            createOrUpdateGrowthChart(parseInt(taxSlider.value), parseInt(importSlider.value));
        });
    }
}

function initSimulator4() {
    const sectorButtons = document.querySelectorAll('.sector-btn');
    
    if (sectorButtons.length > 0) {
        sectorButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Rimuovi classe active da tutti i pulsanti e reset aria-pressed
                sectorButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                
                // Aggiungi classe active al pulsante cliccato e imposta aria-pressed
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                
                const sector = button.getAttribute('data-sector');
                
                // Dati simulati per diversi settori - contrasto maggiore tra politiche protezionistiche e libero mercato
                const sectorData = {
                    'steel': {
                        protected: 40000,
                        lost: -95000,
                        net: -55000
                    },
                    'agriculture': {
                        protected: 65000,
                        lost: -130000,
                        net: -65000
                    },
                    'auto': {
                        protected: 90000,
                        lost: -240000,
                        net: -150000
                    }
                };
                
                // Dati alternativi con approccio Friedman
                const friedmanData = {
                    'steel': {
                        lost: -25000,
                        gained: 120000,
                        net: 95000
                    },
                    'agriculture': {
                        lost: -40000,
                        gained: 135000,
                        net: 95000
                    },
                    'auto': {
                        lost: -60000,
                        gained: 230000,
                        net: 170000
                    }
                };
                
                const data = sectorData[sector] || sectorData.steel;
                
                // Aggiorna visualizzazione
                const jobsProtected = document.querySelector('.jobs-bar-protected');
                const jobsLost = document.querySelector('.jobs-bar-lost');
                const jobsNet = document.querySelector('.jobs-bar-net');
                const protectedNumber = document.querySelector('.jobs-protected .jobs-number');
                const lostNumber = document.querySelector('.jobs-lost .jobs-number');
                const netNumber = document.querySelector('.jobs-net .jobs-number');
                
                if (jobsProtected && jobsLost && jobsNet && protectedNumber && lostNumber && netNumber) {
                    // Normalizza i valori per le altezze delle barre
                    const maxVal = Math.max(Math.abs(data.protected), Math.abs(data.lost), Math.abs(data.net));
                    const scale = 150 / maxVal; // max height 150px
                    
                    jobsProtected.style.height = (Math.abs(data.protected) * scale) + 'px';
                    jobsLost.style.height = (Math.abs(data.lost) * scale) + 'px';
                    jobsNet.style.height = (Math.abs(data.net) * scale) + 'px';
                    
                    protectedNumber.textContent = '+' + data.protected.toLocaleString();
                    lostNumber.textContent = data.lost.toLocaleString();
                    netNumber.textContent = data.net.toLocaleString();
                    
                    if (data.net < 0) {
                        jobsNet.classList.add('negative');
                        netNumber.classList.add('negative');
                    } else {
                        jobsNet.classList.remove('negative');
                        netNumber.classList.remove('negative');
                    }
                }
            });
        });
    }
}
