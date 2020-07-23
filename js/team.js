export default function renderTeam(data) {
    // Data
    const sortTeams = data.teams.sort((t1, t2) => (t1.name > t2.name)?1:-1);

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
    const content = `<div class="container">Biasa</div>`
    mainContent += content;

    $('#content').html(mainContent);

    // JSDOM
    if($(window).width() <= 600) {
        $('#title-container').addClass('blue darken-4');
    }
}