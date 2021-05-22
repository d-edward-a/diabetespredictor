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

window.onload = function get_newsletter_users(){
    fetch(`/backend/get_newsletter_user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "same-origin",
    })
        .then(response => response.json())
        .then(data => {
            console.log(JSON.parse(data))
            let new_object = JSON.parse(data);
            const address_field = document.getElementById("emailadresses");
            for (let i = 0; i < new_object.length; i++) {
                if (address_field.value) {
                    const old = address_field.value;
                    address_field.value = old + ";" + new_object[i]
                }
                else
                    address_field.value = new_object[i]
            }
        })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                console.error("The server cannot be reached. Did you start it?");
            }
        });
}