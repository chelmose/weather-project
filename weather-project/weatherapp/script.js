const apiKey = "9d4248e74569d3bfa8fa158a75faa97a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

const signinUsername = document.getElementById("signin-username");
const signinPassword = document.getElementById("signin-password");
const signinButton = document.getElementById("signin-button");

const signupEmail = document.getElementById("signup-email");
const signupUsername = document.getElementById("signup-username");
const signupPassword = document.getElementById("signup-password");
const signupButton = document.getElementById("signup-button");

const authSection = document.getElementById("auth-section");
const signupSection = document.getElementById("signup-section");
const weatherSection = document.getElementById("weather-section");

const showSignupLink = document.getElementById("show-signup");
const showSigninLink = document.getElementById("show-signin");
const logoutButton = document.getElementById("logout-button");

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Sign Up
signupButton.addEventListener("click", () => {
  const email = signupEmail.value;
  const username = signupUsername.value;
  const password = signupPassword.value;
  if (email && username && password) {
    localStorage.setItem(username, JSON.stringify({ email, password }));
    alert("Account created successfully!");
    showSignin();
  } else {
    alert("Please enter a valid email, username, and password.");
  }
});

// Sign In
signinButton.addEventListener("click", () => {
  const username = signinUsername.value;
  const password = signinPassword.value;
  const storedUser = JSON.parse(localStorage.getItem(username));
  if (storedUser && password === storedUser.password) {
    alert("Signed in successfully!");
    showWeatherSection();
    document.body.classList.remove('no-background');
    logoutButton.style.display = 'block';
  } else {
    alert("Invalid username or password.");
  }
});

// Show Sign Up Section
showSignupLink.addEventListener("click", (event) => {
  event.preventDefault();
  showSignup();
});

// Show Sign In Section
showSigninLink.addEventListener("click", (event) => {
  event.preventDefault();
  showSignin();
});

// Logout
logoutButton.addEventListener("click", () => {
  showSignin();
  document.body.classList.add('no-background');
  logoutButton.style.display = 'none';
});

function showSignup() {
  authSection.style.display = "none";
  signupSection.style.display = "block";
  weatherSection.style.display = "none";
}

function showSignin() {
  authSection.style.display = "block";
  signupSection.style.display = "none";
  weatherSection.style.display = "none";
}

function showWeatherSection() {
  authSection.style.display = "none";
  signupSection.style.display = "none";
  weatherSection.style.display = "block";
}




