"use strict";
var DEFAULT_LANGUAGE = "en";
var ACCEPT_LANGUAGES = ["es", "en"];
function GetUserLanguage() {
    var local_language = window.navigator.userLanguage || window.navigator.language;
    if (local_language) {
        var language = local_language.split("-")[0];
        if (ACCEPT_LANGUAGES.includes(language)) {
            return language;
        }
    }
    return DEFAULT_LANGUAGE;
}
function getParameterByName(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return "";
    if (!results[2])
        return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function RenderRules(language) {
    $.get("data/" + language + "/rules.json", function (rules) {
        var template = rules.map(function (r) { return RuleComponent(r); }).join("");
        var dom_rules = document.querySelector("#rules");
        if (dom_rules)
            dom_rules.innerHTML = template;
    });
}
function RuleComponent(rule) {
    var name = rule.name, description = rule.description, dont = rule.dont;
    return "<div class=\"item\">\n      <div class=\"content\">\n        <div class=\"header\">\n        <i class=\"" + (dont ? "icon-remove" : "icon-ok") + " " + (dont ? "red" : "green") + "\"></i> " + name + "</div>\n        <div class=\"description\">\n          " + description + "\n        </div>\n      </div>\n    </div>";
}
function RenderBoxes(language) {
    $.get("data/" + language + "/boxes.json", function (rules) {
        var template = rules.map(function (b) { return BoxComponent(b); }).join("");
        var dom_boxes = document.querySelector("#boxes");
        if (dom_boxes)
            dom_boxes.innerHTML = template;
    });
}
function BoxComponent(box) {
    var name = box.name, description = box.description;
    return "<div class=\"item\">\n      <div class=\"content\">\n        <div class=\"header\"><i class=\"icon-dropbox brown\"></i> " + name + "</div>\n        <div class=\"description\">\n          " + description + "\n        </div>\n      </div>\n    </div>";
}
function RenderCommands(language) {
    $.get("data/" + language + "/commands.json", function (rules) {
        var template = rules.map(function (b) { return CommandComponent(b); }).join("");
        var dom_boxes = document.querySelector("#commands");
        if (dom_boxes)
            dom_boxes.innerHTML = template;
    });
}
function CommandComponent(box) {
    var name = box.name, description = box.description;
    return "<div class=\"item\">\n      <div class=\"content\">\n        <div class=\"header\"><i class=\"icon-terminal\"></i> " + name + "</div>\n        <div class=\"description\">\n          " + description + "\n        </div>\n      </div>\n    </div>";
}
function RenderMessages(language) {
    if (language == DEFAULT_LANGUAGE)
        return;
    $.get("data/" + language + "/messages.json", function (messages) {
        console.log("fetched");
        var keys = Object.keys(messages);
        var values = Object.values(messages);
        for (var i = 0, length_1 = values.length; i < length_1; i++) {
            var key = keys[i];
            var value = values[i].replace("\n", "<br />");
            var elements = document.getElementsByClassName("lg_" + key);
            for (var j = 0; j < elements.length; j++) {
                var element = elements[j];
                element.innerHTML = value;
            }
        }
    });
}
window.onload = function () {
    var language = getParameterByName("lang");
    if (!ACCEPT_LANGUAGES.includes(language)) {
        language = GetUserLanguage();
    }
    RenderMessages(language);
    RenderRules(language);
    RenderCommands(language);
    RenderBoxes(language);
};
