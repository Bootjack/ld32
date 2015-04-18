define(['proscenium'], function (Proscenium) {
    return {
        init: function () {
            this.state.radius = 20;
            this.state.speed = 120;
            this.state.velocity = {x: 0, y: 0};
            this.state.x = 200;
            this.state.y = 100;
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
            if (distance > 2.5 * this.state.radius) {
                this.state.velocity = {
                    x: speed * (delta.x / distance),
                    y: speed * (delta.y / distance)
                };
            } else {
                this.stop();
            }
        },
        walk: function (delta) {
            this.state.x += delta.x;
            this.state.y += delta.y;
        },
        stop: function () {
            this.state.velocity = {x: 0, y: 0};
        }
    };
});