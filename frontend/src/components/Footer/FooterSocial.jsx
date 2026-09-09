import mailIcon from "../../assets/email.svg";
import instaIcon from "../../assets/instagram.svg";
import tiktokIcon from "../../assets/tiktok.svg";
import facebookIcon from "../../assets/facebook.svg";
import xIcon from "../../assets/x.svg";

export default function FooterSocial() {
    return (
        <div className="footer-social">
            <a href="mailto:diniz.vito@gmail.com">
                <img src={mailIcon} alt="Email" />
            </a>
            <a href="#" title="Instagram">
                <img src={instaIcon} alt="Instagram" />
            </a>
            <a href="#" title="TikTok">
                <img src={tiktokIcon} alt="TikTok" />
            </a>
            <a href="#" title="Facebook">
                <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="#" title="X">
                <img src={xIcon} alt="X" />
            </a>
        </div>
    );
}