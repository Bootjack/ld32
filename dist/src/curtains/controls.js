define(['proscenium'], function (Proscenium) {
    return {
        element: 'controls-curtain',
        init: function () {
            var aimTimeout, conductor, isAimAllowed, $svg;
            $stage = $('#snap-stage');
            isAimAllowed = false;
            function adjustAim(event) {
                var conductor, offset;
                conductor = Proscenium.roles.conductor.members[0];
                offset = $stage.offset();
                event.preventDefault();
                if (isAimAllowed) {
                    conductor.aim({
                        x: event.pageX - offset.left,
                        y: event.pageY - offset.top
                    });
                    isAimAllowed = false;
                    aimTimeout = setTimeout(allowAim, 50);
                }
            }
            function allowAim(event) {
                isAimAllowed = true;
                if (event) {
                    adjustAim(event);
                }
            }
            function denyAim() {
                var conductor = Proscenium.roles.conductor.members[0];
                isAimAllowed = false;
                clearTimeout(aimTimeout);
                conductor.stop();
            }
            $(this.element).on({
                vmousedown: allowAim,
                vmouseup: denyAim,
                vmousemove: adjustAim
            });
        }
    };
});