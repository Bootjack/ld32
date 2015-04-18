define(['proscenium'], function (Proscenium) {
    return {
        element: 'splash-curtain',
        init: function () {
            var element, $element;
            this.update();
            element = this.element;
            $element = $(element);
            $element.find('button.start').on('click', function (event) {
                $element.hide();
                Proscenium.scenes.title.end();
                Proscenium.scenes.train.begin();
            });
        },
        template: function (data) {
            return '<button class="start">Start</button>';
        }
    };
});