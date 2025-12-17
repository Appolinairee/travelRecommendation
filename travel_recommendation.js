// Travel Recommendation JavaScript File

let travelData = null;

// Fetch data from JSON file when page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchRecommendations();
    // Afficher les recommandations par défaut
    displayDefaultRecommendations();
});

// Function to fetch travel recommendations from JSON
async function fetchRecommendations() {
    try {
        const response = await fetch('./travel_recommendation_api.json');
        travelData = await response.json();
        console.log("Travel data loaded successfully:", travelData);
        // Une fois les données chargées, afficher les recommandations
        displayDefaultRecommendations();
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
}

// Function to display default recommendations on page load
function displayDefaultRecommendations() {
    if (!travelData) return;
    
    const resultsSection = document.getElementById('results');
    const resultsTitle = document.getElementById('resultsTitle');
    
    // Afficher la section des résultats
    if (resultsSection) {
        resultsSection.style.display = 'block';
    }
    
    // Remettre le titre par défaut
    if (resultsTitle) {
        resultsTitle.textContent = 'Recommandations';
    }
    
    // Collecter toutes les recommandations (villes, temples, plages)
    let allRecommendations = [];
    
    // Ajouter les villes des pays
    if (travelData.countries) {
        travelData.countries.forEach(country => {
            if (country.cities) {
                allRecommendations = allRecommendations.concat(country.cities);
            }
        });
    }
    
    // Ajouter les temples
    if (travelData.temples) {
        allRecommendations = allRecommendations.concat(travelData.temples);
    }
    
    // Ajouter les plages
    if (travelData.beaches) {
        allRecommendations = allRecommendations.concat(travelData.beaches);
    }
    
    // Afficher toutes les recommandations
    displayResults(allRecommendations, null);
}

// Function to show different sections (only for home and results now)
function showSection(sectionName) {
    // Hide all sections
    const sections = ['home', 'results'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    // Show the requested section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
    
    // Clear results if navigating away from results
    if (sectionName !== 'results') {
        clearResults();
    }
}

// Function to handle search recommendations
function searchRecommendations() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        // Si pas de texte, afficher les recommandations par défaut
        displayDefaultRecommendations();
        return;
    }
    
    if (!travelData) {
        alert('Data not loaded yet. Please try again.');
        return;
    }
    
    let results = [];
    
    // Search logic for different keywords and variations
    if (searchTerm.includes('beach') || searchTerm.includes('beaches')) {
        results = travelData.beaches || [];
    } else if (searchTerm.includes('temple') || searchTerm.includes('temples')) {
        results = travelData.temples || [];
    } else if (searchTerm.includes('country') || searchTerm.includes('countries')) {
        // For countries, we'll show all cities from all countries
        results = [];
        if (travelData.countries) {
            travelData.countries.forEach(country => {
                if (country.cities) {
                    results = results.concat(country.cities);
                }
            });
        }
    } else {
        // Search for specific country or city names
        results = searchSpecificDestination(searchTerm);
    }
    
    displayResults(results, searchTerm);
}

// Function to search for specific destinations
function searchSpecificDestination(searchTerm) {
    let results = [];
    
    if (!travelData) return results;
    
    // Search in countries and cities
    if (travelData.countries) {
        travelData.countries.forEach(country => {
            if (country.name.toLowerCase().includes(searchTerm)) {
                // If country name matches, add all its cities
                if (country.cities) {
                    results = results.concat(country.cities);
                }
            } else if (country.cities) {
                // Search in city names
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(searchTerm)) {
                        results.push(city);
                    }
                });
            }
        });
    }
    
    // Search in temples
    if (travelData.temples) {
        travelData.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(searchTerm)) {
                results.push(temple);
            }
        });
    }
    
    // Search in beaches
    if (travelData.beaches) {
        travelData.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(searchTerm)) {
                results.push(beach);
            }
        });
    }
    
    return results;
}

// Function to display search results
function displayResults(results, searchTerm) {
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    const resultsSection = document.getElementById('results');
    const resultsTitle = document.getElementById('resultsTitle');
    
    // Clear previous results
    recommendationsContainer.innerHTML = '';
    
    // Mettre à jour le titre avec le texte de recherche ou "Recommandations" par défaut
    if (resultsTitle) {
        if (searchTerm) {
            resultsTitle.textContent = searchTerm;
        } else {
            resultsTitle.textContent = 'Recommandations';
        }
    }
    
    if (results.length === 0) {
        recommendationsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #fff;">
                <h3>No recommendations found for "${searchTerm}"</h3>
                <p>Try searching for "beach", "temple", "country", or specific destination names.</p>
            </div>
        `;
    } else {
        results.forEach((item, index) => {
            const card = createRecommendationCard(item, index);
            recommendationsContainer.appendChild(card);
        });
    }
    
    // Show results section
    if (resultsSection) {
        resultsSection.style.display = 'block';
    }
}

// Function to create recommendation card
function createRecommendationCard(item, index) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    
    // Create a placeholder image if no image URL is provided
    const imageUrl = item.imageUrl && !item.imageUrl.includes('enter_your_image') 
        ? item.imageUrl 
        : `https://via.placeholder.com/300x200/4CAF50/ffffff?text=${encodeURIComponent(item.name.split(',')[0])}`;
    
    // Traditional card with image at top
    card.innerHTML = `
        <img src="${imageUrl}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/300x200/4CAF50/ffffff?text=No+Image'">
        <div class="card-content">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button class="visit-btn">View</button>
        </div>
    `;
    
    return card;
}

// Function to handle visit button click
function visitDestination(destinationName) {
    alert(`You would like to visit ${destinationName}! This feature would redirect to booking page.`);
}

// Function to clear search results
function clearResults() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.value = '';
    
    // Réafficher les recommandations par défaut
    displayDefaultRecommendations();
}

// Function to display country time (Task 10 - Optional)
function displayCountryTime(destinationName, index) {
    let timeZone = '';
    
    // Map destinations to time zones
    const timeZoneMap = {
        'sydney': 'Australia/Sydney',
        'melbourne': 'Australia/Melbourne',
        'tokyo': 'Asia/Tokyo',
        'kyoto': 'Asia/Tokyo',
        'rio de janeiro': 'America/Sao_Paulo',
        'são paulo': 'America/Sao_Paulo',
        'bora bora': 'Pacific/Tahiti',
        'copacabana': 'America/Sao_Paulo'
    };
    
    // Find matching time zone
    const cityName = destinationName.toLowerCase().split(',')[0].trim();
    for (const [city, zone] of Object.entries(timeZoneMap)) {
        if (cityName.includes(city)) {
            timeZone = zone;
            break;
        }
    }
    
    if (timeZone) {
        try {
            const options = { 
                timeZone: timeZone, 
                hour12: true, 
                hour: 'numeric', 
                minute: 'numeric', 
                second: 'numeric' 
            };
            const localTime = new Date().toLocaleTimeString('en-US', options);
            
            const timeElement = document.getElementById(`timeZone-${index}`);
            if (timeElement) {
                timeElement.innerHTML = `🕐 Local time: ${localTime}`;
            }
        } catch (error) {
            console.log('Time zone not supported:', timeZone);
        }
    }
}

// Function to handle contact form submission
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    alert(`Thank you ${name}! Your message has been sent. We'll get back to you at ${email}.`);
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Initialize the page
console.log("Travel Recommendation JavaScript is loaded and ready!");