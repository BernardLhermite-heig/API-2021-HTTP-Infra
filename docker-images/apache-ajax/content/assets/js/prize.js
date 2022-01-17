$(() => {
    console.log("Loading prize");

    function loadPrize() {
        var text;

        $.ajax({
            url: "/api/prize/",
            dataType: 'json',
            timeout: 3000
        }).done((prize, textStatus, jqXHR) => {
            console.log(prize);
            text = "Vous avez reçu un " + prize.name
                    + " d'une valeur de " + prize.value + " !";
            text += "\nVous avez été servi par " + jqXHR.getResponseHeader("hostname");
        }).fail((jqXHR, textStatus, error) => {
            console.log("Request Failed: " + textStatus + ", " + error);
            text = "Vous n'avez rien reçu )-8";
        }).always(() => {
            $("#prize").text(text);
        });
    };

    setInterval(loadPrize, 5000);
});