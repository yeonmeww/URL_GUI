module.exports = function override(config, env) {
    // 웹팩 개발 서버 설정에서 'allowedHosts'를 'auto'로 변경하여
    // Invalid options object 에러를 해결합니다.
    if (config.devServer) {
        config.devServer.allowedHosts = 'auto';
    }
    return config;
};