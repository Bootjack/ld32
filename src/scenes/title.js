define(['proscenium'], function (Proscenium) {
    return {
        curtains: ['splash'],
        prep: function () {
            var $splash = $(Proscenium.curtains.splash.element);
            $splash.show();
        }
    };
});
