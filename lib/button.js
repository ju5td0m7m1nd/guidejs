'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestionBtn = exports.PlayBtn = exports.RecordBtn = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _playCircleO = require('react-icons/lib/fa/play-circle-o');

var _playCircleO2 = _interopRequireDefault(_playCircleO);

var _pause = require('react-icons/lib/fa/pause');

var _pause2 = _interopRequireDefault(_pause);

var _videoCamera = require('react-icons/lib/fa/video-camera');

var _videoCamera2 = _interopRequireDefault(_videoCamera);

var _question = require('react-icons/lib/fa/question');

var _question2 = _interopRequireDefault(_question);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    right: '10%',
    bottom: '10%',
    boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '3em',
    height: '3em',
    borderRadius: '50%',
    zIndex: '9998',
    transition: 'all .3s ease-in'
  },
  startBtn: {
    background: 'rgba(255,255,255,1)',
    color: 'rgba(230,0,0,1)'
  },
  endBtn: {
    background: 'rgba(230,0,0,1)',
    color: '#FFF'
  },
  qBtn: {
    background: 'rgba(255,255,255,1)',
    color: '#222'
  },
  playBtn: {
    color: 'rgba(0,230,0,1)',
    background: 'rgba(255,255,255,1)'
  }
};

var RecordBtn = function (_React$Component) {
  _inherits(RecordBtn, _React$Component);

  function RecordBtn(props) {
    _classCallCheck(this, RecordBtn);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RecordBtn).call(this, props));

    _this.state = {
      openPos: '20',
      open: false,
      start: false
    };
    _this.openBtn = _this.openBtn.bind(_this);
    _this.startRecord = _this.startRecord.bind(_this);
    return _this;
  }

  _createClass(RecordBtn, [{
    key: 'openBtn',
    value: function openBtn() {
      this.setState({ open: !this.state.open });
    }
  }, {
    key: 'startRecord',
    value: function startRecord() {
      this.props.handleRecord();
      this.setState({ start: !this.state.start });
    }
  }, {
    key: 'render',
    value: function render() {
      var recordBtnStyle = Object.assign({}, styles.btn, styles.startBtn);
      recordBtnStyle = this.state.start ? Object.assign({}, recordBtnStyle, styles.PauseBtn) : Object.assign({}, recordBtnStyle, styles.StartBtn);
      recordBtnStyle = this.state.open ? Object.assign({}, recordBtnStyle, { 'right': this.state.openPos + '%' }) : recordBtnStyle;

      return _react2.default.createElement(
        'div',
        {
          className: 'start-btn',
          onClick: this.startRecord,
          style: recordBtnStyle
        },
        this.state.start ? _react2.default.createElement(_pause2.default, { height: '1.5em', width: '1.5em' }) : _react2.default.createElement(_videoCamera2.default, { height: '1.5em', width: '1.5em' })
      );
    }
  }]);

  return RecordBtn;
}(_react2.default.Component);

var PlayBtn = function (_React$Component2) {
  _inherits(PlayBtn, _React$Component2);

  function PlayBtn(props) {
    _classCallCheck(this, PlayBtn);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayBtn).call(this, props));

    _this2.state = {
      openPos: '15',
      open: false
    };
    _this2.openBtn = _this2.openBtn.bind(_this2);
    return _this2;
  }

  _createClass(PlayBtn, [{
    key: 'openBtn',
    value: function openBtn() {
      this.setState({ open: !this.state.open });
    }
  }, {
    key: 'render',
    value: function render() {
      var playBtnStyle = Object.assign({}, styles.btn, styles.playBtn);
      playBtnStyle = this.state.open ? Object.assign({}, playBtnStyle, { 'right': this.state.openPos + '%' }) : playBtnStyle;
      return _react2.default.createElement(
        'div',
        { className: 'play-btn', onClick: this.props.handleReplay, style: playBtnStyle },
        _react2.default.createElement(_playCircleO2.default, { height: '2em', width: '2em' })
      );
    }
  }]);

  return PlayBtn;
}(_react2.default.Component);

var QuestionBtn = function (_React$Component3) {
  _inherits(QuestionBtn, _React$Component3);

  function QuestionBtn(props) {
    _classCallCheck(this, QuestionBtn);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(QuestionBtn).call(this, props));

    _this3.state = {
      openPos: _this3.props.mode === 'dev' ? 25 : 20,
      open: false
    };
    _this3.openBtn = _this3.openBtn.bind(_this3);
    _this3.visitGuideJs = _this3.visitGuideJs.bind(_this3);
    return _this3;
  }

  _createClass(QuestionBtn, [{
    key: 'openBtn',
    value: function openBtn() {
      this.setState({ open: !this.state.open });
    }
  }, {
    key: 'visitGuideJs',
    value: function visitGuideJs() {
      window.open("http://www.ju5td0m7m1nd.com:4000");
    }
  }, {
    key: 'render',
    value: function render() {
      var qBtnStyle = Object.assign({}, styles.btn, styles.qBtn);
      qBtnStyle = this.state.open ? Object.assign({}, qBtnStyle, { 'right': this.state.openPos + '%' }) : qBtnStyle;
      return _react2.default.createElement(
        'div',
        { className: 'question-btn', onClick: this.visitGuideJs, style: qBtnStyle },
        _react2.default.createElement(_question2.default, { height: '2em', width: '2em' })
      );
    }
  }]);

  return QuestionBtn;
}(_react2.default.Component);

exports.RecordBtn = RecordBtn;
exports.PlayBtn = PlayBtn;
exports.QuestionBtn = QuestionBtn;