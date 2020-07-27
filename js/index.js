import { checkD } from "./util.js";

export default function renderIndex(data) {
    console.log(data)
    let mainContent = '';

    // Parallax
    mainContent += `
        <div class="parallax-container">
            <div class="parallax"><img id="league-parallax"></div>
        </div>
    `;

    // Info
    mainContent += `
        <div class="container">
            <div class="row">
                <h3 class="center-align">${data.competition.name}</h3>
            </div>
            <div class="row">
                <div class="col s12 m10 l8 offset-m1 offset-l2">
                    <table class="w-100 centered striped highlight">
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
    `

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
}