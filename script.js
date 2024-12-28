document.addEventListener("DOMContentLoaded", () => {
    const userBtn = document.querySelector('#user-btn');
    const profileMenu = document.querySelector('.profile-menu');
    const sideBar = document.querySelector('.side-bar');
    const menuBtn = document.querySelector('#menu-btn');
    const toggleBtn = document.querySelector('#toggle-btn');

    // Toggle profile menu visibility
    userBtn.addEventListener("click", () => {
        profileMenu.classList.toggle('hidden');
        sideBar.classList.remove('active');
    });

    // Toggle sidebar visibility
    menuBtn.addEventListener("click", () => {
        sideBar.classList.toggle('active');
        profileMenu.classList.add('hidden'); // Hide profile menu if sidebar is opened
    });

    // Close menus on scroll
    window.addEventListener("scroll", () => {
        profileMenu.classList.add('hidden');
        sideBar.classList.remove('active');
    });

    // Dark mode toggle functionality
    let darkMode = localStorage.getItem('dark-mode');

    const enableDarkMode = () => {
        toggleBtn.classList.replace('fa-sun', 'fa-moon');
        document.body.classList.add('dark');
        localStorage.setItem('dark-mode', 'enabled');
    };

    const disableDarkMode = () => {
        toggleBtn.classList.replace('fa-moon', 'fa-sun');
        document.body.classList.remove('dark');
        localStorage.setItem('dark-mode', 'disabled');
    };

    // Initialize dark mode if previously enabled
    if (darkMode === 'enabled') {
        enableDarkMode();
    }

    // Toggle dark mode on button click
    toggleBtn.addEventListener("click", () => {
        darkMode = localStorage.getItem('dark-mode');
        if (darkMode === 'disabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });

    // Check if URL contains a hash for highlighting
    if (window.location.hash === '#algorithms') {
        const algorithmsSection = document.querySelector('#algorithms');
        if (algorithmsSection) {
            algorithmsSection.style.backgroundColor = '#f0f0f0'; // Highlight color
            algorithmsSection.style.transition = 'background-color 0.3s ease'; // Smooth transition
        }

        // Optionally, remove the highlight after a few seconds
        setTimeout(() => {
            if (algorithmsSection) {
                algorithmsSection.style.backgroundColor = ''; // Reset background
            }
        }, 3000); // Change the time in milliseconds as needed
    }
});
// Function to toggle the visibility of the "more-content" section
// Add loading animation
function toggleContent() {
    var moreContent = document.getElementById('more-content');
    var moreBtn = document.getElementById('more-btn');

    // Add 'loading' class when toggling
    moreBtn.classList.add('loading');

    setTimeout(() => {
        moreBtn.classList.remove('loading'); // Remove loading after animation
        if (moreContent.style.display === 'none') {
            moreContent.style.display = 'block';
            moreBtn.textContent = 'Less'; // Change button text to 'Less'
        } else {
            moreContent.style.display = 'none';
            moreBtn.textContent = 'More'; // Change button text back to 'More'
        }
    }, 100); // Simulate a delay for the loading animation
}
// Handle registration
document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Store email and password in localStorage (simulating registration)
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    alert('Registration successful! You can now sign in.');
    window.location.href = 'signin.html'; // Redirect to Sign-In page
});

// Handle sign-in
document.getElementById('signin-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    // Check if the entered email and password match the stored ones
    if (email === storedEmail && password === storedPassword) {
        alert('Sign-In successful!');
        window.location.href = 'welcome.html'; // Redirect to a welcome page (you can create this)
    } else {
        alert('Invalid email or password.');
    }
});


// Handle Registration
document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mobile = document.getElementById('mobile').value;
    const profilePicture = document.getElementById('profile-picture').files[0];

    // Store registration details in localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userMobile', mobile);

    // Save profile picture if selected
    if (profilePicture) {
        const reader = new FileReader();
        reader.onloadend = function() {
            localStorage.setItem('profileImage', reader.result);
        };
        reader.readAsDataURL(profilePicture);
    }

    // Redirect to profile page after registration
    window.location.href = 'profile.html';
});

// Initialize profile data on profile page
window.onload = function() {
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');
    const mobile = localStorage.getItem('userMobile');
    const profileImage = localStorage.getItem('profileImage') || 'default-avatar.jpg';
    const savedPlaylists = JSON.parse(localStorage.getItem('savedPlaylists')) || [];

    // Set profile data in the view
    document.getElementById('user-email').textContent = email || 'Not available';
    document.getElementById('user-mobile').textContent = mobile || 'Not available';
    document.getElementById('profile-image').src = profileImage;

    // Load saved playlists
    const playlistElement = document.getElementById('playlist');
    if (savedPlaylists.length > 0) {
        playlistElement.innerHTML = '';
        savedPlaylists.forEach(playlist => {
            const listItem = document.createElement('li');
            listItem.textContent = playlist;
            playlistElement.appendChild(listItem);
        });
    }

    // Handle photo upload (change profile photo)
    document.getElementById('upload-btn').addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = function() {
                const imageSrc = reader.result;
                document.getElementById('profile-image').src = imageSrc;
                localStorage.setItem('profileImage', imageSrc);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        };

        fileInput.click();
    });

    // Handle Logout
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.clear();
        window.location.href = 'signin.html'; // Redirect to Sign In page
    });
};
// Function to update profile photos across the page
function updateProfilePhotos(photoUrl) {
    const profilePhotoMenu = document.getElementById('profile-photo-menu');
    const profilePhotoSidebar = document.getElementById('profile-photo-sidebar');

    if (profilePhotoMenu) profilePhotoMenu.src = photoUrl;
    if (profilePhotoSidebar) profilePhotoSidebar.src = photoUrl;
}

// Check if a registered photo URL is stored in localStorage
const registeredPhotoUrl = localStorage.getItem('registeredPhotoUrl');

// Update the profile photos with the stored URL on page load
if (registeredPhotoUrl) {
    updateProfilePhotos(registeredPhotoUrl);
}

// Function to handle profile photo upload and save it
function handlePhotoUpload(event) {
    const file = event.target.files[0]; // Get the uploaded file

    if (file) {
        const reader = new FileReader(); // Create a FileReader to read the image
        reader.onload = function (e) {
            const photoUrl = e.target.result; // Get the base64 URL of the uploaded image
            localStorage.setItem('registeredPhotoUrl', photoUrl); // Save the URL in localStorage
            updateProfilePhotos(photoUrl); // Update the displayed photos
        };
        reader.readAsDataURL(file); // Read the file as a Data URL
    }
}

// Event listener for photo upload input (example input in your registration form)
document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.getElementById('photo-upload-input'); // Input field for photo upload
    if (photoInput) {
        photoInput.addEventListener('change', handlePhotoUpload);
    }
});

