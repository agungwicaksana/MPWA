import { checkD } from "./util.js";
import urlHttps from "./url.js";

export default function renderIndex(data) {
    let mainContent = '';

    // Parallax
    mainContent += `
        <div class="parallax-container">
            <div class="parallax"><img id="league-parallax"></div>
        </div>
    `;

    
    // Standings
    mainContent += `
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h5 class="center-align">Standings</h5>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <h6 class="center-align">Groups</h6>
                <div class="pagination-container">
                    <ul class="pagination center-align hm0">
                    </ul>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row group-container">
                
            </div>
        </div>
    `;

    // Info
    mainContent += `
        <div class="container">
            <div class="row league-box">
                <div class="col s12 mb-1">
                    <h5 class="center-align">${data.competition.name}</h5>
                </div>
                <div class="col s12 m10 l8 offset-m1 offset-l2">
                    <table class="w-100 centered striped highlight mb-1">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>${data.competition.name}</td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>${data.competition.code}</td>
                            </tr>
                            <tr>
                                <td>Event Start</td>
                                <td>${data.season.startDate}</td>
                            </tr>
                            <tr>
                                <td>Event End</td>
                                <td>${data.season.endDate}</td>
                            </tr>
                            <tr>
                                <td>Winner</td>
                                <td>${checkD(data.season.winner)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    $('#content').html(mainContent);
    
    // JS DOM
    const WWidth = $(window).width();
    if(WWidth <= 600) {
        $('#league-parallax').attr("src", "assets/banner.jpg");
    }
    if(WWidth >= 601 && WWidth <= 992) {
        $('#league-parallax').attr("src", "assets/bannermd.jpg");
    }
    if(WWidth > 992) {
        $('#league-parallax').attr("src", "assets/bannerlg.jpg");
    }
    M.Parallax.init(document.querySelector('.parallax'));

    // Pagination list
    let groups = [];
    data.standings.forEach(e => {
        groups.push(e.group)
    });
    groups = groups.filter((v,i,s) => s.indexOf(v) === i);
    for(let i = 0; i < groups.length; i++) {
        const pgLi = `<li class="${(i === 0) ? 'active' : 'waves-effect'}"><a href="#${groups[i]}">${groups[i].substr(-1)}</a></li>`;
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
        renderGroups(e);
    });

    function renderGroups(g) {
        if(g === undefined) g = {"target" : "<p>A</p>"};

        let groupsHtml = '';
        data.standings.forEach(group => {
            if(group.type === "TOTAL" && group.group.substr(-1) === $(g.target).text()){
                group.table.forEach(team => {
                    const {id, crestUrl, name} = team.team;
                    const {won, draw, lost, position, points} = team;

                    let txtColor;
                    switch (position) {
                        case 1:
                            txtColor = "amber-text text-darken-1"
                            break;
                        case 2:
                            txtColor = "amber-text text-darken-3"
                            break;
                        case 3:
                            txtColor = "amber-text text-darken-4"
                            break;
                        default:
                            txtColor = "red-text text-darken-3"    
                            break;
                    }

                    groupsHtml += `
                        <div class="col s12 m6 l4">
                            <a href="team-detail.html?id=${id}">
                                <div class="team-box white z-depth-3 waves-effect">
                                    <div class="team-logo">
                                        <img src="${urlHttps(crestUrl)}" onerror="this.src='/assets/Ball.svg'" alt="Logo ${name}">
                                    </div>
                                    <div class="team-info">
                                        <div class="team-name">
                                            <b>${name}</b>
                                        </div>
                                        <div class="team-data">
                                            W: ${won} | D: ${draw} | L: ${lost}
                                        </div>
                                        <div class="team-data">
                                            Points: ${points}
                                        </div>
                                        <div class="team-position ${txtColor}">
                                            #${position}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `;
                });
            }
        });


        $('.group-container').html(groupsHtml);
    }
    renderGroups()
}