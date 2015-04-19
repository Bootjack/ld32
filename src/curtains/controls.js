define(['proscenium'], function (Proscenium) {
    return {
        element: 'controls-curtain',
        init: function () {
            var $stage, timeout;
            
            $stage = $('#snap-stage');
            
            function adjustAim(event) {
                var conductor, offset, touchEvent, upEvent;
                conductor = Proscenium.actors.conductor;
                offset = $stage.offset();
                touchEvent = (/^touch/).test(event.originalEvent.type);
                upEvent = (/^vmouseup$/).test(event.type);
                event.preventDefault();
                clearTimeout(timeout);
                if (!upEvent && (touchEvent || 1 === event.which)) {
                    conductor.aim({
                        x: event.pageX - offset.left,
                        y: event.pageY - offset.top
                    });
                    timeout = setTimeout(function () {
                        adjustAim(event);
                    }, 50);
                } else {
                    conductor.stop();
                }
            }
            
            $stage.on({
                vmousemove: adjustAim,
                vmousedown: adjustAim,
                vmouseup: adjustAim
            });
        }
    };
});