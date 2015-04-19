define(['snap', 'proscenium'], function (Snap, Proscenium) {

    function constrain(val, lower, upper) {
        return Math.max(lower, Math.min(val, upper));
    }    
    
    return {
        init: function () {
            this.snap = Snap('#snap-stage');
        },
        prep: function (config) {
            config = config || {};
            var conductor, safeZone;
            
            conductor = Proscenium.actors.conductor;
            safeZone = Proscenium.actors.safeZone;
                        
            conductor.svg = this.snap.circle(
                conductor.state.x,
                conductor.state.y,
                conductor.state.radius
            );
            conductor.svg.addClass('conductor');
            
            safeZone.svg = this.snap.path(
                'M' + safeZone.state.bounds[0].x + ',' + safeZone.state.bounds[0].y +
                'L' + safeZone.state.bounds[1].x + ',' + safeZone.state.bounds[0].y +
                'L' + safeZone.state.bounds[1].x + ',' + safeZone.state.bounds[1].y +
                'L' + safeZone.state.bounds[0].x + ',' + safeZone.state.bounds[1].y +
                'Z'
            ).addClass('safe-zone');
        },
        evaluate: function () {
            var conductor, conductorPosition, isInSafeZone, safeZone, safeZoneBounds;
            
            conductor = Proscenium.actors.conductor;
            safeZone = Proscenium.actors.safeZone;
            safeZoneBounds = safeZone.state.bounds;
            
            conductorPosition = {x: conductor.state.x, y: conductor.state.y};
            
            isInSafeZone = Snap.path.isPointInside(safeZone.svg, conductorPosition.x, conductorPosition.y);
            
            if (!isInSafeZone) {
                conductor.set('x', 
                    constrain(conductor.state.x, safeZoneBounds[0].x + 1, safeZoneBounds[1].x - 1)
                );
                conductor.set('y', 
                    constrain(conductor.state.y, safeZoneBounds[0].y + 1, safeZoneBounds[1].y - 1)
                );
            }
            
            conductor.svg.attr('cx', conductor.state.x);
            conductor.svg.attr('cy', conductor.state.y);
        },
        clear: function () {
            var conductor = Proscenium.actors.conductor;
            conductor.svg.remove();
        }
    };
});