'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _smoothScroll = require('./mixin/smoothScroll');

var _button = require('./button.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
    panel: {
        zIndex: '9999',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        right: '10%',
        bottom: '10%',
        fontWeight: 'bold',
        color: '#FFF',
        cursor: 'pointer',
        height: '3em',
        width: '3em',
        borderRadius: '50%',
        background: 'rgb(0, 188, 212)',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)'
    }
};

var Guide = function (_React$Component) {
    _inherits(Guide, _React$Component);

    function Guide(props) {
        _classCallCheck(this, Guide);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Guide).call(this, props));

        var actionLog = [];
        _this.state = {
            record: false
        };
        _this._handleScrollEvent = _this._handleScrollEvent.bind(_this);
        _this._handleClickEvent = _this._handleClickEvent.bind(_this);
        _this._currentPosition = _this._currentPosition.bind(_this);
        _this._startRecord = _this._startRecord.bind(_this);
        _this._stopRecord = _this._stopRecord.bind(_this);
        _this._addListen = _this._addListen.bind(_this);
        _this._removeListen = _this._removeListen.bind(_this);
        _this._replay = _this._replay.bind(_this);
        _this._getCurrentTime = _this._getCurrentTime.bind(_this);
        _this.panelEvent = _this.panelEvent.bind(_this);
        return _this;
    }

    _createClass(Guide, [{
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: '_getCurrentTime',
        value: function _getCurrentTime() {
            var currentTime = new Date();
            return currentTime.getMinutes() + ':' + currentTime.getSeconds();
        }
    }, {
        key: '_handleClickEvent',
        value: function _handleClickEvent(e) {
            this.actionLog.push({ click: [e.target, this._getCurrentTime()] });
        }
        /* Add and Remove event listener
         *
         */

    }, {
        key: '_addListen',
        value: function _addListen() {
            this.actionLog = [];
            window.addEventListener('click', this._handleClickEvent);
            window.addEventListener('scroll', this._handleScrollEvent);
        }
    }, {
        key: '_removeListen',
        value: function _removeListen() {
            window.removeEventListener('click', this._handleClickEvent);
            window.removeEventListener('scroll', this._handleScrollEvent);
        }
    }, {
        key: '_handleScrollEvent',
        value: function _handleScrollEvent() {
            var currentTop = this._currentPosition();
            var currentTime = new Date();
            this.actionLog.push({ scroll: [currentTop, this._getCurrentTime()] });
        }
    }, {
        key: '_currentPosition',
        value: function _currentPosition() {
            var doc = document.documentElement;
            var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            return top;
        }
    }, {
        key: '_startRecord',
        value: function _startRecord() {
            this.setState({ record: true });
        }
    }, {
        key: '_stopRecord',
        value: function _stopRecord() {
            this.setState({ record: false });
        }
    }, {
        key: '_replay',
        value: function _replay() {
            var preStepTime = 0;
            var _scrollFilter = function _scrollFilter(action) {
                return action.hasOwnProperty('scroll');
            };
            for (var key in this.actionLog) {
                var action = this.actionLog[key];

                if (action.hasOwnProperty('scroll')) {
                    // Need to calculate time with timestamp
                    // to get the real simulation of website owner behavior
                    /*
                    let prePosition = key > 1 ? this.actionLog[key-1]['scroll'][0] : 
                                                this.actionLog.filter(_scrollFilter);
                    */
                    (function (offset, time) {
                        setTimeout(function () {
                            return window.scrollTo(0, offset);
                        }, time);
                        preStepTime = time;
                    })(action['scroll'][0], preStepTime + 20);
                } else if (action.hasOwnProperty('click')) {
                    // Ignore start record step
                    if (key != 0) {
                        var clickEvent = this._createSimulatedClick();
                        (function (target, time, e) {
                            setTimeout(function () {
                                return target.dispatchEvent(e);
                            }, time);
                            preStepTime = time;
                        })(action['click'][0], preStepTime + 400, clickEvent);
                    }
                } else if (action.hasOwnProperty('halt')) {
                    preStepTime += 200;
                }
            }
        }
    }, {
        key: '_createSimulatedClick',
        value: function _createSimulatedClick() {
            var e = document.createEvent('MouseEvent');
            e.initMouseEvent('click', true, true);
            return e;
        }
    }, {
        key: 'panelEvent',
        value: function panelEvent() {
            this.refs.playBtn.openBtn();
            this.refs.recordBtn.openBtn();
            this.refs.qBtn.openBtn();
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.record) {
                this._addListen();
            } else {
                this._removeListen();
            }
            var recordBtn = !this.state.record ? _react2.default.createElement(_button.RecordBtn, { ref: 'recordBtn', handleRecord: this._startRecord }) : _react2.default.createElement(_button.RecordBtn, { ref: 'recordBtn', handleRecord: this._stopRecord });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'panel', onClick: this.panelEvent, style: styles.panel },
                    'G'
                ),
                recordBtn,
                _react2.default.createElement(_button.PlayBtn, { ref: 'playBtn', handleReplay: this._replay }),
                _react2.default.createElement(_button.QuestionBtn, { ref: 'qBtn' })
            );
        }
    }]);

    return Guide;
}(_react2.default.Component);

exports.default = Guide;