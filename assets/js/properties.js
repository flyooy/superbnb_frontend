document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('propertyId');
    console.log("URL Params:", urlParams.toString()); // Логируем параметры URL

    fetch('http://localhost:8080/api/properties/public')
        .then(response => response.json())
        .then(data => {
            console.log("Fetched properties:", data);
            const propertiesSection = document.getElementById('properties');

            data.forEach(property => {
                console.log("Property ID:", property.id); // Логируем ID каждого свойства
                const propertyElement = document.createElement('div');
                propertyElement.className = 'property';
                propertyElement.innerHTML = `
                    <h2>${property.city}</h2>
                    <p>Adress: ${property.adress}</p>
                    <p>Price per night: €${property.pricePerNight.toFixed(2)}</p>
                `;
                const bookingButton = document.createElement('button');
                bookingButton.textContent = 'Booking';
                bookingButton.onclick = () => {
                    console.log("Navigating to booking with ID:", property.id);
                    window.location.href = `booking.html?propertyId=${property.id}`;
                };
                propertiesSection.appendChild(propertyElement);
                propertyElement.appendChild(bookingButton);
            });

            // Проверка на наличие выбранного свойства
            if (propertyId) {
                const selectedProperty = data.find(prop => prop.id === Number(propertyId)); // Приводим к числу
                if (selectedProperty) {
                    console.log("Selected Property:", selectedProperty);
                } else {
                    console.log("No property found with ID:", propertyId);
                }
            }
        })
        fetch('http://localhost:8080/api/properties/public')
    .then(response => response.json())
    .then(data => {
        console.log("Fetched properties:", data);
        data.forEach(property => {
            console.log("Property ID:", property.id);  // Проверяем наличие ID
        });
    })
    
        .catch(error => {
            console.error('Error fetching properties:', error);
        });
});