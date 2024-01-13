const loginForm = document.getElementsByClassName("login-form")[0];
const ldsRing = document.getElementsByClassName("lds-ring")[0];
const wrapper = document.querySelector('.wrapper');

async function verifyCredentials(username, password) {
    const flaskVerifyUrl = 'http://localhost:5000/verify';

    try {
        const response = await fetch(flaskVerifyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
            console.log("Vision User Logged in");
            return true;
        } else {
            console.log(data.message);
            return false;
        }
    } catch (error) {
        console.log('Error:', error);
        return false;
    }
}

function checkDependencies() {
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
}

function processData() {
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
}

function updateProgressBar(step) {
    const filler = document.querySelector('.filler');
    const circles = document.querySelectorAll('.circle');
    const leftTexts = document.querySelectorAll('.circle-text-left');
    const rightTexts = document.querySelectorAll('.circle-text-right');
    const delay = 60;

    if (step === 4) {
        filler.style.height = '100%';
    } else {
        filler.style.height = `${step * 33}%`;
    }

    for (let i = 0; i < step; i++) {
        setTimeout(() => {
            circles[i].style.backgroundColor = "#6C63FF";
            leftTexts[i].style.color = "white";
            rightTexts[i].style.color = "white";
        }, delay * i);
    }
}

async function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    loginForm.style.display = "none";
    ldsRing.style.display = "inline-block";

    if (await verifyCredentials(username, password)) {

        const response = await pywebview.api.launchExecutor();

        if (!response.success) {
            console.log("Login Session Error, Please Try again");
            return false;
        } else {
            (async function updateProgressSequentially() {
                updateProgressBar(1);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second

                if (await checkDependencies()) {
                    updateProgressBar(2);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for another 1 second
                }

                if (await processData()) {
                    updateProgressBar(3);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for another 1 second
                }

                updateProgressBar(4);
                // Rest of your code
                wrapper.style.display = "flex";
                ldsRing.style.display = "none";
            })();

        }

    } else {
        loginForm.style.display = "flex";
        ldsRing.style.display = "none";
    }
}

document.getElementById('submit').addEventListener('click', function (event) {
    event.preventDefault();
    handleLogin();
});

// New code for automatic login
function autoLogin() {
    document.getElementById('username').value = 'lachudye';
    document.getElementById('password').value = 'R826i7SXlPKF';
    document.getElementById('submit').click();
}

window.onload = function () {
    autoLogin();
};