define(['snap', 'proscenium'], function (Snap, Proscenium) {

    function constrain(val, lower, upper) {
        return Math.max(lower, Math.min(val, upper));
    }    
    
    function distance(a, b) {
        var delta = {
            x: a.state.x - b.state.x,
            y: a.state.y - b.state.y
        };
        return Math.sqrt(Math.pow(delta.x, 2) + Math.pow(delta.y, 2));
    }    

    return {
        init: function () {
            this.snap = Snap('#snap-stage');
            this.passengerNearConductorFilter = this.snap.filter(
                Snap.filter.shadow(0, 0, 4, 'cyan', 0.85)
            );
        },
        prep: function (config) {
            config = config || {};
            var conductor, endZone, passengers, safeZone, snap;
            
            snap = this.snap;
            
            conductor = Proscenium.actors.conductor;
            passengers = Proscenium.roles.passenger.members;
            endZone = Proscenium.actors.endZone;
            safeZone = Proscenium.actors.safeZone;
            
            safeZone.svg = snap.path(
                'M' + safeZone.state.bounds[0].x + ',' + safeZone.state.bounds[0].y +
                'L' + safeZone.state.bounds[1].x + ',' + safeZone.state.bounds[0].y +
                'L' + safeZone.state.bounds[1].x + ',' + safeZone.state.bounds[1].y +
                'L' + safeZone.state.bounds[0].x + ',' + safeZone.state.bounds[1].y +
                'Z'
            ).addClass('safe-zone');
            
            endZone.svg = snap.path(
                'M' + endZone.state.bounds[0].x + ',' + endZone.state.bounds[0].y +
                'L' + endZone.state.bounds[1].x + ',' + endZone.state.bounds[0].y +
                'L' + endZone.state.bounds[1].x + ',' + endZone.state.bounds[1].y +
                'L' + endZone.state.bounds[0].x + ',' + endZone.state.bounds[1].y +
                'Z'
            ).addClass('end-zone');
            
            conductor.svg = snap.circle(
                conductor.state.x,
                conductor.state.y,
                conductor.state.radius
            );
            conductor.svg.addClass('conductor');
            
            passengers.forEach(function (passenger) {
                passenger.svg = snap.circle(
                    passenger.state.x,
                    passenger.state.y,
                    passenger.state.radius
                ).addClass('passenger');
               
                passenger.svg.mousedown(function (event) {
                    event.stopPropagation();

                    if (distance(passenger, conductor) < 4 * conductor.state.radius) {
                        passenger.set('punched', true);
                    }
                });
            });
        },
        evaluate: function () {
            var conductor, conductorPosition, endZone, inEndZone, inSafeZone, passengers, 
                passengerNearConductorFilter, safeZone, safeZoneBounds;
            
            conductor = Proscenium.actors.conductor;
            passengers = Proscenium.roles.passenger.members;
            endZone = Proscenium.actors.endZone;
            safeZone = Proscenium.actors.safeZone;
            safeZoneBounds = safeZone.state.bounds;
            
            passengerNearConductorFilter = this.passengerNearConductorFilter;
                        
            conductorPosition = {x: conductor.state.x, y: conductor.state.y};
            
            passengers.forEach(function (passenger) {
                if (distance(passenger, conductor) < 4 * conductor.state.radius) {
                    passenger.svg.addClass('near-conductor');
                    passenger.svg.attr({
                        filter: passengerNearConductorFilter
                    });
                } else {
                    passenger.svg.removeClass('near-conductor');
                    passenger.svg.attr({
                        filter: ''
                    });
                }
                passenger.svg.toggleClass('punched', passenger.state.punched);
            });
            
            inSafeZone = Snap.path.isPointInside(safeZone.svg, conductorPosition.x, conductorPosition.y);
            
            if (!inSafeZone) {
                conductor.set('x', 
                    constrain(conductor.state.x, safeZoneBounds[0].x + 1, safeZoneBounds[1].x - 1)
                );
                conductor.set('y', 
                    constrain(conductor.state.y, safeZoneBounds[0].y + 1, safeZoneBounds[1].y - 1)
                );
            }
            
            conductor.svg.attr('cx', conductor.state.x);
            conductor.svg.attr('cy', conductor.state.y);
            
            endZone.svg.toggleClass('unlocked', endZone.state.unlocked);
            inEndZone = Snap.path.isPointInside(endZone.svg, conductorPosition.x, conductorPosition.y);
            conductor.set('atExit', inEndZone);
        },
        clear: function (scene) {
            scene.actors.forEach(function (actor) {
                if (actor.svg && 'function' === typeof actor.svg.remove) {
                    actor.svg.remove();
                }
            });
        }
    };
});