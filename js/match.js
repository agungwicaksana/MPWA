function renderMatch(data) {
    // Format Data
    const formatT = (text) => {
        const splitted = text.toLowerCase().split('_');
        for(let i=0;i<splitted.length;i++){
            splitted[i] = splitted[i].charAt(0).toUpperCase() + splitted[i].slice(1);
        };
        return splitted.join(' ');
    }

    let mainContent = '';
    const pageTitle = 
        `<div id="title-container">
            <div class="container">
                <div class="row">
                    <div class="col s12 center-align">
                        <h1>MATCHES</h1>
                    </div>
                </div>
            </div>
        </div>`;
    mainContent += pageTitle;

    const content = `
        <div id="match-container" class="grey lighten-4">
            <div class="container">
                <div class="row pt-3">
                    <div class="pagination-container">
                        <ul class="pagination center-align hm0">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row matches-container">
                    
                </div>
            </div>
        </div>
    `;
    mainContent += content;

    $('#content').html(mainContent);

    // JSDOM
    if($(window).width() <= 600) {
        $('#title-container').addClass('blue darken-4');
    }
    if($(window).width() >= 601) {
        $('#match-container > .container > .row').removeClass('pt-3');
    }

    // Pages
    const itemsPerPage = 25
    const pages = Math.ceil(data.count / itemsPerPage);
    for(let i = 0; i < pages; i++) {
        const pgLi = `<li class="${(i === 0) ? 'active' : 'waves-effect'}"><a href="#page${i+1}">${i+1}</a></li>`;
        $('ul.pagination').append(pgLi);
    };

    // Pagination func
    $('.pagination li').click(function (e) { 
        e.preventDefault();
        $('.pagination li').each(function (i, el) {
            if($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).addClass('waves-effect');
            };
        });
        $(e.target).parent().addClass('active');
        $(e.target).parent().removeClass('waves-effect');
        renderMatches(e);
    });

    // Render Matches to DOM
    function renderMatches(e) {
        $('.matches-container').html('');
        if(e === undefined) e = {"target" : "<p>1</p>"};

        // Get data index per page
        const startData = ($(e.target).text() - 1) * itemsPerPage;
        let endData = ($(e.target).text()) * itemsPerPage;
        (endData > data.count) ? (endData = data.count - 1) : endData;
        
        // Show data
        const pageMatches = data.matches.slice(startData, endData);
        pageMatches.forEach(match => {
            const matchEl = `
                <div class="col s12 m6 l6">
                    <div class="team-box wr white z-depth-3 waves-effect">
                        <div class="match-info mb-1">
                            <div class="match-home">
                                ${match.homeTeam.name}
                            </div>
                            <div class="vs"><span class="v">V</span><span class="s">S</span></div>
                            <div class="match-away right-align">
                                ${match.awayTeam.name}
                            </div>
                        </div>
                        <div class="match-info">
                            <div class="info-head">Half Time</div>
                            <div class="info-data dleft">${checkD(match.score.halfTime.homeTeam)}</div>
                            <div class="info-data dright">${checkD(match.score.halfTime.awayTeam)}</div>
                        </div>
                        <div class="match-info">
                            <div class="info-head">Full Time</div>
                            <div class="info-data dleft">${checkD(match.score.fullTime.homeTeam)}</div>
                            <div class="info-data dright">${checkD(match.score.fullTime.awayTeam)}</div>
                        </div>
                        <div class="match-info match-info-2">
                            <div class="info-head info-head-2">Stage</div>
                            <div class="info-data info-data-2">${formatT(match.stage)}</div>
                        </div>
                        <div class="match-info match-info-2">
                            <div class="info-head info-head-2">Status</div>
                            <div class="info-data info-data-2">${formatT(match.status)}</div>
                        </div>
                    </div>
                </div>
            `;
            $('.matches-container').append(matchEl);
        });
    };
    renderMatches()


};