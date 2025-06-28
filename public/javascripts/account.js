$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/auth/check",
        dataType: "json",
        success: function (response) {
            console.log("Авторизований як:", response.user.username);
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                window.location.href = "/auth/login";
            } else {
                console.error("Помилка перевірки авторизації:", xhr.responseText);
            }
        }
    });
});
