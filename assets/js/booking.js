document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('propertyId');
    const bookingForm = document.getElementById('booking-form');

    if (propertyId) {
        fetchPropertyData(propertyId);
    } else {
        console.error('No valid property ID found in URL');
    }

    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const checkInDate = document.getElementById('checkInDate').value;
        const checkOutDate = document.getElementById('checkOutDate').value;

        if (propertyId && checkInDate && checkOutDate) {
            getUserId()
                .then(userId => {
                    createBooking(propertyId, userId, checkInDate, checkOutDate);
                })
                .catch(error => {
                    console.error('Error fetching user ID:', error);
                });
        } else {
            console.error('Please fill in all fields.');
        }
    });
});

function fetchPropertyData(propertyId) {
    fetch(`http://localhost:8080/api/properties/${propertyId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(property => {
            console.log("Property data:", property);
            // Обработка данных о свойстве
        })
        .catch(error => {
            console.error('Error fetching property data:', error);
        });
}

function getUserId() {
    const yourToken = localStorage.getItem('token');
    console.log('Using token:', yourToken); // Добавьте это для отладки
   
    return fetch('http://localhost:8080/api/users/current', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${yourToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        return response.json();
    })
    .then(user => user.id);
}

function createBooking(propertyId, userId, checkInDate, checkOutDate) {
    const bookingData = {
        propertyId: propertyId,
        userId: userId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
    };

    fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Booking created successfully:', data);
    })
    .catch(error => {
        console.error('Error creating booking:', error);
    });
}