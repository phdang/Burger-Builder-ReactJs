import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

import Aux from '../../hoc/Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {



  return class extends Component {

    state = {

      error: null
    }

    errorComfirmedHandler = () => {

      this.setState({error: null});
    }

    componentWillMount() {

      this.reqInterceptors = axios.interceptors.request.use(req => {

        this.setState({error: null});

        return req;
      });

      this.resInterceptors = axios.interceptors.response.use(res => res, error => {

        this.setState({error: error});
      });
    }

    componentWillUnmount() {

      axios.interceptors.request.eject(this.reqInterceptors);
      
      axios.interceptors.response.eject(this.resInterceptors);
    }

    render() {

      let modal = null;

      if (this.state.error) {

        modal = <Modal show={this.state.error} modalClosed={this.errorComfirmedHandler}>{this.state.error.message} </Modal>;

      }

      return (

        <Aux>

          {modal}

          <WrappedComponent {...this.props} />

        </Aux>

      );

    }

  }
}


export default withErrorHandler;
