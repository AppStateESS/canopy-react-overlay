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

  componentDidMount() {
    this.lockBody()
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
    const zIndex = {
      zIndex: '2000'
    }

    return (
      <div className="cro-overlay" style={zIndex}>
        <div className="cro-header">
          <div className="cro-button pointer" onClick={this.close}>
            <i className="fas fa-2x fa-times"></i>
          </div>
          <div className="cro-title">{this.props.title}</div>
        </div>
        <div className="cro-children">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Overlay.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element,]),
  close: PropTypes.func.isRequired,
  title: PropTypes.string,
}
