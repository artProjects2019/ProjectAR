import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faRankingStar,
    faSignOut,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faGithub,
} from '@fortawesome/free-brands-svg-icons'

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faRankingStar,faSignOut,faPlus,faFacebook, faInstagram,faGithub);
export { FontAwesomeIcon };