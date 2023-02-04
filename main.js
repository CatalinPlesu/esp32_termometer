document.onload = function(){   
 var xValues = [];
    var yValues = [];

        Load();
        getTemperature();

    setInterval(function () {
        getTemperature();
    }, 60000);


    function getTemperature() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var curent_temperature = -199;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        curent_temperature = this.responseText;
                    } else {
                        curent_temperature = -199;
                    }
                }
            };
            addData(curent_temperature);
            document.getElementById("temperaturec").innerHTML = curent_temperature;

        };
        xhttp.open("GET", "/temperaturec", true);
        xhttp.send();
    }

    document.getElementById("refresh").addEventListener("click", function () {
        getTemperature();
    });

    function Store() {
        localStorage.setItem('xValues', JSON.stringify(xValues));
        localStorage.setItem('yValues', JSON.stringify(yValues));
    }

    function Load() {
        if (localStorage.getItem("xValues")) {
            xValues = JSON.parse(localStorage.getItem("xValues"));
            yValues = JSON.parse(localStorage.getItem("yValues"));
        }
        updateChart();
    }

    function Remove() {
        localStorage.clear();
        xValues = [];
        yValues = [];
        getTemperature();
    }

    function addData(temperature) {
        xValues.push(new Date().toLocaleString());
        yValues.push(temperature);
        Store();
        updateChart();
    }

    function updateChart(){
        chart.data.labels = xValues;
        chart.data.datasets[0].data = yValues;
        chart.update();
    }

    var chart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                borderColor: "rgba(0,25,225,1)",
                data: yValues
            }]
        },
        options: {
            legend: { display: false }
        }
    });
}