import { generate } from "./js/app";
import { changeHeader } from "./js/headerChanger";
import { getPixabayKey } from "./js/headerChanger";
import { getPixabayResp } from "./js/headerChanger";
import { handleSubmit } from "./js/formHandler";
import { start } from "./js/formHandler"; //todo: remove later

import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/header.scss";
// import "./styles/style.scss";

export { generate, changeHeader, getPixabayKey, getPixabayResp, start };
