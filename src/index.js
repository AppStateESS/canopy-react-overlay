import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'

export default class Overlay extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.unlockBody = this.unlockBody.bind(this)
    this.lockBody = this.lockBody.bind(this)
    this.close = this.close.bind(this)
  }

  componentDidUpdate() {
    if (this.props.show) {
      this.lockBody()
    } else {
      this.unlockBody()
    }
  }

  lockBody() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  unlockBody() {
    document.getElementsByTagName('body')[0].removeAttribute('style')
  }

  close() {
    this.unlockBody()
    this.props.close()
  }

  render() {
    const extraStyles = {}
    let closeButton
    let partialCloseButton
    let header


    if (this.props.width) {
      extraStyles.width = this.props.width
      extraStyles.height = 'auto'
      extraStyles.position = 'absolute'
      extraStyles.top = '5%'
      extraStyles.border = '2px solid white'
      extraStyles.borderRadius = '6px'
      partialCloseButton = (
        <div className="cro-button-partial pointer" onClick={this.close}>
          <i className="fas fa-2x fa-times"></i>
        </div>
      )
    } else {
      closeButton = (
        <div className="cro-button pointer" onClick={this.close}>
          <i className="fas fa-2x fa-times"></i>
        </div>
      )
    }

    if (!this.props.width || this.props.width === '100%' || this.props.title.length > 0) {
      header = (
        <div className="cro-header">
          {closeButton}
          <div className="cro-title">{this.props.title}</div>
        </div>
      )
    }
    
    if (this.props.height) {
      extraStyles.height = this.props.height
    }

    if (this.props.overflow) {
      extraStyles.overflow = this.props.overflow
    }

    let overlayClass = []
    overlayClass.push('canopy-react-overlay')
    if (this.props.show) {
      overlayClass.push('show')
    }
    if (this.props.fade) {
      overlayClass.push('fadein')
    }

    return (
      <div className={overlayClass.join(' ')}>
        <div className="cro-backing">
          {partialCloseButton}
          <div className="cro-overlay" style={extraStyles}>
            {header}
            <div className="cro-children">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Overlay.propTypes = {
  fade: PropTypes.bool,
  children: PropTypes.node,
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  show: PropTypes.bool,
  overflow: PropTypes.string
}

Overlay.defaultProps = {
  fade: false,
  show: false
}
