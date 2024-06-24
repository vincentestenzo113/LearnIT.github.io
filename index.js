// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzUrG6mSMy50UObXL02q1FL82Vq8d2iBQ",
    authDomain: "learnitauth.firebaseapp.com",
    projectId: "learnitauth",
    storageBucket: "learnitauth.appspot.com",
    messagingSenderId: "267511256656",
    appId: "1:267511256656:web:d245c52f4b18eefa5b2355"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Make sure the email or password is not wrong or empty.')
        return
        // Don't continue running the code
    }


    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // add user variable
            var user = auth.currentUser;

            // Send email verification
            user.sendEmailVerification()
                .then(function () {
                    // Email verification sent.
                    alert('Email verification sent! Please check your email to verify your account.');
                })
                .catch(function (error) {
                    // There is an error update
                    alert('Error sending email verification: ' + error.message);
                });

            // Add this user to Firebase Database
            var database_ref = database.ref();

            // Create User data with variable email full_name last_login and values of email full_name and Date.now()
            var user_data = {
                email: email,
                full_name: full_name,
                last_login: Date.now()
            };

            
            database_ref.child('users/' + user.uid).set(user_data);

            // it alerts that you already created an account
            alert('User Created!! Please verify your email before logging in.');
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}
  // Set up our login function
  function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is empty !')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser;

            // Check if email is verified
            if (user.emailVerified) {
                // Add this user to Firebase Database
                var database_ref = database.ref();

                // Create User data
                var user_data = {
                    last_login: Date.now()
                };

                // Push to Firebase Database
                database_ref.child('users/' + user.uid).update(user_data);

                // Redirect to profile.html
                window.location.href = 'profile.html';
            } else {
                // Email is not verified
                alert('Please verify your email before logging in.');
            }

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code;
            var error_message = error.message;

            alert(error_message);
        });
}
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
