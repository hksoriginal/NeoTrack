let data;
function getassetdata() {
    var assetnumber = document.getElementById('assetnumber').value;
    var settings = {
        "async": true,
        "crossDoamin": true,
        "url": "http://localhost:3000/getdata/" + assetnumber,
        "method": "GET",
        "timeout": 0,
        "headers": {
            "cache-control": "no-cache"
        }

    };

    $.ajax(settings).done(function (response) {
        data = response;
        if (data.length != []) {
            let newtab = "";
            let serialno = 1;
            for (let i = (data.length) - 1; i > 0; i--) {
                newtab = newtab + `<tr>
                <td>` + serialno + `</td>
                <td>` + data[i].assetnumber + `</td>
                <td>` + data[i].latitude + `</td>
                <td>` + data[i].longitude + `</td>
                <td>` +moment( data[i].updatedate).format("DD/MM/YYYY h:mm:ss a") + `</td>
                <td> <button type="button" class="btn btn-primary" id="`+i+`" onclick="updatelocation(this.id)">View</button>
                </td></tr>`;
                serialno++;
            }
            $("table").find('tbody').html("");
            $("table").find('tbody').append(newtab);
            updatemap(data[(data.length)-1].latitude, data[(data.length)-1].longitude);
        }
        else {
            console.log("No Data Found")
        }
        // console.log(response);
    });
}

function updatemap(lat,long){
    var mylatlong = new google.maps.LatLng(lat,long);
    var mapOptions = {
        zoom:12,
        center: mylatlong 
    }
    var map = new google.maps.Map(document.getElementById("map"),mapOptions);
    var marker = new google.maps.Marker({
        position: mylatlong,
        title: "Asset Number"
    });
    marker.setMap(map)
}

function updatelocation(click_id){
    updatemap(data[click_id].latitude,data[click_id].longitude);
    scroll(0,0);
}