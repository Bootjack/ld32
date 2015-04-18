

require([
    'jquery',
    'proscenium',
    'snap',
    'jquery.mobile'
], function (
    $,
    Proscenium,
    Snap
) {

    var player;

    Proscenium.role('conductor', {
        init: function () {
            this.state.radius = 20;
            this.state.speed = 80;
            this.state.velocity = {x: 0, y: 0};
            this.state.x = 100;
            this.state.y = 100;
        },
        evaluate: function (interval) {
            var delta = {
                x: this.state.velocity.x * interval / 1000,
                y: this.state.velocity.y * interval / 1000
            };
            return this.walk.bind(this, delta);
        },
        render: function () {
            
        },
        aim: function (point) {
            var delta, distance, speed;
            speed = this.state.speed;
            delta = {
                x: point.x - this.state.x,
                y: point.y - this.state.y
            };
            distance = Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
            if (distance > 2 * this.state.radius) {
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
    });

    Proscenium.stage('snap', {
        throttle: 60,
        init: function () {
            this.snap = Snap('#snap-stage');
        },
        prep: function (config) {
            config = config || {};
            var conductor = this.conductor = config.conductor;

            conductor.svg = this.snap.circle(
                conductor.state.x,
                conductor.state.y,
                conductor.state.radius
            );
        },
        evaluate: function () {
            var conductor = this.conductor;
            conductor.svg.attr('cx', conductor.state.x);
            conductor.svg.attr('cy', conductor.state.y);
        }
    });    
    
    Proscenium.scene('train', {
        stages: ['snap'],
        prep: function () {
            var aimTimeout, isAimAllowed, snapNode, $snapNode;
            isAimAllowed = false;
            this.actors.push(player);
            snapNode = Proscenium.stages.snap.snap.el();
            function adjustAim(event) {
                event.preventDefault();
                if (isAimAllowed) {
                   player.aim({
                        x: event.pageX,
                        y: event.pageY
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
                isAimAllowed = false;
                clearTimeout(aimTimeout);
                player.stop();
            }
            $('#game-container').on({
                vmousedown: allowAim,
                vmouseup: denyAim,
                vmousemove: adjustAim
            });
        }
    });
    
    player = Proscenium.actor().role('conductor');

    Proscenium.scenes.train.begin({
        conductor: player
    });
});