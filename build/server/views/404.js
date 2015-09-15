var jade = require('jade/runtime');
module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (localization) {
buf.push("<!DOCTYPE html><html><head><title>404 - File not found</title><link rel=\"stylesheet\" type=\"text/css\" href=\"stylesheets/app-17962926.css\" media=\"all\"><link rel=\"stylesheet\" type=\"text/css\" href=\"stylesheets/clippy.css\" media=\"all\"></head><body class=\"error-404\"><div class=\"container\"><div class=\"row\"><div class=\"col-lg-12 error-frame\"><p class=\"headline\">" + (jade.escape(null == (jade_interp = localization.t('404 headline')) ? "" : jade_interp)) + "</p><p>" + (jade.escape(null == (jade_interp = localization.t('404 option a')) ? "" : jade_interp)) + "</p><p>" + (jade.escape(null == (jade_interp = localization.t('404 option separator')) ? "" : jade_interp)) + "</p><p>" + (jade.escape(null == (jade_interp = localization.t('404 option b')) ? "" : jade_interp)) + "</p></div></div></div><script src=\"javascripts/vendor-35d6f855.js\"></script><script src=\"javascripts/clippy.min.js\"></script><script>clippy.load('Clippy', function(agent) {\n  agent.show()\n  agent.speak(\"" + (jade.escape((jade_interp = localization.t('404 clippy sorry')) == null ? '' : jade_interp)) + "\");\n  setTimeout(function() {\n    agent.speak(\"" + (jade.escape((jade_interp = localization.t('404 clippy contact')) == null ? '' : jade_interp)) + "\");\n    setTimeout(function() {\n      agent.play(\"SendMail\");\n      setInterval(function() {\n        agent.animate();\n      }, 15000);\n    }, 5000);\n  }, 5000);\n\n});</script></body></html>");}.call(this,"localization" in locals_for_with?locals_for_with.localization:typeof localization!=="undefined"?localization:undefined));;return buf.join("");
}