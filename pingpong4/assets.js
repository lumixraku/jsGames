var assetsList = {

    picpathlist: [
        './assets/paddle.png',
        './assets/ball.png',
        './assets/block.png',
    ],

};

var Assets = {
    loadPicFinishd: function () {
        var loadPicAsyncList = [];
        // var loadedPicList = [];
        for (var path of assetsList.picpathlist) {
            let img = new Image()

            img.src = path;

            loadPicAsyncList.push(new Promise(resolve => {
                img.onload = function () {
                    resolve(img)
                    // loadedPicList.push(img);
                }
            }))
        }
        return Promise.all(loadPicAsyncList)
    }
}
export default Assets