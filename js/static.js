$(document).ready(function () {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    const mIcon = (code, className='') => `<i class="material-icons ${className}">${code}</i>`;
    
    // If on Movile (screen <= 600px)
    if(windowWidth <= 600){
        // Mobile nav
        $('nav').removeClass('blue darken-4').addClass('white z-depth-4');
        $('#nav-mobile li').each((i,e) => {
            const setIcon = $(e).children();
            switch (i) {
                case 0:
                    setIcon.html(mIcon('home'));
                    break;
                case 1:
                    setIcon.html(mIcon('people'));
                    break;
                case 2:
                    setIcon.html(mIcon('compare_arrows'));
                    break;
                case 3:
                    setIcon.html(mIcon('favorite'));
                    break;
                default:
                    break;
            }
        });
        $('#content').css({"margin-bottom": `${$('nav').height() + 20}px`});
    }

    
});