import { MdEmail } from 'react-icons/md';
import { FaInstagram, FaTiktok, FaFacebook, FaXTwitter } from 'react-icons/fa6';

export default function FooterSocial() {
    return (
        <div className="footer-social">
            <a href="mailto:diniz.vito@gmail.com">
                <MdEmail size={24} />
            </a>
            <a href="#" title="Instagram">
                <FaInstagram size={24}/>
            </a>
            <a href="#" title="TikTok">
                <FaTiktok size={24} />
            </a>
            <a href="#" title="Facebook">
                <FaFacebook size={24} />
            </a>
            <a href="#" title="X">
                <FaXTwitter size={24} />
            </a>
        </div>
    );
}