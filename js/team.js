function renderTeam(data) {
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

    let teamBoxes = ``;
    teams.forEach(team => {
        teamBoxes += `
            <div class="col s12 m6 l4">
                <a href="team-detail.html?id=${team.id}">
                    <div class="team-box white z-depth-3 waves-effect">
                        <div class="team-logo">
                            <img src="${urlHttps(team.crestUrl)}" onerror="this.src='/assets/Ball.svg'" alt="Logo ${team.name}">
                        </div>
                        <div class="team-info">
                            <div class="team-name">
                                ${team.name} / <b>${team.tla}</b>
                            </div>
                            <div class="team-founded">
                                ${team.founded}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `
    });

    const content = `
        <div id="team-container" class="grey lighten-4">
            <div class="container">
                <div class="row pt-3">
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
        $('#team-container > .container > .row').removeClass('pt-3');
    }
}