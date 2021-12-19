$(() => {
    console.log("Loading prize");

    function loadPrize() {
        var text;

        $.ajax({
            url: "/api/prize/",
            dataType: 'json',
            timeout: 3000
        }).done(prize => {
            console.log(prize);
            text = "Vous avez reçu un " + prize.name
                    + " d'une valeur de " + prize.value + " !";
        }).fail((jqxhr, textStatus, error) => {
            console.log("Request Failed: " + textStatus + ", " + error);
            text = "Vous n'avez rien reçu )-8";
        }).always(() => {
            $("#prize").text(text);
        });
    };

    setInterval(loadPrize, 5000);
});