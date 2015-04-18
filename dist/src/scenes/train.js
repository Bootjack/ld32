define(['proscenium'], function (Proscenium) {
    return {
        curtains: ['controls'],
        stages: ['snap'],
        prep: function () {
            var conductor = Proscenium.roles.conductor.members[0];
            this.actors.push(conductor);
        }
    };
});