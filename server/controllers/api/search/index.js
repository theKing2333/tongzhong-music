const netease = require('./netease');
const qq = require('./qq');
const xiami = require('./xiami');

const search = (req, res, next) => {
  let { keyword, type, provider, limit, page } = req.query;
  if (!(keyword && type && provider)) {
    return res.json({
      searchSuccess: false,
      message: 'Lack of necessary parameters!'
    });
  }
  
  limit = limit || 4;
  page = page || 1;

  if (provider === 'netease') {
    netease.search(keyword, type, limit, page)
      .then(data => res.json({
        searchSuccess: true,
        data: data
      })).catch(err => res.json({
        searchSuccess: false,
        message: err.message
      }));

  } else if (provider === 'qq') {
    qq.search(keyword, type, limit, page)
      .then(data => res.json({
        searchSuccess: true,
        data: data
      })).catch(err => res.json({
        searchSuccess: false,
        message: err.message
      }));
  } else if (provider === 'xiami') {
    xiami.search(keyword, type, limit, page)
      .then(data => res.json({
        searchSuccess: true,
        data: data
      })).catch(err => res.json({
        searchSuccess: false,
        message: err.message
      }));
  } else {
    res.json({
      searchSuccess: false,
      message: 'Incorrect provider!'
    });
  }
};

module.exports = search;
