const apiUrl = "https://api.football-data.org/v2/competitions/2001/";
const apiToken = "02c651fbb55e47e18b7702cacefba634";

const getData = (endpoint, renderer, team = false) => {
    $('#loader').html(`
        <div class="container mt-20">
            <div class="row">
                <div class="col s12 center-align">
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
            
                        <div class="spinner-layer spinner-red">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
            
                        <div class="spinner-layer spinner-yellow">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
            
                        <div class="spinner-layer spinner-green">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div><div class="gap-patch">
                                <div class="circle"></div>
                            </div><div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `)
    if("caches" in window){
        caches.match(`${(team) ? apiUrl.substr(0,32) : apiUrl}/${endpoint}`, {
            headers : {"X-Auth-Token": apiToken}
        }).then(resp => {
            if(resp) {
                resp.json().then(respJson => {
                    console.log('dari cache')
                    console.log(respJson)
                    $('#loader').remove();
                    renderer(respJson)
                })
            }
        })
    }

    $.ajax({
        url: `${(team) ? apiUrl.substr(0,32) : apiUrl}/${endpoint}`,
        headers : {"X-Auth-Token": apiToken},
        // contentType: "application/json;charset=UTF-8",
        // dataType: 'json',
        complete : function () {
            $('#loader').remove();
        },
        success: function(r){
            console.log('dari api')
            renderer(r)
        },
        error: function(er) {console.log(er)}
    })
};

switch (document.location.href.split('/').pop()) {
    case "index.html":
    case "/":
    case "":
        console.log('index')
        getData('standings', renderIndex)
        break
    case "team.html":
        console.log('team')
        getData('teams', renderTeam)
        break;
    case "match.html":
        console.log('match');
        getData('matches', renderMatch);
        break;
    case "favorite.html":
        console.log('Favorite');
        break;
    default:
        // Team-Detail
        const teamDetailParam = document.location.href.split('/').pop().split('?');
        if(teamDetailParam[0] === "team-detail.html") {
            const teamId = teamDetailParam[1].substr(3);
            getData(`teams/${teamId}`, renderTeamDetail, true)
        } else {
            location.href = '/';
        }
        break;
}