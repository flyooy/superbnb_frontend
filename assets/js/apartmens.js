document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/api/properties/public') 
        .then(response => response.json())
        .then(data => {
            const propertiesSection = document.getElementById('properties');
            data.forEach(property => {
                const propertyElement = document.createElement('div');
                propertyElement.className = 'property';
                propertyElement.innerHTML = `
                    <h2>${property.city}</h2>
                    <p>Adress: ${property.adress}</p>
                    <p>Price per night: €${property.pricePerNight.toFixed(2)}</p>
                `;
                propertiesSection.appendChild(propertyElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});