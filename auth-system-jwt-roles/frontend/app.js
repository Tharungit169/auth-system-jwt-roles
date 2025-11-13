const API_URL = "http://localhost:4000/api";

async function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  document.getElementById("registerMsg").innerText = res.ok
    ? "✅ Registered successfully!"
    : "❌ " + (data.error || data.errors?.[0]?.msg);
}

async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    document.getElementById("loginMsg").innerText = "✅ Login successful!";
    loadProfile();
  } else {
    document.getElementById("loginMsg").innerText = "❌ " + (data.error || "Login failed");
  }
}

async function loadProfile() {
  const token = localStorage.getItem("token");
  if (!token) return;

  const res = await fetch(`${API_URL}/user/profile`, {
    headers: { Authorization: "Bearer " + token }
  });

  const data = await res.json();

  if (res.ok) {
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("profileData").textContent = JSON.stringify(data.profile, null, 2);
  } else {
    document.getElementById("profileData").innerText = "❌ Invalid token or session expired";
  }
}

function logout() {
  localStorage.removeItem("token");
  document.getElementById("register").style.display = "block";
  document.getElementById("login").style.display = "block";
  document.getElementById("profile").style.display = "none";
}

window.onload = loadProfile;
