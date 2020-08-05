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
        caches.match(`${(team) ? apiUrl.substr(0,32) : apiUrl}/${endpoint}`)
        .then(resp => {
            if(resp) {
                resp.json().then(respJson => {
                    $('#loader').remove();
                    renderer(respJson)
                })
            }
        })
    }

    $.ajax({
        url: `${(team) ? apiUrl.substr(0,32) : apiUrl}/${endpoint}`,
        headers : {"X-Auth-Token": apiToken},
        complete : function () {
            $('#loader').remove();
        },
        success: function(r){
            renderer(r)
        },
        error: function(er) {console.log(er)}
    })
};

switch (document.location.href.split('/').pop()) {
    case "index.html":
    case "/":
    case "":
        getData('standings', renderIndex)
        break
    case "team.html":
        getData('teams', renderTeam)
        break;
    case "match.html":
        getData('matches', renderMatch);
        break;
    default:
        // Team-Detail
        const teamDetailParam = document.location.href.split('/').pop().split('?');
        const teamId = teamDetailParam[1].substr(3);
        if(teamDetailParam[0] === "team-detail.html") {
            getData(`teams/${teamId}`, renderTeamDetail, true)
        } else if(teamDetailParam[0] === "saved-team.html") {
            getTeam(teamId).then(d => {
                renderTeamDetail(d)
            })
        } else {
            location.href = '/';
        }
        break;
}