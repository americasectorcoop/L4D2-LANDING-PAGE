interface iRule {
  title: string;
  dont: boolean;
  description: string;
}

interface iBox {
  name: string;
  description: string;
}

function RenderRules() {
  $.get("data/rules.json", function (rules: iRule[]) {
    let template = rules.map((r) => RuleComponent(r)).join("");
    let dom_rules = document.querySelector("#rules");
    if (dom_rules) dom_rules.innerHTML = template;
  });
}

function RuleComponent(rule: iRule): string {
  let { title, description, dont } = rule;

  return `<div class="item">
      <i class="${dont ? "times" : "check"} ${dont ? "red" : "green"} icon"></i>
      <div class="content">
        <div class="header">${title}</div>
        <div class="description">
          ${description}
        </div>
      </div>
    </div>`;
}

function RenderBoxes() {
  $.get("data/boxes.json", function (rules: iBox[]) {
    let template = rules.map((b) => BoxComponent(b)).join("");
    let dom_boxes = document.querySelector("#boxes");
    if (dom_boxes) dom_boxes.innerHTML = template;
  });
}

function BoxComponent(box: iBox): string {
  let { name, description } = box;
  return `<div class="item">
      <i class="box open icon brown"></i>
      <div class="content">
        <div class="header">${name}</div>
        <div class="description">
          ${description}
        </div>
      </div>
    </div>`;
}

function RenderCommands() {
  $.get("data/commands.json", function (rules: iBox[]) {
    let template = rules.map((b) => CommandComponent(b)).join("");
    let dom_boxes = document.querySelector("#commands");
    if (dom_boxes) dom_boxes.innerHTML = template;
  });
}

function CommandComponent(box: iBox): string {
  let { name, description } = box;
  return `<div class="item">
      <i class="terminal icon"></i>
      <div class="content">
        <div class="header">${name}</div>
        <div class="description">
          ${description}
        </div>
      </div>
    </div>`;
}

window.onload = function () {
  RenderRules();
  RenderCommands();
  RenderBoxes();
};