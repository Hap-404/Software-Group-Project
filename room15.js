const button = document.querySelector('.confirm-share');

button.addEventListener('click', () => {
    fetch('http://127.0.0.1:5000/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            items: [
                { id:1, quantity:4 },
            ]
        })
    })
        .then(res => {
            if(res.ok) return res.json()
                return res.json().then(json => Promise.reject(json));
        }).then(({ url }) => {
            window.location = url;
        })
        .catch(e => {
            console.error(e);
        })

});
const dropdowns = document.querySelectorAll('.fromcalendar');

dropdowns.forEach(fromcalendar => {
    const adults = fromcalendar.querySelector('.adults');
    const caret = fromcalendar.querySelector('.caret');
    const menu = fromcalendar.querySelector('.menu');
    const options = fromcalendar.querySelectorAll('.menu li');
    const selected = fromcalendar.querySelector('.selected');
    const subtotalPlaceholder = document.querySelector('.subtotal-placeholder'); // Reference to the subtotal element

    // Toggle menu on click
    adults.addEventListener('click', () => {
        adults.classList.toggle('adults-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    // Handle selection and price update
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Update the selected text
            selected.innerText = option.innerText;

            // Get the price from the clicked option's data-price attribute
            const price = option.getAttribute('data-price');
            
            // Update the subtotal value
            subtotalPlaceholder.innerText = `Rs. ${price}`;

            // Close the dropdown
            adults.classList.remove('adults-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            // Remove 'active' class from all options and add it to the clicked one
            options.forEach(opt => {
                opt.classList.remove('active');
            });
            option.classList.add('active'); // Add 'active' class to the clicked option
        });
    });
});
// Function to change the main image source
function changeMainImage(newSrc) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = newSrc; // Change the main image source to the new image
}

// Adding event listeners for each image in the .benefits section
const imageElements = document.querySelectorAll('.benefits img');

imageElements.forEach(img => {
    img.addEventListener('click', (event) => {
        const newSrc = event.target.src; // Get the source of the clicked image
        changeMainImage(newSrc); // Change the main image
    });

    // Add support for touch devices
    img.addEventListener('touchstart', (event) => {
        const newSrc = event.target.src; // Get the source of the touched image
        changeMainImage(newSrc); // Change the main image
    });
});

