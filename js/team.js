import urlHttps from "./url.js";

export default function renderTeam(data) {
    // Data
    const teams = data.teams.sort((t1, t2) => (t1.name > t2.name)?1:-1);

    // HTML
    let mainContent = '';
    const pageTitle = 
        `<div id="title-container">
            <div class="container">
                <div class="row">
                    <div class="col s12 center-align">
                        <h1>TEAMS</h1>
                    </div>
                </div>
            </div>
        </div>`;
    mainContent += pageTitle;

    console.log(teams)

    let teamBoxes = ``;
    teams.forEach(team => {
        teamBoxes += `
            <div class="col s12 m6 l4">
                <div class="team-box white z-depth-3 waves-effect">
                    <div class="team-logo">
                        <img src="${urlHttps(team.crestUrl)}" onerror="this.src='/assets/Ball.svg'" alt="Logo ${team.name}">
                    </div>
                    <div class="team-info">
                        <div class="team-name">
                            ${team.name} / ${team.shortName}
                        </div>
                        <div class="team-founded">
                            ${team.founded}
                        </div>
                    </div>
                </div>
            </div>
        `
    });

    const content = `
        <div id="team-container" class="grey lighten-4">
            <div class="container">
                <div class="row mt-3">
                    ${teamBoxes}
                </div>
            </div>
        </div>
    `
    mainContent += content;

    $('#content').html(mainContent);

    // JSDOM
    if($(window).width() <= 600) {
        $('#title-container').addClass('blue darken-4');
    }
    if($(window).width() >= 601) {
        $('#team-container > .container > .row').removeClass('mt-3');
    }
}