/**
 * Created by W on 2018-06-28 22:06.
 */

import esriLoader from 'esri-loader';
import tileInfo from '../tdt_data';
import store from '@/store/store'
import Vue from 'vue'
import { plugins } from 'handsontable';
import drawClass from '@/components/js/DrawClass'
import drawClassWarningEvent from '@/components/js/rcdd/DrawClassWarningEvent'
import urlClass from '../UrlClass'
import global from '@/components/js/Global'
import WindowsEvent from '../WindowsEvent';
import legend from '@/components/js/Legend'
import PictureProperty from '@/components/js/PipeBurst/PictureProperty';
import drawClassPipeBurst from '@/components/js/PipeBurst/DrawClassPipeBurst'

var mapObjMy;
class Methods {
    loadArcgis() {// 该方法用于加载 arcgis 依赖的js,css 等
        esriLoader.loadScript({ // 加载js
            //url: 'http://' + location.host + '/static/dojo/dojo.js',
            url: 'https://112.64.170.158:8012/ztdata/library/3.25/3.25/init.js',
            //url: 'https://10.200.6.71:8889/arcgis_js_api/library/3.25/3.25/init.js',
            //url:'http://192.168.1.177:8081/library/3.25/3.25/init.js',
            dojoConfig: {
                async: true
            },
        });
        // 加载css
        //esriLoader.loadCss('http://' + location.host + '/static/esri/css/esri.css');
        esriLoader.loadCss('https://112.64.170.158:8012/ztdata/library/3.25/3.25/esri/css/esri.css');
        esriLoader.loadCss('https://112.64.170.158:8012/ztdata/library/3.25/3.25/dijit/themes/tundra/tundra.css');
        /* esriLoader.loadCss('https://10.200.6.71:8889/arcgis_js_api/library/3.25/3.25/esri/css/esri.css');
        esriLoader.loadCss('https://10.200.6.71:8889/arcgis_js_api/library/3.25/3.25/dijit/themes/tundra/tundra.css'); */
        // 加载模块
        esriLoader.loadModules([
            'esri/map',
            'esri/layers/TiledMapServiceLayer',
            'esri/SpatialReference',
            'esri/geometry/Extent',
            'esri/layers/TileInfo',
            'esri/geometry/Point',
            'esri/geometry/Polygon',
            'esri/geometry/Circle',
            'esri/layers/ArcGISDynamicMapServiceLayer',
            'esri/symbols/PictureMarkerSymbol',
            'esri/symbols/SimpleMarkerSymbol',
            'esri/symbols/SimpleLineSymbol',
            'esri/symbols/SimpleFillSymbol',
            'esri/graphic',
            'esri/layers/GraphicsLayer',
            'esri/Color',
            "esri/layers/FeatureLayer",
            "esri/renderers/HeatmapRenderer",            
            "esri/tasks/query",
            "esri/tasks/QueryTask",
            "esri/symbols/CartographicLineSymbol",
            "esri/tasks/IdentifyParameters",
            "esri/tasks/IdentifyTask",
            'esri/geometry/Geometry',
            'esri/symbols/TextSymbol',
            'esri/symbols/Font',
            'esri/tasks/GeometryService',
            "esri/lang", 
            "esri/config",
            "esri/tasks/BufferParameters",
            "dijit/TooltipDialog", 
            "dijit/popup",
            "dojo/dom-style",
            "dojo/domReady!"
        ], {
                // url: 'http://' + location.host + '/static/dojo/dojo.js'
                url:'https://112.64.170.158:8012/ztdata/library/3.25/3.25/init.js'
                //url:'https://10.200.6.71:8889/arcgis_js_api/library/3.25/3.25/init.js',
                //url:'http://192.168.1.177:8081/library/3.25/3.25/init.js'
            })
            .then(this.loading)
            .then(obj => {
                this.initMap(obj);
            })
            .catch((err) => {
                console.trace(err.message);
            });
    }

    loading([// 注意 这里的参数是数组,该方法用于自定义TiledMapServiceLayer加载天地图;
        Map,
        TiledMapServiceLayer,
        SpatialReference,
        Extent,
        TileInfo,
        Point,
        Polygon,
        Circle,
        ArcGISDynamicMapServiceLayer,
        PictureMarkerSymbol,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        SimpleFillSymbol,
        Graphic,
        GraphicsLayer,
        Color,
        FeatureLayer,
        HeatmapRenderer,
        Query,
        QueryTask,
        CartographicLineSymbol,
        IdentifyParameters,
        IdentifyTask,
        Geometry,
        TextSymbol,
        Font,
        GeometryService,
        lang,
        esriConfig,
        BufferParameters, 
         TooltipDialog, popup, domStyle
    ]) {
        dojo.declare('TDT', TiledMapServiceLayer, {

            constructor(maptype) {
                this._maptype = maptype;
                this.spatialReference = new SpatialReference({ wkid: 102113 });
                this.initialExtent = (this.fullExtent = drawClass.GetMapInitExtent(global.initExtent))//new Extent(380083.27864125, 252673.3739848, 605825.77522175, 400526.3930992,
                //this.spatialReference));

                var tileInfo1 = tileInfo.tileInfo;
                for (var i = 0; i < tileInfo.tileInfo.lods.length; i++) {
                    tileInfo1.lods[i].resolution *= 0.869725407161398;
                }
                this.tileInfo = new TileInfo(tileInfo1);
                this.loaded = true;
                this.onLoad(this);
            },

            getTileUrl(level, row, col) {
                return 'https://112.64.170.158:8890/Service1.svc/Rest/GMService/' + col + '/' + row + '/' + level + '/1';
            }
        });
        return { // return 之后才能使用链式调用
            Map,
            TiledMapServiceLayer,
            SpatialReference,
            Extent,
            TileInfo,
            Point,
            Polygon,
            Circle,
            ArcGISDynamicMapServiceLayer,
            PictureMarkerSymbol,
            SimpleMarkerSymbol,
            SimpleLineSymbol,
            SimpleFillSymbol,
            Graphic,
            GraphicsLayer,
            Color,
            FeatureLayer,
            HeatmapRenderer,
            Query,
            QueryTask,
            CartographicLineSymbol,
            IdentifyParameters,
            IdentifyTask,
            Geometry,
            TextSymbol,
            Font,
            GeometryService,
            lang,
            esriConfig,
            BufferParameters, 
            TooltipDialog,
            popup, 
            domStyle,
            TDT
        };
    }


    initMap(obj) { // 初始化地图,并设置中心点等
        this.mapObj = obj;// 将对象保存到vue data 的 maoObj中,方便调用;
        mapObjMy = obj;
        let map = new this.mapObj.Map('map2', { logo: false });// 创建地图实例
        let img = new TDT('img') // 影像
        map.addLayer(img) // 将图层添加到map对象
        /* var reliefMap = new this.mapObj.ArcGISDynamicMapServiceLayer(urlClass.reliefMap);
        map.addLayer(reliefMap);  */
        var initExtent = drawClass.GetMapInitExtent(global.initExtent)//new esri.geometry.Extent(380083.27864125, 252673.3739848, 605825.77522175, 400526.3930992,
        map.setExtent(initExtent);
        //new this.mapObj.SpatialReference({ wkid: 102113 }));
        var gl = new this.mapObj.GraphicsLayer();

        //esriConfig.defaults.io.proxyUrl = "http://112.64.170.158:8888/proxy.ashx";
        //esriConfig.defaults.io.alwaysUseProxy = false;

        var warningEventLayer = new this.mapObj.GraphicsLayer();
        var pressureNodeControlLayer = new this.mapObj.GraphicsLayer();
        map.addLayer(warningEventLayer);
        map.addLayer(pressureNodeControlLayer);
        esriConfig.defaults.io.proxyUrl = "http://112.64.170.158:8888/proxy.ashx";
        esriConfig.defaults.io.alwaysUseProxy = false;

        var LocationGraphicsLayer = new this.mapObj.GraphicsLayer();
        var flowLayer = new this.mapObj.GraphicsLayer();
        var strengthLayer = new this.mapObj.GraphicsLayer();
        var pipeBurstLayer = new this.mapObj.GraphicsLayer();
        var pipeBurstNodeLayer = new this.mapObj.GraphicsLayer();
        var pipeBurstCloseValveLayer = new this.mapObj.GraphicsLayer();
        var flowDirectionLayer = new this.mapObj.GraphicsLayer();
        var pipeBurstPositionLayer = new this.mapObj.GraphicsLayer();
        var valveAttributeLayer = new this.mapObj.GraphicsLayer();
        map.addLayer(gl);
        map.addLayer(LocationGraphicsLayer);
        map.addLayer(pipeBurstLayer);
        map.addLayer(pipeBurstNodeLayer);
        map.addLayer(pipeBurstCloseValveLayer);
        map.addLayer(flowDirectionLayer);
        map.addLayer(flowLayer)
        map.addLayer(pipeBurstPositionLayer);
        map.addLayer(valveAttributeLayer);
        map.addLayer(strengthLayer);
        var geometryService = new esri.tasks.GeometryService(urlClass.geometryService);

        var point = new this.mapObj.Point(498766.6875, 321263.46875, new this.mapObj.SpatialReference({ wkid: 102113 }));
        var pictureMarkerSymbol = new mapObjMy.PictureMarkerSymbol('../../../static/assets/dingwei_03.png', 98, 98);
        var simpleMarkerSymbol = new this.mapObj.SimpleMarkerSymbol().setStyle(
            this.mapObj.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(
                new this.mapObj.Color([0, 255, 0, 0.5]));

        var dynamicMapServiceLayer = new this.mapObj.ArcGISDynamicMapServiceLayer(urlClass.baseMapUrl);
        map.addLayer(dynamicMapServiceLayer);
   
        var hour = 0;//结果时间
        var field = 'Result_Flow_' + hour;//查询的字段

        function myAlert(content, title) {
            alert(content, title, {
                confirmButtonText: '确定',
            });
        }

        var dialog = new dijit.TooltipDialog({
            id: "tooltipDialog",
            style: "position: absolute; width: 150px; font: normal normal normal 10pt Helvetica;z-index:100"
          });

          var pipeLayerId = 8;
        var hour = 0;//结果时间
        var field = 'Result_Flow_' + hour;//查询的字段

        var gra;
        var identifyTask;
        var isMapClick = false;
        var isMapClickSupplyPath = false;
        var isMapClickDiffusion = false;
        var isMapClickPipeBurst = false;
        map.on("click", function (e) {
            console.log(isMapClickPipeBurst)
            if (isMapClick || isMapClickSupplyPath || isMapClickDiffusion || isMapClickPipeBurst)
                myIdentify(e);
            /* else
                myAlert('请先点击查询按钮', '提示'); */

        });

        pipeBurstCloseValveLayer.on("click", function (e) {//图形鼠标点击响应事件
            console.log(e.graphic);
            if (e.graphic.attributes.GraphicType == 'Valve') {
                pipeBurstCloseValveLayer.remove(e.graphic);
                e.graphic.attributes.GraphicType = 'BadValve';
                var gra1 = drawClass.CreatePictureGraphic(PictureProperty.badValve, e.graphic.geometry, e.graphic.attributes);
                pipeBurstCloseValveLayer.add(gra1);
                WindowsEvent.MyDispatchEvent('SetCloseValveState', { ElementID : e.graphic.attributes.ElementId });
            }
            else if (e.graphic.attributes.GraphicType == 'BadValve'){
                pipeBurstCloseValveLayer.remove(e.graphic);
                e.graphic.attributes.GraphicType = 'Valve';
                var gra1 = drawClass.CreatePictureGraphic(PictureProperty.closeValve, e.graphic.geometry, e.graphic.attributes);
                pipeBurstCloseValveLayer.add(gra1);
                WindowsEvent.MyDispatchEvent('SetCloseValveState', { ElementID : e.graphic.attributes.ElementId });
            }
        });

        var clickMapPoint;
        /**
         * Identify查询初始化
         * @param {*} e 地图点击事件对象
         */
        function myIdentify(e) {
            clickMapPoint = new esri.geometry.Point(e.mapPoint.x, e.mapPoint.y, map.spatialReference);
            var typeTemp = '';
            if (isMapClick)
                typeTemp = 'mapClick';
            else if (isMapClickSupplyPath) {
                typeTemp = 'SupplyPath';
            }
            else if (isMapClickDiffusion) {
                typeTemp = 'Diffusion';
            }
            else if (isMapClickPipeBurst) {
                typeTemp = 'PipeBurst'
            }
            IdentifyMain(e.mapPoint, typeTemp);
        }


        function IdentifyMain(pointTemp, typeTemp) {
            var idenrifyParams = new esri.tasks.IdentifyParameters();
            idenrifyParams.returnGeometry = true;
            idenrifyParams.width = map.width;
            idenrifyParams.height = map.height;
            idenrifyParams.geometry = pointTemp;
            idenrifyParams.tolerance = 2;
            idenrifyParams.mapExtent = map.extent;
            idenrifyParams.spatialReference = map.spatialReference;
            identifyTask = new esri.tasks.IdentifyTask(urlClass.baseMapUrl);
            if (typeTemp == "mapClick" || typeTemp == '') {
                identifyTask.execute(idenrifyParams, myResultFunction);
            }
            else if (typeTemp == "SupplyPath" || typeTemp == "Diffusion" || typeTemp == "PipeBurst") {
                identifyTask.execute(idenrifyParams, SupplyPathResultFunction);
                if(typeTemp=="PipeBurst")
                {
                    PositionSupplyPathNode(pointTemp,pipeBurstPositionLayer);
                }
            }
        }
        function PositionSupplyPathNode(geometry,layerTemp){
            layerTemp.clear();
            var point = esri.geometry.Point(geometry.x,geometry.y,new esri.SpatialReference({ wkid: global.spatialReference })); 
            var gra1 = drawClass.CreatePictureGraphic(PictureProperty.redPin,geometry)//new esri.Graphic(geometry, LocationMarkerSymbol);
            layerTemp.add(gra1);
        }

        var supplyPathReturn = new Object;

        function SupplyPathResultFunction(results) {

            var elemetidTemp = 0;
            var elementType = 0;
            var feature;
            if (results.length > 0) {
                var identifyResult = results[0];
                feature = identifyResult.feature;
                var attributeTemp = feature.attributes;
                console.log(attributeTemp)
                if (feature.geometry.type == 'point') {
                    if (isMapClickSupplyPath) {
                        supplyPathReturn.elementId = attributeTemp.ElementId;
                        supplyPathReturn.elementTypeId = attributeTemp.ElementTypeId;
                    }
                    else
                        elemetidTemp = attributeTemp.ElementId;
                    elementType = 0;
                }
                else if (feature.geometry.type == 'polyline') {
                    if (isMapClickSupplyPath) {
                        supplyPathReturn.elementId = attributeTemp.StartNodeID;
                        supplyPathReturn.elementTypeId = attributeTemp.StartNodeType;
                    }
                    else if (isMapClickPipeBurst) {
                        elemetidTemp = attributeTemp.ElementId;
                    }
                    else
                        elemetidTemp = attributeTemp.StartNodeID;
                    elementType = 1;
                }
                else {
                    return;
                }
            }
            if (isMapClickPipeBurst) {
                isMapClickPipeBurst = false;
                WindowsEvent.MyDispatchEvent('PipeBurstMapClickReturn', { ElementID: elemetidTemp, ElementTypeId: elementType });
            }

        }

        /**
         * identify查询成功返回函数
         * @param {*} results 返回结果的对象
         */
        function myResultFunction(results) {
            var feature;
            map.infoWindow.hide();
            if (results.length > 0) {
                {
                    feature = results[0];
                    MyJudgeLayerId(feature);
                }
            }

        }
        /**
         * 地图比例尺分类
         */
        var myScale = global.myScale;
        /**
         * 管道管径的分类
         */
        var where = 'Physical_PipeDiameter >= 300';//查询条件
        var query = new esri.tasks.Query();
        query.where = where;
        query.returnGeometry = true;
        query.outFields = ["ElementId", field];
        query.outSpatialReference = map.SpatialReference;

        var selectTypeMain = '';


        var pressureChangLimit = new Array();
        var planTempCalFlowLimit = new Array();
        var planTempCalVelocityLimit = new Array();
        var tableName = "";
        var isDisplays = [];
        var isCompare = false;
        var EventTypeMain = "";
        var tableNameMain = "";
        var drawDataAll = new Object();
        var pressureDisplays = new Array();
        var flowDisplays = new Array();
        var strenghtDisplay = new Array();
        window.addEventListener('event_name', function (event) {
            var typeMy = event.detail.type;
            LocationGraphicsLayer.clear();
            var eventType = '';
            var typeSelectMain = event.detail.eventType;
            if (typeMy == "Rcdd_WarningEventDraw"){
                warningEventLayer.clear();
                var drawData = event.detail.data;
                console.log(drawData);
                drawClassWarningEvent.DrawWarningEvent(drawData, warningEventLayer);
            }
            else if(typeMy=="EmergencyDispatchPressureNodePosition")//应急调度压力控制点定位
            {
                pressureNodeControlLayer.clear();
                drawClass.DrawPressureControlNode(event.detail.data,pressureNodeControlLayer,map,mapObjMy,dialog)
            }
            else if (typeMy == "PipeBurstMapClick") {
                isMapClickPipeBurst = event.detail.data;
                pipeBurstLayer.clear();
            }
            else if (typeMy == "PipeBurstClear") {
                strengthLayer.clear();
                flowLayer.clear();
                pipeBurstLayer.clear();
                pipeBurstNodeLayer.clear();
                pipeBurstCloseValveLayer.clear();
                pipeBurstPositionLayer.clear();
            }
            else if (typeMy == "PipeBurstDraw") {
                EventTypeMain = "PipeBurst";
                strengthLayer.setVisibility(false);
                var drawData = event.detail.data;
                drawDataAll = Object.assign({},drawData);
                isDisplays = global.isDisplay.slice(0);
                pressureDisplays = global.isDisplay.slice(0);
                flowDisplays = global.isDisplay.slice(0);
                strenghtDisplay = global.isDisplay.slice(0);
                var limitFlow = drawClass.DrawPipeFlowChange(drawData.min, drawData.max, drawData.allData, global.diffusionLevel, global.pressureChangColor, pressureDisplays, flowLayer,
                    isCompare, selectTypeMain, "PlanTempCalculate", true, true);
                    planTempCalFlowLimit = limitFlow.slice(0);
                var limitPressure = drawClass.DrawPressureChange(drawData.minP, drawData.maxP, drawData.NodePressure, global.diffusionLevel, global.pressureChangColor, flowDisplays, pipeBurstNodeLayer,
                    isCompare, selectTypeMain, "PlanTempCalculate", true, true);
                    global.pressureChangLimit = limitPressure.slice(0);
                    tableNameMain =  drawData.TableName;  
                var planTempCalVelocityLimitTemp = drawClass.DrawPipeFlowChange(drawData.minV, drawData.maxV, drawData.strengthData, 
                    global.diffusionLevel, global.pressureChangColor, strenghtDisplay, strengthLayer,
                    isCompare, selectTypeMain, "PlanTempCalculate", true, true);
                planTempCalVelocityLimit = planTempCalVelocityLimitTemp.slice(0)
                legend.LegendMainPlanTempCalPipe(limitFlow,planTempCalVelocityLimitTemp,tableNameMain,true);
                WindowsEvent.MyDispatchEvent("PipeBurstLoadingEnd", true);
            }
            else if(typeMy=="PlanCalPipelegendSelect")
            {
                var legendSelectIndex = event.detail.data;
                if(legendSelectIndex==0)
                {
                    flowLayer.setVisibility(true);
                    strengthLayer.setVisibility(false);
                }
                else if(legendSelectIndex==1)
                {
                    flowLayer.setVisibility(false);
                    strengthLayer.setVisibility(true);
                }
            }
            else if(typeMy == "ValveAttribute")
            {
                var valveAttributeIsDisplay = Boolean(event.detail.data);
                if(!valveAttributeIsDisplay)
                {
                    valveAttributeLayer.clear();
                }
                else
                {
                    drawClass.DrawValveStatus(valveAttributeLayer);
                }
            }
            else if(typeMy=="legendItemDisplay")
            {
               var obj = event.detail.data;
               console.log("drawDataAll")
               console.log(drawDataAll)
               if(tableNameMain!="")
               {
                    if(obj.itemType=="calNode")
                    {
                        pressureDisplays[Number(obj.index)] = Boolean(obj.isDisplay);
                        pipeBurstNodeLayer.clear();
                        drawClass.DrawPressureChange(drawDataAll.minP, drawDataAll.maxP, drawDataAll.NodePressure, global.diffusionLevel, global.pressureChangColor, pressureDisplays, pipeBurstNodeLayer,
                            isCompare, selectTypeMain, "PlanTempCalculate", true, true);
                    }
                    else if(obj.itemType=="flow")
                    {
                        flowDisplays[Number(obj.index)] = Boolean(obj.isDisplay);
                        flowLayer.clear();
                        drawClass.DrawPipeFlowChange(drawDataAll.min, drawDataAll.max, drawDataAll.allData, global.diffusionLevel, global.pressureChangColor, flowDisplays, flowLayer,
                            isCompare, selectTypeMain, "PlanTempCalculate", true, true);
                    }
                    else if(obj.itemType=="velocity")
                    {
                        strengthLayer.clear();
                        strenghtDisplay[Number(obj.index)] = Boolean(obj.isDisplay);
                        drawClass.DrawPipeFlowChange(drawDataAll.minV, drawDataAll.maxV, drawDataAll.strengthData, 
                            global.diffusionLevel, global.pressureChangColor, strenghtDisplay, strengthLayer,
                            isCompare, selectTypeMain, "PlanTempCalculate", true, true);
                    }
               }
            }
            else if (typeMy == "PipeBurstCloseValveDraw") {
                pipeBurstCloseValveLayer.clear();
                pipeBurstPositionLayer.clear();
                EventTypeMain = "PipeBurst";
                var drawData = event.detail.data;
                isDisplays = global.isDisplay.slice(0);
                drawClassPipeBurst.DrawCloseValveBufferArea(drawData,map, pipeBurstCloseValveLayer, geometryService);

                drawClassPipeBurst.DrawCloseValve(drawData, pipeBurstCloseValveLayer);


            }
            else if(typeMy == 'BurstPipeRouter'){
                var typeSelectMain = event.detail.data;
                var point = new esri.geometry.Point(typeSelectMain.X,typeSelectMain.Y,map.spatialReference);
                var typeTemp = 'PipeBurst';
                isMapClickPipeBurst = true;
               IdentifyMain(point,typeTemp);
            }
        });

    }

}

export default new Methods()
