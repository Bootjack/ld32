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
    require([
        'curtains/controls',
        'curtains/splash',
        'roles/conductor',
        'scenes/title',
        'scenes/train',
        'stages/snap'
    ], function (
        controlsCurtain,
        splashCurtain,
        conductorRole,
        titleScene,
        trainScene,
        snapStage
    ) {
        Proscenium.role('conductor', conductorRole);

        Proscenium.actor('conductor').role('conductor');

        Proscenium.stage('snap', snapStage);

        Proscenium.curtain('controls', controlsCurtain);
        Proscenium.curtain('splash', splashCurtain);
        
        Proscenium.scene('title', titleScene);
        Proscenium.scene('train', trainScene);
        
        Proscenium.scenes.title.begin();
        
        window.title = Proscenium.scenes.title;
        window.train = Proscenium.scenes.train;
    });
});