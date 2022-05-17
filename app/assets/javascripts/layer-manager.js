function LayerManager(e) {
(this._mapInstance = e), (this._previousLayer = null);
}
(LayerManager.prototype.getPreviousLayer = function () {
return this._previousLayer;
}),
(LayerManager.prototype.removeLayer = function (e) {
  this._mapInstance.removeLayer(e.id), this._mapInstance.removeSource(e.id);
}),
(LayerManager.prototype.hasLayer = function (e) {
  return (
    this._mapInstance.getSource(e && e.id) &&
    this._mapInstance.getLayer(e && e.id)
  );
}),
(LayerManager.prototype.updateLayer = function (e) {
  return new Promise(
    function (a, r) {
      this.hasLayer(e)
        ? a()
        : (this._mapInstance.addLayer(e),
          this._mapInstance.once(
            "styledata",
            function () {
              try {
                this._previousLayer &&
                  this._previousLayer.id !== e.id &&
                  this.hasLayer(this._previousLayer) &&
                  this.removeLayer(this._previousLayer);
              } catch (e) {
                r(e);
              }
              (this._previousLayer = e), this.hasLayer(e) && a();
            }.bind(this)
          ));
    }.bind(this)
  );
});
