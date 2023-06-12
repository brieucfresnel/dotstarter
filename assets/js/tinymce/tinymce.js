(function () {
    tinymce.PluginManager.add('dot_tinymce_plugin', function (editor, url) {
        editor.addButton('dot_text_selector', {
            text: 'Paragraphe',
            icon: false,
            type: 'menubutton',
            menu: [
                {
                    text: 'xs',
                    onclick: function () {
                    }
                },
                {
                    text: 'sm',
                    onclick: function () {
                    }
                },
                {
                    text: 'md',
                    onclick: function () {
                    }
                },
                {
                    text: 'lg',
                    onclick: function () {
                    }
                },

            ]
        });
    });
})();