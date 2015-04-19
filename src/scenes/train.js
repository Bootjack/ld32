define(['proscenium'], function (Proscenium) {
    var solved = {
        test: function () {
            var conductor, exit, position;
            conductor = Proscenium.actors.conductor;
            position = {x: conductor.state.x, y: conductor.state.y};
            return (conductor.state.y < 200);
        },
        run: function () {
            Proscenium.scenes.train.end();
            Proscenium.scenes.title.begin();
        },
        bind: function (scope) {
            return {
                test: solved.test.bind(scope),
                run: solved.run.bind(scope)
            };
        }
    };
    
    return {
        curtains: ['controls'],
        stages: ['snap'],
        init: function () {
            this.conditions.push(solved.bind(this));
        },
        prep: function () {
            var conductor, safeZone;
            
            conductor = Proscenium.actors.conductor;
            safeZone = Proscenium.actor('safeZone');

            this.actors = [];
            
            conductor.set('x', 200);
            conductor.set('y', 540);
            conductor.set('velocity', {x: 0, y: 0});

            this.actors.push(conductor);
            
            safeZone.set('bounds', [
                {x: 26, y: 26},
                {x: 374, y: 574}
            ]);
            
            Proscenium.curtains.controls.update();
        },
        clear: function () {
            
        }
    };
});