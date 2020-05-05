type iData = {
  name: string;
  description: string;
};
interface iRule extends iData {
  dont: boolean;
}

const DEFAULT_LANGUAGE: string = "en";
const ACCEPT_LANGUAGES = ["es", "en", "ja", "pt", "ru", "zh"];

function GetUserLanguage() {
  let local_language =
    window.navigator.userLanguage || window.navigator.language;
  if (local_language) {
    let language = local_language.split("-")[0];
    if (ACCEPT_LANGUAGES.includes(language)) {
      return language;
    }
  }
  return DEFAULT_LANGUAGE;
}

function getParameterByName(name: string, url?: string): string {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return "";
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function RenderRules(language: string) {
  $.get(`data/${language}/rules.json`, function (rules: iRule[]) {
    let template = rules.map((r) => RuleComponent(r)).join("");
    let dom_rules = document.querySelector("#rules");
    if (dom_rules) dom_rules.innerHTML = template;
  });
}

function RuleComponent(rule: iRule): string {
  let { name, description, dont } = rule;

  return `<div class="item">
      <div class="content">
        <div class="header">
        <i class="${dont ? "icon-remove" : "icon-ok"} ${
    dont ? "red" : "green"
  }"></i> ${name}</div>
        <div class="description">
          ${description}
        </div>
      </div>
    </div>`;
}

function RenderBoxes(language: string) {
  $.get(`data/${language}/boxes.json`, function (rules: iData[]) {
    let template = rules.map((b) => BoxComponent(b)).join("");
    let dom_boxes = document.querySelector("#boxes");
    if (dom_boxes) dom_boxes.innerHTML = template;
  });
}

function BoxComponent(box: iData): string {
  let { name, description } = box;
  return `<div class="item">
      <div class="content">
        <div class="header"><i class="icon-dropbox brown"></i> ${name}</div>
        <div class="description">
          ${description}
        </div>
      </div>
    </div>`;
}

function RenderCommands(language: string) {
  $.get(`data/${language}/commands.json`, function (rules: iData[]) {
    let template = rules.map((b) => CommandComponent(b)).join("");
    let dom_boxes = document.querySelector("#commands");
    if (dom_boxes) dom_boxes.innerHTML = template;
  });
}

function CommandComponent(box: iData): string {
  let { name, description } = box;
  return `<div class="item">
      <div class="content">
        <div class="header"><i class="icon-terminal"></i> ${name}</div>
        <div class="description">
          ${description}
        </div>
      </div>
    </div>`;
}

function RenderMessages(language: string) {
  if (language == DEFAULT_LANGUAGE) return;
  $.get(`data/${language}/messages.json`, function (messages: {}) {
    console.log("fetched");
    let keys: string[] = Object.keys(messages);
    let values: string[] = Object.values(messages);
    for (let i = 0, length = values.length; i < length; i++) {
      let key = keys[i];
      let value = values[i].replace("\n", "<br />");
      let elements = document.getElementsByClassName(`lg_${key}`);
      for (let j = 0; j < elements.length; j++) {
        let element = elements[j];
        element.innerHTML = value;
      }
    }
  });
}

window.onload = function () {
  let language: string = getParameterByName("lang");
  if (!ACCEPT_LANGUAGES.includes(language)) {
    language = GetUserLanguage();
  }
  RenderMessages(language);
  RenderRules(language);
  RenderCommands(language);
  RenderBoxes(language);
};
