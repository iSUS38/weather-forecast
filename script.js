function getCurrentWeather(p) {

    const lat = p.coords.latitude;
    const lon = p.coords.longitude;
    console.log(lat, lon);

    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=63018962bd03c67c0a0a638fcb9cb1ac&units=metric";

    var date = new Date().toString().replace(/\d\d\d\d/g, "").replace("GMT", "").replace(/[а-я]/gi, "").slice(0, -12);
    var time = new Date().toLocaleTimeString().slice(0, 2);

    $.ajax({
        type: "GET",
        url: url,
    }).done(function (response) {
        console.log(response);

        var temp = Math.ceil(response.current.temp);
        var wind = response.current.wind_speed;
        var feelLike = response.current.feels_like.toFixed(1);
        var pressure = response.current.pressure;
        var humidity = response.current.humidity;

        var hourly1 = Math.round(response.hourly[3].temp);
        var hourly2 = Math.round(response.hourly[6].temp);
        var hourly3 = Math.round(response.hourly[9].temp);
        var hourly4 = Math.round(response.hourly[12].temp);
        var hourly5 = Math.round(response.hourly[15].temp);

        var windSpeed1 = Math.round(response.hourly[3].wind_speed);
        var windSpeed2 = Math.round(response.hourly[6].wind_speed);
        var windSpeed3 = Math.round(response.hourly[9].wind_speed);
        var windSpeed4 = Math.round(response.hourly[12].wind_speed);
        var windSpeed5 = Math.round(response.hourly[15].wind_speed);

        if (time >= 1 && time <= 5) {
            $("#status-img").attr("src", "icons/n.png")
        } else if (time > 5 && time <= 18) {
            $("#status-img").attr("src", "icons/day.png")
        } else if (time > 18) {
            $("#status-img").attr("src", "icons/n.png")
        }

        $("#hourlyTemp1").text(hourly1);
        $("#hourlyTemp2").text(hourly2);
        $("#hourlyTemp3").text(hourly3);
        $("#hourlyTemp4").text(hourly4);
        $("#hourlyTemp5").text(hourly5);

        function check_temp() {
            var translateYposPlus = 0;
            var translateYposMin = 0;
            if (hourly2 > hourly1) {
                translateYposMin -= 4;
                $(".divTemp2").css("transform", "translateY(" + translateYposMin + "px)");
            } else if (hourly2 == hourly1) {
                //nothing
            } else {
                translateYposPlus += 4;
                $(".divTemp2").css("transform", "translateY(" + translateYposPlus + "px)");
            }

            if (hourly3 > hourly2) {
                translateYposMin -= 4;
                $(".divTemp3").css("transform", "translateY(" + translateYposMin + "px)");
            } else if (hourly3 == hourly2) {
                $(".divTemp3").css("transform", "translateY(" + translateYposPlus + "px)");
            } else {
                translateYposPlus += 4;
                $(".divTemp3").css("transform", "translateY(" + translateYposPlus + "px)");
            }

            if (hourly4 > hourly3) {
                translateYposMin -= 4;
                $(".divTemp4").css("transform", "translateY(" + translateYposMin + "px)");
            } else if (hourly4 == hourly3) {
                $(".divTemp4").css("transform", "translateY(" + translateYposPlus + "px)");
            } else {
                translateYposPlus += 4;
                $(".divTemp4").css("transform", "translateY(" + translateYposPlus + "px)");
            }

            if (hourly5 > hourly4) {
                translateYposMin -= 4;
                $(".divTemp5").css("transform", "translateY(" + translateYposMin + "px)");
            } else if (hourly5 == hourly4) {
                $(".divTemp5").css("transform", "translateY(" + translateYposPlus + "px)");
            } else {
                translateYposPlus += 4;
                $(".divTemp5").css("transform", "translateY(" + translateYposPlus + "px)");
            }
        }

        function checkBackroundandBorder_for_temp() {
            if (hourly1 > 0) {
                $(".divTemp1").css("background-color", "#A8E7744D");
                $(".divTemp1").css("border-bottom", "1px solid rgba(157, 229, 99, 1)");
            } else {
                $(".divTemp1").css("background-color", "#84DEFF4D");
                $(".divTemp1").css("border-bottom", "1px solid rgba(99, 214, 255, 1)")
            }

            if (hourly2 > 0) {
                $(".divTemp2").css("background-color", "#A8E7744D");
                $(".divTemp2").css("border-bottom", "1px solid rgba(157, 229, 99, 1)")
            } else {
                $(".divTemp2").css("background-color", "#84DEFF4D");
                $(".divTemp2").css("border-bottom", "1px solid rgba(99, 214, 255, 1)")
            }

            if (hourly3 > 0) {
                $(".divTemp3").css("background-color", "#A8E7744D");
                $(".divTemp3").css("border-bottom", "1px solid rgba(157, 229, 99, 1)")
            } else {
                $(".divTemp3").css("background-color", "#84DEFF4D");
                $(".divTemp3").css("border-bottom", "1px solid rgba(99, 214, 255, 1)")
            }

            if (hourly4 > 0) {
                $(".divTemp4").css("background-color", "#A8E7744D");
                $(".divTemp4").css("border-bottom", "1px solid rgba(157, 229, 99, 1)")
            } else {
                $(".divTemp4").css("background-color", "#84DEFF4D");
                $(".divTemp4").css("border-bottom", "1px solid rgba(99, 214, 255, 1)")
            }

            if (hourly5 > 0) {
                $(".divTemp5").css("background-color", "#A8E7744D");
                $(".divTemp5").css("border-bottom", "1px solid rgba(157, 229, 99, 1)")
            } else {
                $(".divTemp5").css("background-color", "#84DEFF4D");
                $(".divTemp5").css("border-bottom", "1px solid rgba(99, 214, 255, 1)")
            }
        }

        $("#windSpeed1").text(windSpeed1);
        $("#windSpeed2").text(windSpeed2);
        $("#windSpeed3").text(windSpeed3);
        $("#windSpeed4").text(windSpeed4);
        $("#windSpeed5").text(windSpeed5);

        var testTemp = /-/;
        if (testTemp.test(temp)) {
            $("#temp").text(temp);
        } else {
            $("#temp").text("+" + temp);
        }

        //$("#temp").text(temp);
        $("#date").text(date);
        $("#wind").text(wind + " m/s");
        $("#feelLike").text(feelLike);
        $("#pressure").text(pressure);
        $("#humidity").text(humidity + " %");

        var firstTime = +time + 3;
        var secondTime = firstTime + 3;
        var thirdTime = secondTime + 3;
        var fourthTime = thirdTime + 3;
        var fifthTime = fourthTime + 3;

        function check_time() {
            var arr = [];
            arr.unshift(firstTime, secondTime, thirdTime, fourthTime, fifthTime);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == 25) {
                    arr[i] = 1;
                } else if (arr[i] == 26) {
                    arr[i] = 2;
                } else if (arr[i] == 27) {
                    arr[i] = 3;
                } else if (arr[i] == 28) {
                    arr[i] = 4;
                } else if (arr[i] == 29) {
                    arr[i] = 5;
                } else if (arr[i] == 30) {
                    arr[i] = 6;
                } else if (arr[i] == 31) {
                    arr[i] = 7;
                } else if (arr[i] == 32) {
                    arr[i] = 8;
                } else if (arr[i] == 33) {
                    arr[i] = 9;
                } else if (arr[i] == 34) {
                    arr[i] = 10;
                } else if (arr[i] == 35) {
                    arr[i] = 11;
                } else if (arr[i] == 36) {
                    arr[i] = 12;
                } else if (arr[i] == 37) {
                    arr[i] = 13;
                } else if (arr[i] == 38) {
                    arr[i] = 14;
                }
            }
            return [firstTime, secondTime, thirdTime, fourthTime, fifthTime] = arr;
        }

        check_time();
        check_temp();
        checkBackroundandBorder_for_temp()

        if (firstTime >= 19 || firstTime < 6) {
            $("#image1").attr("src", "icons/n.png");
        } else {
            $("#image1").attr("src", "icons/day.png");
        }

        if (secondTime >= 19 || secondTime < 6) {
            $("#image2").attr("src", "icons/n.png");
        } else {
            $("#image2").attr("src", "icons/day.png");
        }

        if (thirdTime >= 19 || thirdTime < 6) {
            $("#image3").attr("src", "icons/n.png");
        } else {
            $("#image3").attr("src", "icons/day.png");
        }

        if (fourthTime >= 19 || fourthTime < 6) {
            $("#image4").attr("src", "icons/n.png");
        } else {
            $("#image4").attr("src", "icons/day.png");
        }

        if (fifthTime >= 19 || fifthTime < 6) {
            $("#image5").attr("src", "icons/n.png");
        } else {
            $("#image5").attr("src", "icons/day.png");
        }

        $("#firstTime").html(firstTime + "<sup>00</sup>");
        $("#secondTime").html(secondTime + "<sup>00</sup>");
        $("#thirdTime").html(thirdTime + "<sup>00</sup>");
        $("#fourthTime").html(fourthTime + "<sup>00</sup>");
        $("#fifthTime").html(fifthTime + "<sup>00</sup>");
    });
}



$(function () {
    navigator.geolocation.getCurrentPosition(function (p) {
        getCurrentWeather(p);
    });

    var currentLoc = $.ajax({
        type: "GET",
        url: "https://api.sypexgeo.net/",
    }).done(function (response) {
        console.log(response);
        var city = response.city.name_en;
        document.getElementById("city").innerText = city;
    });

    $(".dropdown-item").on("click", function(){
        var currentCity = $(this).text();
        var lat = $(this).data("lat");
        var long = $(this).data("long");
        $("#city").text(currentCity);

        var p = {
            coords: {
                latitude: lat,
                longitude: long
            }
        }
        getCurrentWeather(p);
    });

    $(".current-location").click(function(){
        navigator.geolocation.getCurrentPosition(function (p) {
            getCurrentWeather(p);
            $("#city").text(currentLoc.responseJSON.city.name_en);
        });
    });
});


/*
  $("select").on("change", function(){
    var requestedDay = $(this).val();

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=49.222843&lon=28.439082&appid=63018962bd03c67c0a0a638fcb9cb1ac&units=metric",
      }).done(function (response) {
        console.log(response);
        var temp = Math.ceil(response.daily[requestedDay].temp.max);
        $("#temp").text(temp);
      });
  });
  */