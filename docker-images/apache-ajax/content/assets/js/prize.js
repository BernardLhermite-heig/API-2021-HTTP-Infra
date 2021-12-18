$(() => {
    console.log("Loading prize");

    function loadPrize() {
        $.getJSON("/api/prize/", prize => {
            console.log(prize);
            var text = "Vous avez reçu un " + prize.name
            + " d'une valeur de " + prize.value + " !";
            $("#prize").text(text)
        });
    };

    setInterval(loadPrize, 5000);
});