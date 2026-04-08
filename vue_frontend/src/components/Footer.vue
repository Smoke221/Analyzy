<template>
    <footer class="footer-section">
        <div class="container">
            <div class="footer-cta pt-5 pb-5">
                <div class="row">
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <span class="material-symbols-outlined footer-icon" aria-hidden="true">location_on</span>
                            <div class="cta-text">
                                <h4>Find us</h4>
                                <span>Bengaluru, India</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <span class="material-symbols-outlined footer-icon" aria-hidden="true">call</span>
                            <div class="cta-text">
                                <h4>Call us</h4>
                                <span>+91 8121792408</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <span class="material-symbols-outlined footer-icon" aria-hidden="true">mail</span>
                            <div class="cta-text">
                                <h4>Mail us</h4>
                                <span>ismoketechlabs@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-content pt-5 pb-5">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 mb-50">
                        <div class="footer-widget">
                            <div class="footer-logo">
                                <h4 class="footer-name">Analyzy</h4>
                                <img src="../assets/A no bg.png" class="img-fluid" alt="logo">
                            </div>
                            <div class="footer-text">
                                <h5>Read Faster. Understand More. Analyzy is Your AI Document Assistant.</h5>
                                <p>Analyzy empowers you to work smarter, not harder. Save time, uncover insights, and
                                    get answers from your documents with our AI-powered analysis.</p>
                            </div>
                            <div class="footer-social-icon">
                                <span>Contact</span>
                                <a class="social-link" href="mailto:ismoketechlabs@gmail.com" aria-label="Email">
                                    <span class="material-symbols-outlined social-link__icon">mail</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                        <div class="footer-widget">
                            <div class="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <ul>
                                <li><router-link to="/">Home</router-link></li>
                                <li><router-link to="/analyzy">Analyze</router-link></li>
                                <li><router-link to="/auth">Sign in</router-link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                        <div class="footer-widget">
                            <div class="footer-widget-heading">
                                <h3>Subscribe</h3>
                            </div>
                            <div class="footer-text mb-25">
                                <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                            </div>
                            <div class="subscribe-form">
                                <form action="#" @submit.prevent>
                                    <input type="email" placeholder="Email address (coming soon)" disabled>
                                    <button type="button" disabled aria-label="Subscribe disabled">
                                        <span class="material-symbols-outlined">send</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright-area">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                        <div class="copyright-text">
                            <p>Copyright &copy; 2024, All Right Reserved <router-link to="/">Analyzy</router-link></p>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                        <div class="footer-menu">
                            <ul>
                                <li><router-link to="/">Home</router-link></li>
                                <li><router-link to="/analyzy">Analyze</router-link></li>
                                <li><router-link to="/auth">Sign in</router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: "FooterBar",
};
</script>
<style scoped>
ul {
    margin: 0px;
    padding: 0px;
}

.footer-section {
    background: #2E2E3A;
    position: relative;
}

.footer-cta {
    border-bottom: 1px solid #bbb8b23a;
}

.footer-icon {
    color: #DE9151;
    font-size: 30px;
    float: left;
    margin-top: 8px;
}

.cta-text {
    padding-left: 1rem;
    display: inline-block;
}

.cta-text h4 {
    color: #fff;
    font-size: 1.2rem;
    margin-bottom: 2px;
}

.cta-text span {
    color: #BBB8B2;
    font-size: 1rem;
}

.footer-content {
    position: relative;
    z-index: 2;
}

.footer-pattern img {
    position: absolute;
    top: 0;
    left: 0;
    height: 330px;
    background-size: cover;
    background-position: 100% 100%;
}

.footer-logo {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}

.footer-logo img {
    max-width: 200px;
}

.footer-name {
    color: white;
}

.footer-text h5 {
    color: #DE9151;
}

.footer-text p {
    font-size: 14px;
    color: #BBB8B2;
    line-height: 28px;
}

.footer-social-icon span {
    color: #fff;
    display: block;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Poppins', sans-serif;
}

.footer-social-icon a.social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    margin-right: 15px;
    border-radius: 50%;
    background: #DE9151;
    color: #fff;
    text-decoration: none;
}

.social-link__icon {
    font-size: 22px;
}

.footer-widget-heading h3 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 40px;
    position: relative;
}

.footer-widget-heading h3::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -15px;
    height: 2px;
    width: 50px;
    background: #DE9151;
}

.footer-widget ul li {
    display: inline-block;
    width: 50%;
    margin-bottom: 12px;
    font-size: 0.8rem;
}

.footer-widget ul li a:hover {
    color: #DE9151;
}

.footer-widget ul li a {
    color: #BBB8B2;
    text-transform: capitalize;
    text-decoration: none;
}

.subscribe-form {
    position: relative;
    overflow: hidden;
}

.subscribe-form input {
    width: 100%;
    padding: 14px 28px;
    background: #25252e;
    border: 1px solid #25252e;
    color: #fff;
}

.subscribe-form button {
    position: absolute;
    right: 0;
    background: #DE9151;
    padding: 13px 20px;
    border: 1px solid #DE9151;
    top: 0;
}

.subscribe-form button .material-symbols-outlined {
    color: #fff;
    font-size: 22px;
}

.copyright-area {
    background: #25252e;
    padding: 25px 0;
}

.copyright-text p {
    margin: 0;
    font-size: 14px;
    color: #878787;
}

.copyright-text p a {
    color: #DE9151;
}

.footer-menu li {
    display: inline-block;
    margin-left: 20px;
}

.footer-menu li:hover a {
    color: #DE9151;
}

.footer-menu li a {
    font-size: 14px;
    color: #878787;
}
</style>