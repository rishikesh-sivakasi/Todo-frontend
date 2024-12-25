const card = document.querySelector('.card');
const loadingOverlay = document.getElementById('loadingOverlay');

function rotate() {
    card.classList.add('flipped');
    document.getElementById("forget-password").style.visibility = 'hidden';
}

function rotateBack() {
     card.classList.remove('flipped');
     card.classList.remove('flipped-to-forget');
     document.getElementById("forget-password").style.visibility = 'visible';
}

function rotateToForgetPassword() {
     card.classList.add('flipped-to-forget');
}

 if(sessionStorage.getItem('userName')) {
    window.location.replace('Main.html') ; 
}

 document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;

    document.getElementById("loginPasswordError").textContent = "";

    const password = document.getElementById("loginPassword").value;
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
        document.getElementById("loginPasswordError").textContent = `Password must be at least ${minLength} characters long.`;
        isValid = false;
    } else if (!uppercasePattern.test(password)) {
        document.getElementById("loginPasswordError").textContent = "Password must contain at least one uppercase letter.";
        isValid = false;
    } else if (!lowercasePattern.test(password)) {
        document.getElementById("loginPasswordError").textContent = "Password must contain at least one lowercase letter.";
        isValid = false;
    } else if (!numberPattern.test(password)) {
        document.getElementById("loginPasswordError").textContent = "Password must contain at least one number.";
        isValid = false;
    } else if (!specialCharPattern.test(password)) {
        document.getElementById("loginPasswordError").textContent = "Password must contain at least one special character.";
        isValid = false;
    }

    if(isValid){
        loginRoute();
    }
});



document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
        let isValid = true;
   
        document.getElementById("signupNameError").textContent = "";
        document.getElementById("signupEmailError").textContent = "";
        document.getElementById("signupPasswordError").textContent = "";
   
        const name = document.getElementById("signupUserName").value;
        if (name.trim() === "") {
            document.getElementById("signupNameError").textContent = "Name is required.";
            isValid = false;
        }
   
        const email = document.getElementById("signupEmail").value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            document.getElementById("signupEmailError").textContent = "Enter a valid email address.";
            isValid = false;
        }
   
        const password = document.getElementById("signupPassword").value;
        const minLength = 8;
        const uppercasePattern = /[A-Z]/;
        const lowercasePattern = /[a-z]/;
        const numberPattern = /[0-9]/;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
   
        if (password.length < minLength) {
            document.getElementById("signupPasswordError").textContent = `Password must be at least ${minLength} characters long.`;
            isValid = false;
        } else if (!uppercasePattern.test(password)) {
            document.getElementById("signupPasswordError").textContent = "Password must contain at least one uppercase letter.";
            isValid = false;
        } else if (!lowercasePattern.test(password)) {
            document.getElementById("signupPasswordError").textContent = "Password must contain at least one lowercase letter.";
            isValid = false;
        } else if (!numberPattern.test(password)) {
            document.getElementById("signupPasswordError").textContent = "Password must contain at least one number.";
            isValid = false;
        } else if (!specialCharPattern.test(password)) {
            document.getElementById("signupPasswordError").textContent = "Password must contain at least one special character.";
            isValid = false;
        }
   
        if(isValid){
            signupRoute();
        }
});


document.getElementById("forgetPasswordForm").addEventListener("submit",(event)=>{
    event.preventDefault();
    let isValid = true;
    document.getElementById("forgetEmailError").textContent = "";
    document.getElementById("forgetSecurityError").textContent = "";
    document.getElementById("forgetNewPasswordError").textContent = "";
    document.getElementById("forgetConfirmPasswordError").textContent = "";

    const email = document.getElementById("forgetEmail").value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            document.getElementById("signupEmailError").textContent = "Enter a valid email address.";
            isValid = false;
        }
    const newPassword = document.getElementById("newPassword").value;
    const minLength = 8;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

    if (newPassword.length < minLength) {
        document.getElementById("forgetNewPasswordError").textContent = `Password must be at least ${minLength} characters.`;
        isValid = false;
    } else if (!uppercasePattern.test(newPassword)) {
        document.getElementById("forgetNewPasswordError").textContent = "Password must contain at least one uppercase letter.";
        isValid = false;
    } else if (!lowercasePattern.test(newPassword)) {
        document.getElementById("forgetNewPasswordError").textContent = "Password must contain at least one lowercase letter.";
        isValid = false;
    } else if (!numberPattern.test(newPassword)) {
        document.getElementById("forgetNewPasswordError").textContent = "Password must contain at least one number.";
        isValid = false;
    } else if (!specialCharPattern.test(newPassword)) {
        document.getElementById("forgetNewPasswordError").textContent = "Password must contain at least one special character.";
        isValid = false;
    }
        
    const confirmPassword = document.getElementById("confirmPassword").value;
    if(newPassword !== confirmPassword){
        document.getElementById("forgetConfirmPasswordError").textContent = "Confirm Password must be same as new password.";
        isValid = false;
    }

    if(isValid){
        forgetPasswordRoute();
    }
})

 function loginRoute() {
    loadingOverlay.style.visibility = 'visible';
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch('http://172.17.59.155:8080/Todo_Backend/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    }).then(async (res) => {
        loadingOverlay.style.visibility = 'hidden';
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Login failed');
        }
        return res.json();
    })
    .then((data) => {
        console.log('Login successful :', data);
        sessionStorage.setItem('userName',data.userName);
        sessionStorage.setItem('email',data.email);
        window.location.href = 'Main.html';
    })
    .catch((error) => {
        loadingOverlay.style.visibility = 'hidden';
        console.error('Error during login :', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            showConfirmButton: false,
            timer: 2700
          });
    });
}


function signupRoute() {
    loadingOverlay.style.visibility = 'visible';
    const userName = document.getElementById("signupUserName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const security = document.getElementById('signupSecurity').value;

    if (!userName || !email || !password || !security) {
        window.alert("All fields are required.");
        return;
    }

    fetch('http://172.17.59.155:8080/Todo_Backend/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password ,security})
    })
        .then(async (res) => {
            loadingOverlay.style.visibility = 'hidden';
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Signup failed');
            }
            return res.json();
        })
        .then((data) => {
            console.log('Signup successful:', data);
            sessionStorage.setItem('userName',data.userName);
            sessionStorage.setItem('email',data.email);
            history.pushState(null, null, window.location.href); 
            window.location.href = 'Main.html';
        })
        .catch((error) => {
            loadingOverlay.style.visibility = 'hidden';
            console.error('Error during signup:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                showConfirmButton: false,
                timer: 2700
              });
        });
}


function forgetPasswordRoute() {
    loadingOverlay.style.visibility = 'visible';
    const email = document.getElementById("forgetEmail").value;
    const security = document.getElementById("forgetSecurity").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;


    fetch('http://172.17.59.155:8080/Todo_Backend/forgetPassword', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, security, newPassword ,confirmPassword})
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        loadingOverlay.style.visibility = 'hidden';
        console.log('Password changed successfully:', data);
        Swal.fire({
            icon: "success",
            title: "Password changed successfully",
            timer: 3000, 
            showConfirmButton: false, 
            willClose: () => {
                window.location.href = 'index.html';
            }
        });
    }).catch((err)=>{
        loadingOverlay.style.visibility = 'hidden';
        console.error(err);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
            showConfirmButton: false,
            timer: 2700
          });
    })
}

function toggle(passwordField ,icon) {
  
    if (passwordField.type === "password") {
      passwordField.type = "text";
      icon.classList.remove("bx-show-alt");
      icon.classList.add("bx-hide");
    } else {
      passwordField.type = "password";
      icon.classList.remove("bx-hide");
      icon.classList.add("bx-show-alt");
    }
  }
  
  function togglePasswordVisibility(){
    const passwordField = document.getElementById("loginPassword");
    const icon = document.querySelector(".toggle-password i");

    toggle(passwordField,icon);
  }
  function toggleSignPasswordVisibility(){
    const passwordField = document.getElementById("signupPassword");
    const icon = document.querySelector(".sign-toggle-password i");
    toggle(passwordField,icon);
  }
  function toggleForgetNewPasswordVisibility(){
    const passwordField = document.getElementById("newPassword");
    const icon = document.querySelector(".forget-new-toggle-password i");
    toggle(passwordField,icon);
  }
  function toggleForgetConPasswordVisibility(){
    const passwordField = document.getElementById("confirmPassword");
    const icon = document.querySelector(".forget-con-toggle-password i");
    toggle(passwordField,icon);
  }