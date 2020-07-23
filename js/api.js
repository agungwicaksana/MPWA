import renderTeam from "./team.js";

const apiUrl = "https://api.football-data.org/v2/";
const apiToken = "02c651fbb55e47e18b7702cacefba634";

const getData = (endpoint, renderer) => {
    $.ajax({
        url: `${apiUrl}/${endpoint}`,
        headers : {"X-Auth-Token": apiToken},
        // contentType: "application/json;charset=UTF-8",
        // dataType: 'json',
        complete : function () {
            // console.log('done')
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
        console.log('index')
        break
    case "team.html":
        console.log('team')
        getData('competitions/2001/teams', renderTeam)
        break;
    case "match.html":
        console.log('match');
        getData('competitions/2001/matches', function (data) {console.log('ini fungsi renderer',data)});
        break;
    case "favorite.html":
        console.log('Favorite');
        break;
    default:
        break;
}