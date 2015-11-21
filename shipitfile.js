var path = require('path');

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/horu',
      deployTo: '/home/horu-app',
      repositoryUrl: 'https://github.com/pezza3434/Horu',
      ignores: ['.git'],
      keepReleases: 5,
      deleteOnRollback: false,
      shallowClone: true
    },
    production: {
      servers: 'root@horu.io'
    }
  });
  shipit.on('updated', function () {
    var buildDirectory = path.resolve('./public/');
    shipit.remoteCopy(buildDirectory, shipit.releasePath);

    var nodeModules = path.resolve('./node_modules');
    shipit.remoteCopy(nodeModules, shipit.releasePath);
  });
  shipit.on('finish', function () {
     shipit.remote('pm2 restart horu');
  });
};
