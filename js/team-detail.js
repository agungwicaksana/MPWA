function renderTeamDetail(team) {
    console.log(team)
    
    // DoB to Age
    const getAge = (dob) => {
        const date = dob.substr(0,10).split('-');
        let [y, m, d] = date;
        
        const today = new Date();
        const yNow = today.getFullYear();
        const mNow = today.getMonth();
        const dNow = today.getDate();
        
        if(dNow < d){
            d += 30;
            m -= 1;
        };
        if(mNow < m) {
            m += 12;
            y -= 1;
        };

        return yNow-y;
    }

    // HTML
    let mainContent = '';

    // Squad
    let players = '';
    team.squad.forEach(p => {
        players +=`
            <tr>
                <td>${checkD(p.shirtNumber)}</td>
                <td>${checkD(p.name)}</td>
                <td>${checkD(p.position)}</td>
                <td>${checkD(getAge(p.dateOfBirth))}</td>
                <td>${checkD(p.nationality)}</td>
            </tr>
        `;
    });

    const head = 
    `   
    <div class="container pt-3">
        <div class="team-box team-detail">
            <div class="team-logo team-detail">
                <div class="back-btn">
                    <a class="btn-floating btn-large waves-effect waves-light red darken-4 btn-small"><i class="material-icons">arrow_back</i></a>
                </div>
                <img src="${urlHttps(team.crestUrl)}" onerror="this.src='/assets/Ball.svg'" alt="Logo ${checkD(team.name)}">
            </div>
            <div class="team-info team-detail mt-2">
                <div class="team-name wr center-align">
                    <h3 class="w-100 hm0">${checkD(team.name)}</h3>
                    <h6 class="w-100 b">${checkD(team.tla)}</h6>
                </div>
                <div class="team-details w-90">
                    <table>
                        <tbody>
                            <tr>
                                <td class="b">Shortname</td>
                                <td>${checkD(team.shortName)}</td>
                            </tr>
                            <tr>
                                <td class="b">Founded</td>
                                <td>${checkD(team.founded)}</td>
                            </tr>
                            <tr>
                                <td class="b">Website</td>
                                <td><a href="${team.website}" target="_blank">${checkD(team.website)}</a></td>
                            </tr>
                            <tr>
                                <td class="b">Venue</td>
                                <td>${checkD(team.venue)} / ${checkD(team.area.name)}</td>
                            </tr>
                            <tr>
                                <td class="b">Colors</td>
                                <td>${checkD(team.clubColors)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="team-squad">
                <h4 class="w-100 center-align pt-3">Squad</h4>
                <table class="striped responsive-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Pos</th>
                            <th>Age</th>
                            <th>Nat</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${players}
                    </tbody>
                </table>
            </div>
            <div class="favorite-btn">
                <a class="waves-effect btn red darken-4 text-white">SAVE</a>
            </div>
        </div>
    </div>
    `;
    mainContent += head;

    // DOM Manipulation
    $('#content').html(mainContent);
    
    if($(window).width() <= 992){
        $('.team-squad > table').addClass('centered');
    }
    if($(window).width() > 992){
        $('.favorite-btn > a').addClass('z-depth-3');
    }

    // Save Button func
    $('.favorite-btn a').click(function (e) { 
        e.preventDefault();
        if(!$(e.target).hasClass('saved')){
            $(e.target).removeClass('darken-4')
            $(e.target).addClass('lighten-2 saved')
            // Save to indexedDB
        } else {
            $(e.target).removeClass('lighten-2 saved')
            $(e.target).addClass('darken-4')
            // Del from indexedDB
        };
    });

    // Back Button func
    $('.back-btn').click(function(e) {  
        e.preventDefault();
        location.href = 'team.html';
    });
}