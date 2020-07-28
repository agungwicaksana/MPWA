getTeams().then(d=> {
    renderFavorite(d);
});

function renderFavorite(teams) {
    // HTML
    let mainContent = '';
    mainContent += 
        `<div id="title-container">
            <div class="container">
                <div class="row">
                    <div class="col s12 center-align">
                        <h1>FAVORITE</h1>
                    </div>
                </div>
            </div>
        </div>`;

    let empty;
    let teamBoxes = ``;
    if(teams.length === 0){
        empty =  `
            <div class="col s12 center-align red-text text-accent-1 mt-20">
                <i class="large material-icons">favorite_border</i>
                <div><b>No Saved Teams Here</b></div>
            </div>
        `;
    } else {
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
    }
    mainContent += `
        <div id="team-container" class="grey lighten-4">
            <div class="container">
                <div class="row pt-3">
                    ${(teams.length > 0) ? teamBoxes : empty}
                </div>
            </div>
        </div>
    `;
    

    $('#content').html(mainContent);

    // JSDOM
    if($(window).width() <= 600) {
        $('#title-container').addClass('blue darken-4');
    }
    if($(window).width() >= 601) {
        $('#team-container > .container > .row').removeClass('pt-3');
    }
}