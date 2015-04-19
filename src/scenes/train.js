define(['proscenium'], function (Proscenium) {
    var solved = {
        test: function () {
            var allPunched, conductor, endZone, passengers;
            conductor = Proscenium.actors.conductor;
            passengers = Proscenium.roles.passenger.members;
            endZone = Proscenium.actors.endZone;
            
            atExit = conductor.state.atExit;
            allPunched = passengers.every(function (passenger) {
                return passenger.state.punched;
            });

            endZone.set('unlocked', allPunched);
            
            return (allPunched && atExit);
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
            var conductor, endZone, passengers, safeZone;
            
            conductor = Proscenium.actors.conductor;
            safeZone = Proscenium.actor('safeZone');
            endZone = Proscenium.actor('endZone').set('unlocked', false);
            
            passengers = [Proscenium.actor().role('passenger').set('x', 100).set('y', 240)];

            this.actors = this.actors.concat(conductor, endZone, passengers, safeZone);
            
            conductor.set('x', 200);
            conductor.set('y', 540);
            conductor.set('velocity', {x: 0, y: 0});
            conductor.set('atExit', false);
            
            safeZone.set('bounds', [
                {x: 26, y: 26},
                {x: 374, y: 574}
            ]);
            
            endZone.set('bounds', [
                {x: 150, y: 0},
                {x: 250, y: 60}
            ]);
        },
        clear: function () {
            this.actors = [];
        }
    };
});