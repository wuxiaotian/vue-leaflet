// this L.CRS.Baidu from https://github.com/muyao1987/leaflet-tileLayer-baidugaode/blob/master/src/tileLayer.baidu.js
//添加了切片滤镜
if (L.Proj) {
    L.CRS.Baidu = new L.Proj.CRS('EPSG:900913', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs', {
        resolutions: function () {
            let level = 19
            let res = [];
            res[0] = Math.pow(2, 18);
            for (let i = 1; i < level; i++) {
                res[i] = Math.pow(2, (18 - i))
            }
            return res;
        }(),
        origin: [0, 0],
        bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
    });
}

L.TileLayer.ChinaProvider = L.TileLayer.extend({

    initialize: function (type, options) { // (type, Object)
        let providers = L.TileLayer.ChinaProvider.providers;

        options = options || {}

        let parts = type.split('.');

        let providerName = parts[0];
        let mapName = parts[1];
        let mapType = parts[2];

        let url = providers[providerName][mapName][mapType];
        options.subdomains = providers[providerName].Subdomains;
        options.key = options.key || providers[providerName].key;

        if ('tms' in providers[providerName]) {
            options.tms = providers[providerName]['tms']
        }

        options = L.extend({}, L.TileLayer.prototype.options, {
            colorize: function (pixel) {
                return pixel;
            },
            crossOrigin: 'Anonymous'
        }, options);

        L.TileLayer.prototype.initialize.call(this, url, options);
        // L.setOptions(this, options);
        // this.setColorizr(this.options.colorize);
        // this.on('tileload', function (e) {
        //     this._colorize(e.tile);
        // });
    },

    getTileUrl: function (coords) {
        let data = {
            s: this._getSubdomain(coords),
            x: coords.x,
            y: coords.y,
            z: this._getZoomForUrl(),
        };
        if (this._map && !this._map.options.crs.infinite) {
            let invertedY = this._globalTileRange.max.y - coords.y;
            if (this.options.tms) {
                data['y'] = invertedY;
            }
            data['-y'] = invertedY;
        }

        data.sx = data.x >> 4
        data.sy = ((1 << data.z) - data.y) >> 4

        return L.Util.template(this._url, L.Util.extend(data, this.options));
    },
    setColorizr: function (colorizrFactory) {
        if (!colorizrFactory || typeof colorizrFactory !== 'function') {
            throw 'The colorize option should be a function and return an object with at least one of "r", "g", "b", or "a" properties. Got:' +
            typeof colorizrFactory;
        } else {
            this.options.colorize = colorizrFactory;
        }
        this.redraw(false);
    },
    _createTile: function () {
        var tile = L.TileLayer.prototype._createTile.call(this);
        tile.crossOrigin = "Anonymous";
        return tile;
    },
    _colorize: function (img) {
        if (img.getAttribute('data-colorized')) {
            img.hidden = false;
            return;
        } else {
            img.hidden = true;
        }
        var _img = img;
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = _img.src;
        var _this = this;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var pix = imgd.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                var pixel = _this.options.colorize({r: pix[i], g: pix[i + 1], b: pix[i + 2], a: pix[i + 3]});
                if (!!!pixel || pixel !== Object(pixel) || Object.prototype.toString.call(pixel) === '[object Array]') {
                    if (i === 0) {
                        throw 'The colorize option should return an object with at least one of "r", "g", "b", or "a" properties.';
                    }
                } else {
                    if (pixel.hasOwnProperty('r') && typeof pixel.r === 'number') {
                        pix[i] = pixel.r;
                    }
                    if (pixel.hasOwnProperty('g')) {
                        pix[i + 1] = pixel.g;
                    }
                    if (pixel.hasOwnProperty('b')) {
                        pix[i + 2] = pixel.b;
                    }
                    if (pixel.hasOwnProperty('a')) {
                        pix[i + 3] = pixel.a;
                    }
                }
            }
            ctx.putImageData(imgd, 0, 0);
            _img.setAttribute('data-colorized', true);
            _img.src = canvas.toDataURL();
        };
    }
});

L.TileLayer.ChinaProvider.providers = {
    TianDiTu: {
        Normal: {
            Map: "//t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={key}",
            Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={key}"
        },
        Satellite: {
            Map: "//t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={key}",
            Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={key}"
        },
        Terrain: {
            Map: "//t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={key}",
            Annotion: "//t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={key}"
        },
        Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
        key: "027b47b487a1143c0d593eca816d1fac"
    },

    GaoDe: {
        Normal: {
            Map: '//webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        },
        Satellite: {
            Map: '//webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            Annotion: '//webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
        },
        Subdomains: ["1", "2", "3", "4"]
    },

    Google: {
        Normal: {
            Map: "//www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        },
        Satellite: {
            Map: "//www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
            Annotion: "//www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"
        },
        Subdomains: []
    },

    Geoq: {
        Normal: {
            Map: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
            PurplishBlue: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
            Gray: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
            Warm: "//map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
        },
        Theme: {
            Hydro: "//thematic.geoq.cn/arcgis/rest/services/ThematicMaps/WorldHydroMap/MapServer/tile/{z}/{y}/{x}"
        },
        Subdomains: []
    },

    OSM: {
        Normal: {
            Map: "//{s}.tile.osm.org/{z}/{x}/{y}.png",
        },
        Subdomains: ['a', 'b', 'c']
    },

    Baidu: {
        Normal: {
            Map: '//online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1'
        },
        Satellite: {
            Map: '//shangetu{s}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
            Annotion: '//online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=sl&v=020'
        },
        Midnight: {
            Map: 'http://api{s}.map.bdimg.com/customimage/tile?&x={x}&y={y}&z={z}&scale=1&customid=midnight'
        },
        Subdomains: '01',
        tms: true
    },

    Tencent: {
        Normal: {
            Map: "//rt{s}.map.gtimg.com/tile?z={z}&x={x}&y={-y}&type=vector&styleid=3",
        },
        Satellite: {
            Map: "//p{s}.map.gtimg.com/sateTiles/{z}/{sx}/{sy}/{x}_{-y}.jpg",
        },
        Terrain: {
            Map: "//p{s}.map.gtimg.com/demTiles/{z}/{sx}/{sy}/{x}_{-y}.jpg"
        },
        Subdomains: '0123',
    }

};

L.tileLayer.chinaProvider = function (type, options) {
    return new L.TileLayer.ChinaProvider(type, options);
};
