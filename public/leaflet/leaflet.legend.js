L.Control.Legend = L.Control.extend({
    options: {
        position: 'topright' //初始位置
    },
    initialize: function (options) {
        L.Util.extend(this.options, options);
    },
    onAdd: function (map) {
        //创建一个class为info legend的div
        this._container = L.DomUtil.create('div', 'info legend');
        //创建一个图片要素
        let  grades = [0, 50, 100, 500, 1000, 3000],
            labels = [],
            from, to;

        for (let  i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(
                '<i class="legend-item" style="background:' + this._getColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
        }

        this._container.innerHTML = labels.join('<br>');
        return this._container;
    },
    _getColor: function (d) {
        return d > 3000 ? '#800026' :
            d > 1000 ? '#BD0026' :
                d > 500 ? '#E31A1C' :
                    d > 100 ? '#FC4E2A' :
                        d > 50 ? '#FD8D3C' :
                            d > 20 ? '#FEB24C' :
                                d > 10 ? '#FED976' :
                                    '#FFEDA0';
    },
    onRemove: function (map) {
        // Nothing to do here
    }
});
L.control.legend = function (opts) {
    return new L.Control.Legend(opts);
}
