
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

exports.stats = function(req, res) {
    res.json({value: 0});
};