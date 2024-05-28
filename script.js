const fs = require('fs');
const path = require('path');

// Function to create files with given content
const createFile = (path, content, message, callback) => {
    fs.writeFile(path, content, (err) => {
        if (err) {
            console.log(`${message} not created`, err);
        } else {
            console.log(`${message} created`);
            if (callback) callback();
        }
    });
};

// JavaScript file path
const scriptFilePath = __filename;

// Check if the "project" directory exists
if (fs.existsSync('./project')) {
    fs.rmdir('./project', { recursive: true }, (err) => {
        if (err) {
            console.log("Folder cannot be deleted because it's not empty or due to another error: ", err);
        } else {
            console.log("Folder deleted successfully.");
        }
    });
} else {
    // Create the "project" directory
    fs.mkdir('./project', (err) => {
        if (err) {
            console.log("Folder not created ", err);
        } else {
            console.log("Project Folder created and it has three files");

            // Basic HTML structure with login and signup form
            const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login and Signup</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>User Authentication</h1>
    <div class="btnSection">
    <button id="showLogin">Login</button>
    <button id="showSignup">Sign Up</button>
    </div>
    <div class="form-container">
        <form id="loginForm" class="hidden">
            <h2>Login</h2>
            <label for="loginUsername">Username:</label>
            <input type="text" id="loginUsername" name="username" required>
            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" name="password" required>
            <button type="submit">Login</button>
        </form>
        <form id="signupForm" class="hidden">
            <h2>Sign Up</h2>
            <label for="signupUsername">Username:</label>
            <input type="text" id="signupUsername" name="username" required>
            <label for="signupEmail">Email:</label>
            <input type="email" id="signupEmail" name="email" required>
            <label for="signupPassword">Password:</label>
            <input type="password" id="signupPassword" name="password" required>
            <label for="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>
`;

            // CSS styles for the form
            const cssContent = `
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
}

h1 {
    text-align: center;
}
.btnSection{
    display:flex;
    gap:20px;
}
.form-container {
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin-top: 20px;
}

form {
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 40%;
}

form.hidden {
    display: none;
}

form h2 {
    margin-top: 0;
}

label {
    display: block;
    margin-top: 10px;
}

input {
    width: calc(100% - 20px);
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 3px;
    background-color: #5cb85c;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button#showLogin, button#showSignup {
    width: 150px;
    margin-top: 10px;
}
`;

            // JavaScript to handle form submissions and password confirmation
            const jsContent = `
document.getElementById('showLogin').addEventListener('click', function() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('signupForm').classList.add('hidden');
});

document.getElementById('showSignup').addEventListener('click', function() {
    document.getElementById('signupForm').classList.toggle('hidden');
    document.getElementById('loginForm').classList.add('hidden');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login attempt:', { username, password });
    alert('Login attempted!');
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    console.log('Signup attempt:', { username, email, password });
    alert('Signup attempted!');
});
`;

            // Create the files with the respective content and then cleanup
            createFile('./project/index.html', htmlContent, "HTML file", checkAndDeleteScript);
            createFile('./project/styles.css', cssContent, "CSS file", checkAndDeleteScript);
            createFile('./project/script.js', jsContent, "JavaScript file", checkAndDeleteScript);
        }
    });
}

// Function to check if all files are created and then delete the script
let filesCreated = 0;
const totalFiles = 3;

const checkAndDeleteScript = () => {
    filesCreated += 1;
    if (filesCreated === totalFiles) {
        // Delete the script file
        fs.unlink(scriptFilePath, (err) => {
            if (err) {
                console.log("Error deleting the script file: ", err);
            } else {
                console.log("Script file deleted successfully.");
            }
        });
    }
};
