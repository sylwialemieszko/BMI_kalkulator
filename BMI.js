function oblicz()
{
    var x = document.getElementById("kg").value; 
    var y = document.getElementById("cm").value;
    var czyok = true; //sprawdza czy wszystkie wprowadzone dane są poprawne

    var pobierz_error = document.getElementById("error"); //deklaruje zmienna do wyswietlania komunikatow o niepoprwnych danych
    pobierz_error.innerHTML = "";

    document.getElementById("kg").value = ""; //wyczyść pole wprowadzania wagi
    document.getElementById("cm").value = "";


    if (x <40 || x>200) 
    {
        pobierz_error.innerHTML += "waga nie jest poprawna </br>";
        czyok = false;
    }
    if (y <120 || y>240) 
    {
        pobierz_error.innerHTML += "wzrost nie jest poprawny </br>";
        czyok = false;
    }
if (czyok==false) //jesli dane sa niepoprawne, to nie licz
{
    document.getElementById("twojawaga").innerHTML = ""; //czyscimy pola w kolumnie 2
    document.getElementById("twojwzrost").innerHTML = "";
    document.getElementById("twojebmi").innerHTML = "";
    return;
}

var BMI = (x/(y*y)*10000);

zapiszhistorie(x,y,BMI); //wywoluje funkcje do zapisywania historii
wyswietl_historie();


var wprowadzonawaga = document.getElementById("twojawaga"); //zmienna wyswietlania danych w kolumnie 2
var wprowadzonywzrost = document.getElementById("twojwzrost");
var wprowadzonebmi = document.getElementById("twojebmi");

wprowadzonawaga.innerHTML = "Waga: " + x; 
wprowadzonywzrost.innerHTML = "Wzrost: " + y;

wprowadzonebmi.innerHTML = "BMI: " + BMI.toFixed(2);


if(czyok == true)
{
    porownajBMI(); //wywoluje funkcje do porownania
}
}

function porownajBMI()
{
    var bmi_tablica = JSON.parse(localStorage.getItem("BMI")); //w JSON dane zapisane sa jako tekst
    var dlugosc = Object.keys(bmi_tablica).length;
    
    if (dlugosc<2) 
    {return;}
   
   
    if( bmi_tablica[dlugosc-1] > bmi_tablica[dlugosc-2]) //porownanie nowego BMI ze starym
        {
    
        document.getElementById("porownanie").innerHTML = "Twoje BMI wzrosło";
        }
    else if (bmi_tablica[dlugosc-1] == bmi_tablica[dlugosc-2])
        {
            document.getElementById("porownanie").innerHTML = "Twoje BMI jest bez zmian";
        }
    else 
        {
        document.getElementById("porownanie").innerHTML = "Twoje BMI spadło";
        }
}


function zapiszhistorie(waga, wzrost, BMI)
{
    var data = new Date(); 
    var rok = data.getFullYear();
    var miesiac = data.getMonth() + 1;
    var dzien = data.getDate();
    var godzina = data.getHours();
    var minuty = data.getMinutes();
    var sekundy = data.getSeconds();

    if (dzien < 10) dzien = '0' + dzien; 
    if (miesiac < 10) miesiac = '0' + miesiac;
    if (godzina < 10) godzina = '0' + godzina;
    if (minuty < 10) minuty = '0' + minuty;
    if (sekundy < 10) sekundy = '0' + sekundy;

    var wyswietlana_data = dzien + "/" + miesiac + "/" + rok + " " + godzina + ":" + minuty + ":" + sekundy;

    if (localStorage.getItem("Data") === null) 
    {
        var data_tablica = [];
    } 
    else 
    {
        var data_tablica = JSON.parse(localStorage.getItem("Data"));
        // https://catalins.tech/store-array-in-localstorage/
    }

    if (localStorage.getItem("Waga") === null) 
    {
        var waga_tablica = [];
    } 
    else 
    {
        var waga_tablica = JSON.parse(localStorage.getItem("Waga"));
    }

    if (localStorage.getItem("Wzrost") === null) 
    {
        var wzrost_tablica = [];
    } 
    else 
    {
        var wzrost_tablica = JSON.parse(localStorage.getItem("Wzrost"));
    }

    if (localStorage.getItem("BMI") === null) 
    {
        var bmi_tablica = [];
    } 
    else 
    {
        var bmi_tablica = JSON.parse(localStorage.getItem("BMI"));
    }

    data_tablica.push(wyswietlana_data);
    waga_tablica.push(waga);
    wzrost_tablica.push(wzrost);
    bmi_tablica.push(BMI);

    localStorage.setItem("Data", JSON.stringify(data_tablica)); //Przekształca wartości JS na tekst zapisany w formacie JSON
    localStorage.setItem("Waga", JSON.stringify(waga_tablica));
    localStorage.setItem("Wzrost", JSON.stringify(wzrost_tablica));
    localStorage.setItem("BMI", JSON.stringify(bmi_tablica));

}


function wyswietl_historie()
{
   
    var data_tablica = JSON.parse(localStorage.getItem("Data"));
    var waga_tablica = JSON.parse(localStorage.getItem("Waga"));
    var wzrost_tablica = JSON.parse(localStorage.getItem("Wzrost"));
    var bmi_tablica = JSON.parse(localStorage.getItem("BMI"));
    document.getElementById("historia").innerHTML = "";

    // https://stackoverflow.com/questions/9640190/how-to-count-json-objects
    // jak sie zapisuje jsona do local storage to pozniej przy wczytywaniu zwracany jest obiekt a nie tablica. wiec trzeba inaczej policzyc liczbe elementow
    
    for (i=0; i < Object.keys(data_tablica).length; i++)
    {
    
        var wiersz = "<p>" + data_tablica[i] + " <b>Waga:</b> " + waga_tablica[i] + " <b>Wzrost:</b> " + wzrost_tablica[i] + " <b>BMI:</b> " + bmi_tablica[i].toFixed(2) + "</p>";
        document.getElementById("historia").innerHTML += wiersz;

    }
}