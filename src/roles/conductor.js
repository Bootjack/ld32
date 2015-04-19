define(['proscenium'], function (Proscenium) {
    return {
        init: function () {
            this.set('radius', 20);
            this.set('speed', 120);
        },
        evaluate: function (interval) {
            var delta = {
                x: this.state.velocity.x * interval / 1000,
                y: this.state.velocity.y * interval / 1000
            };
            return this.walk.bind(this, delta);
        },
        aim: function (point) {
            var delta, distance, speed;
            speed = this.state.speed;
            delta = {
                x: point.x - this.state.x,
                y: point.y - this.state.y
            };
            distance = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
            if (distance > this.state.radius) {
                this.set('velocity', {
                    x: speed * (delta.x / distance),
                    y: speed * (delta.y / distance)
                });
            } else {
                this.stop();
            }
        },
        walk: function (delta) {
            this.set('x', this.state.x + delta.x);
            this.set('y', this.state.y + delta.y);
        },
        stop: function () {
            this.set('velocity', {x: 0, y: 0});
        },
        bounce: function () {
            this.set('x', this.state.x - 0.02 * this.state.velocity.x);
            this.set('y', this.state.y - 0.02 * this.state.velocity.y);
        }
    };
});