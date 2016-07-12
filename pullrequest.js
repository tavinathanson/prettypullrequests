var isGitHub = $("meta[property='og:site_name']").attr('content') === 'GitHub';

chrome.storage.sync.get({url: '', saveCollapsedDiffs: true, tabSwitchingEnabled: false}, function(items) {
    if (items.url == window.location.origin ||
        "https://github.com" === window.location.origin) {
        var minus_lines = [];
        var plus_lines = [];
        skip_lines = ["", "(", ")", "{", "}"];
        line_text_to_element_plus = {};
        line_text_to_element_minus = {};
        $('.diff-table .blob-code-deletion').each(function(index, line) {
            var line_text = $.trim($.trim($(line).text()).substring(1));
            if ($.inArray(line_text, skip_lines) == -1) { minus_lines.push(line_text); }
            line_text_to_element_minus[line_text] = line;
        });
        $('.diff-table .blob-code-addition').each(function(index, line) {
            var line_text = $.trim($.trim($(line).text()).substring(1));
            if ($.inArray(line_text, skip_lines) == -1) { plus_lines.push(line_text); }
            line_text_to_element_plus[line_text] = line;
        });
        /*
        $(minus_lines).each(function(index, line) {
            console.log("Minus: " + line);
        });
        $(plus_lines).each(function(index, line) {
            console.log("Plus: " + line);
        });
        */
        $(minus_lines).each(function(index, line) {
            if ($.inArray(line, plus_lines) !== -1) {
                //console.log("Contains " + line);
                elem = line_text_to_element_plus[line]
                if (elem.className.indexOf("code-yellow") === -1) {
                    line_text_to_element_plus[line].className = "blob-code blob-code-yellow";
                }
            }
        });
    }
});
