define(['proscenium'], function (Proscenium) {
    return {
        throttle: 60,
        init: function () {
            this.snap = Snap('#snap-stage');
            this.conductor = Proscenium.roles.conductor.members[0];
        },
        prep: function (config) {
            config = config || {};
            var conductor = this.conductor;
            conductor.svg = this.snap.circle(
                conductor.state.x,
                conductor.state.y,
                conductor.state.radius
            );
            conductor.svg.addClass('conductor');
        },
        evaluate: function () {
            var conductor = this.conductor;
            conductor.svg.attr('cx', conductor.state.x);
            conductor.svg.attr('cy', conductor.state.y);
        }
    };
});