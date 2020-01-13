import React, {Component} from 'react';
import {authenticate, isAuth} from '../helpers/helpers';
import Facebook from './Facebook';
import Google from './Google';


class Landing extends Component{
    informParent = res => {
        authenticate(res, () => {
            isAuth() ? this.props.history.push('/catalogue') : this.props.history.push('/');
        })
    }

    render(){
        return(
            <div>
            <Facebook informParent={this.informParent}/>
            <Google informParent={this.informParent}/>
            </div>
        )
    }
}

export default Landing;