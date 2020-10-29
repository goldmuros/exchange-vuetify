const tableAssetsFormat = assetsOrigin => {
  const assets = [];

  assetsOrigin.forEach(asset => {
    assets.push({
      id: asset.id,
      icon: `https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`,
      ranking: asset.rank,
      name: asset.name,
      price: asset.priceUsd,
      symbol: asset.symbol,
      cap_market: asset.marketCapUsd,
      variation24hs: asset.changePercent24Hr,
      input: ""
    });
  });

  return assets;
};

export { tableAssetsFormat };
