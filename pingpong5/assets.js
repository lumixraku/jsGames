var assetsList = {

    picpathlist: {
        paddle:'./assets/paddle.png',
        ball:'./assets/ball.png',
        block:'./assets/block.png',
        finish: './assets/finish.png',
        dead: './assets/dead.jpg',
        welcome: './assets/welcome.png',
    },

};

var Assets = {
    loadPicFinishd: function () {
        var loadPicAsyncList = [];
        // var loadedPicList = [];
        for(let key of Object.keys(assetsList.picpathlist)){
        // for (var path of assetsList.picpathlist) {
            let img = new Image()



            //这里是使用了 let 作为 img 和 key 的声明 就不会有值相同的问题
            img.src = assetsList.picpathlist[key];
            loadPicAsyncList.push(new Promise(resolve => {
                img.onload = function () {
                    img.name = key
                    resolve(img)
                    // loadedPicList.push(img);
                }
            }))
        }

        //因为返回的是数组 后面处理不方便 最好还是用 k v 的形式
        return Promise.all(loadPicAsyncList).then(function(imgs){
            var assetsObj = {}
            for(var img of imgs){
                assetsObj[img.name] = img
            }
            return assetsObj
        })
    }
}
export default Assets