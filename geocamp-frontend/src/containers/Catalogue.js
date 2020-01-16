import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCamps} from '../store/actions/campgrounds';
import {ToastContainer} from 'react-toastify'
import CampgroundCard from '../components/CampgroundCard';
import 'react-toastify/dist/ReactToastify.min.css';

class Catalogue extends Component{
    constructor(props){
        super(props);
        this.state = {
            lat: null,
            lng: null
        }
    }
    componentDidMount(){
        this.props.fetchCamps();
        navigator.geolocation.getCurrentPosition(
          position => this.setState({ 
            lat: position.coords.latitude, 
            lng: position.coords.longitude
          }), 
          err => console.log(err)
        );
    }


    render(){
        const {lat, lng} = this.state;
        const{ campgrounds} = this.props;
        const CampList = campgrounds.map(camp => {
            return(
                <CampgroundCard
                    key={camp._id}
                    id={camp._id}
                    user={camp.user.name}
                    user_id={camp.user._id}
                    name={camp.name}
                    image={camp.image}
                    date={camp.createdAt}
                    lat={camp.location.lat}
                    lng={camp.location.lng}
                    currentUserLat={lat}
                    currentUserLng={lng}
                />
            )
        })
        if(!this.props.currentUser.isAuthenticated){
            this.props.history.push('/');
        }
        return(
            <div>
                <ToastContainer/>
                <div className='card-list'>
                    {CampList}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
       currentUser: state.currentUser,
       campgrounds: state.campgrounds
    };
}

export default connect(mapStateToProps, {fetchCamps})(Catalogue);