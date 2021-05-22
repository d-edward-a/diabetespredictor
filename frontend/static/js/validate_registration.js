function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
})

let username_flag = false;
let email_flag = false;
let password_flag = false;
let accept_tc = false;

$( document ).ready(function() {
    username_check();
    email_check();
    password_check();
});

function check_userdata() {
    document.getElementById("register-button").disabled = !(username_flag === true && email_flag === true && password_flag === true && accept_tc === true);
}

function accept_tc_check() {
    if (document.querySelector("#accept_tc:checked") !== null) {
        accept_tc = true;
        check_userdata();
    }
    else {
        accept_tc = false;
    }
}

function password_check() {
    let password_field = document.getElementById("register_password_control");

    if (password_field) {
        password_field.addEventListener("keyup", function () {
            const password_value = password_field.value;
            const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

            if (!password_value.match(password)) {
                document.getElementById("passwordErrorMessage").innerHTML = "Password is not valid.";
                document.getElementById("password_break").style.display = "unset";
                password_flag = false;
            }
            else {
                document.getElementById("passwordErrorMessage").innerHTML = "";
                document.getElementById("password_break").style.display = "none";
                password_flag = true;
                check_userdata();
            }
        });
    }
}

function username_check() {
    let username = document.getElementById("register_username_control");
    if (username) {
        username.addEventListener("focusout",function () {
            if (!username.value) {
                document.getElementById("usernameErrorMessage").innerHTML = "Username cannot be blank!";
                document.getElementById("username_break").style.display = "unset";
                username_flag = false;
            }
            else {
                fetch(`/backend/validate_username`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    credentials: "same-origin",
                    body: JSON.stringify({
                        v_user: username.value,
                    })
                })
                    .then(response => {
                        if (response.status === 200) {
                            document.getElementById("usernameErrorMessage").innerHTML = "";
                            document.getElementById("username_break").style.display = "none";
                            username_flag = true;
                            check_userdata();
                        }
                        else if (response.status === 302) {
                            document.getElementById("usernameErrorMessage").innerHTML = "Use another username/email combination!";
                            document.getElementById("username_break").style.display = "unset";
                            username_flag = false;
                        }
                    })
                    .catch(err => {
                        if (err.message.match(/Failed to fetch/)) {
                            console.error("The server cannot be reached. Did you start it?");
                        }
                    });
            }
        })
    }
}

function email_check() {
    let email = document.getElementById("register_email_control");
    if (email) {
        email.addEventListener("focusout",function (){
            const email_value = email.value;
            const re_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!email_value) {
                document.getElementById("EmailErrorMessage").innerHTML = "Email cannot be blank!";
                document.getElementById("email_break").style.display = "unset";
                email_flag = false;
            }
            else if (!email_value.match(re_email)) {
                document.getElementById("EmailErrorMessage").innerHTML = "Please ensure email format is valid!";
                document.getElementById("email_break").style.display = "unset";
                email_flag = false;
            }
            else {
                fetch(`/backend/validate_email`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken"),
                    },
                    credentials: "same-origin",
                    body: JSON.stringify({
                        v_email: email.value,
                    })
                })
                    .then(response => {
                        if (response.status === 200) {
                            document.getElementById("EmailErrorMessage").innerHTML = "";
                            document.getElementById("email_break").style.display = "none";
                            email_flag = true;
                            check_userdata();
                        }
                        else if (response.status === 302) {
                            document.getElementById("EmailErrorMessage").innerHTML = "Use another username/email combination!";
                            document.getElementById("email_break").style.display = "unset";
                            email_flag = false;
                        }
                    })
                    .catch(err => {
                        if (err.message.match(/Failed to fetch/)) {
                            console.error("The server cannot be reached. Did you start it?");
                        }
                    });
            }
        })
    }
}
