export default function renderIndex(data) {
    console.log(data)
    let mainContent = '';

    // Parallax
    mainContent += `
        <div class="parallax-container">
            <div class="parallax"><img id="league-parallax"></div>
        </div>
    `;

    $('#content').html(mainContent);
    
    // JS DOM

    const WWidth = $(window).width();
    if(WWidth <= 600) {
        $('#league-parallax').attr("src", "assets/banner.jpg");
        console.log('sm')
    }
    if(WWidth >= 601 && WWidth <= 992) {
        console.log('md')
        $('#league-parallax').attr("src", "assets/bannermd.jpg");
    }
    if(WWidth > 992) {
        console.log('lg')
        $('#league-parallax').attr("src", "assets/bannerlg.jpg");
    }
    
    M.Parallax.init(document.querySelector('.parallax'));
}