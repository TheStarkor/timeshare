
import { library } from "@fortawesome/fontawesome-svg-core";
// 사용할 아이콘 import
import { faUser, faMessage, faHome, faUserGroup } from "@fortawesome/free-solid-svg-icons";

const init = () => {
  library.add(faMessage, faUser, faHome, faUserGroup);
}

export default init;