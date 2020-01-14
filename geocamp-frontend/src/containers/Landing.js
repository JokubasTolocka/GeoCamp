import React, {Component} from 'react';
import Facebook from './Facebook';
import Google from './Google';
import {connect} from 'react-redux';
import Signup from '../authContainers/Signup';
import Signin from '../authContainers/Signin';


class Landing extends Component{
    constructor(props){
        super(props);
        this.state = {
            showSignup: false,
            showSignin: false,
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
    }
    componentDidMount(){
        this.setState({showSignin: false, showSignup: false});
    }
    handleSignup = e => {
        this.setState({showSignup: !this.state.showSignup, showSignin: false});
    }

    handleSignin = e => {
        this.setState({showSignin: !this.state.showSignin, showSignup: false});
    }

    render(){
        const {showSignin, showSignup} = this.state;
        if(this.props.currentUser.isAuthenticated){
            this.props.history.push('/catalogue');
        }
        return(
            <section>
                <div className='landing'>

                    <button onClick={this.handleSignup}>Signup</button>
                    {showSignup ? 
                    <div>
                        <Signup/>
                    </div>
                    : null}
                    <button onClick={this.handleSignin}>Signin</button>
                    {showSignin ? 
                    <div>
                        <Signin/>
                    </div>
                    : null}
                    <Facebook />
                    <Google />
                </div>
            </section>
        )
    }
}

function mapStateToProps(state){
    return {
       currentUser: state.currentUser 
    };
}

export default connect(mapStateToProps, {})(Landing);