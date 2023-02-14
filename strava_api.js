const auth_link = "https://www.strava.com/oauth/token"

function getActivites(res){

    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}`
    fetch(activities_link)
        .then((res) => res.json())
        .then(function (data){

            var map = L.map('map').setView([35.298822943295754,-120.65486649295936], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            for(var x=0; x<data.length; x++){

                console.log(data[x].map.summary_polyline)
                var coordinates = L.Polyline.fromEncoded(data[x].map.summary_polyline).getLatLngs()
                console.log(coordinates)



                    L.polyline(

                        coordinates,
                        {
                            color: "green",
                            weight: 6,
                            opacity:.3,
                            lineJoin:'round'

                        }
                        
                    ).addTo(map)

            }





        }
        )
}

    
function reAuthorize() {
    fetch(auth_link, {
        method: 'post',

        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            client_id: '102311',
            client_secret: '8ba982b35a2eb752771ded500d8648235d961764',
            refresh_token: '83503ba9f09d4b4b3c2ffbff29b8af7a866380cc',
            grant_type: 'refresh_token'

        })

    }).then(res => res.json())
        .then(res => getActivites(res))
}

reAuthorize()
