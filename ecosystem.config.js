module.exports = {
  apps : [{
    script: 'npm run dev'
  }],

  deploy : {
    production : {
      key  : 'key.pem',
      user : 'ubuntu',
      host : '54.147.108.166',
      ref  : 'origin/main',
      repo : 'git@github.com:pratik123-coder/Spotify-Clone.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
