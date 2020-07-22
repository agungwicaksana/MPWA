class Nav extends HTMLElement {
    connectedCallback() {
        this.render()
    };
    render() {
        this.innerHTML = `
        <nav class="blue darken-4">
            <div class="nav-wrapper">
                <div class="container nav-container">
                    <a href="index.html" class="brand-logo right"><img src="assets/navLogo.svg" height="70" alt="Logo"></a>
                    <ul id="nav-mobile" class="">
                        <li><a class="waves-effect" href="index.html">Home</a></li>
                        <li><a class="waves-effect" href="team.html">Team</a></li>
                        <li><a class="waves-effect" href="match.html">Match</a></li>
                        <li><a class="waves-effect" href="favorite.html">Favorite</a></li>
                    </ul>
                </div>
            </div>
        </nav>`;
    };
}
customElements.define("app-nav", Nav);