import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
      <footer className="main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 1.0.0
        </div>
        <strong>Copyright &copy; 2019 <a href="https://pagos.insibs.com">PAGO INSIBS</a>.</strong> Todos los derechos reservados
        <br/>
        desarrollado por <b>Roger Rengifo</b>
      </footer>
    )
  }
}
