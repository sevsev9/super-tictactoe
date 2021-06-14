module.exports = {
    initIndex: function (app) {
        app.get('/', (req, res) => {
            res.sendFile(__dirname + '/files/demo.html');
        });
    }
}
