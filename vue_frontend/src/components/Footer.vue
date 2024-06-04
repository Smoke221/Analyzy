<template>
    <footer class="footer-section">
        <div class="container">
            <div class="footer-cta pt-5 pb-5">
                <div class="row">
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="fas fa-map-marker-alt"></i>
                            <div class="cta-text">
                                <h4>Find us</h4>
                                <span>Bengaluru, India</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="fas fa-phone"></i>
                            <div class="cta-text">
                                <h4>Call us</h4>
                                <span>+91 00000 00000</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="far fa-envelope-open"></i>
                            <div class="cta-text">
                                <h4>Mail us</h4>
                                <span>sample@info.com</span>
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
                                <span>Follow us</span>
                                <a href="#"><i class="fab fa-facebook-f facebook-bg"></i></a>
                                <a href="#"><i class="fab fa-twitter twitter-bg"></i></a>
                                <a href="#"><i class="fab fa-google-plus-g google-bg"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                        <div class="footer-widget">
                            <div class="footer-widget-heading">
                                <h3>Useful Links</h3>
                            </div>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">about</a></li>
                                <li><a href="#">services</a></li>
                                <li><a href="#">portfolio</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Our Services</a></li>
                                <li><a href="#">Expert Team</a></li>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Latest News</a></li>
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
                                <form action="#">
                                    <input type="text" placeholder="Email Address">
                                    <button><i class="fab fa-telegram-plane"></i></button>
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
                            <p>Copyright &copy; 2024, All Right Reserved <a href="#">Smoke</a></p>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                        <div class="footer-menu">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Privacy</a></li>
                                <li><a href="#">Policy</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script></script>
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

.single-cta i {
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

.footer-social-icon a {
    color: #fff;
    font-size: 16px;
    margin-right: 15px;
}

.footer-social-icon i {
    height: 40px;
    width: 40px;
    text-align: center;
    line-height: 38px;
    border-radius: 50%;
}

.facebook-bg {
    background: #3B5998;
}

.twitter-bg {
    background: #DE9151;
}

.google-bg {
    background: #DD4B39;
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
}

.footer-widget ul li a:hover {
    color: #DE9151;
}

.footer-widget ul li a {
    color: #BBB8B2;
    text-transform: capitalize;
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

.subscribe-form button i {
    color: #fff;
    font-size: 22px;
    transform: rotate(-6deg);
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