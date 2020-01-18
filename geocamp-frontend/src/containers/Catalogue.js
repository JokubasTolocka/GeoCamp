import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCamps} from '../store/actions/campgrounds';
import {ToastContainer} from 'react-toastify'
import {Link} from 'react-router-dom';
import CampgroundCard from '../components/CampgroundCard';
import 'react-toastify/dist/ReactToastify.min.css';
import {googleStyles} from '../googleMapStyles';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({user_id, camp_id}) => <div><Link className='camp-link' to={`/users/${user_id}/campgrounds/${camp_id}`}><i className="fas fa-campground"></i></Link></div>;

class Catalogue extends Component{
    constructor(props){
        super(props);
        this.state = {
            lat: null,
            lng: null,
            location: {
                lat: 59,
                lng: 48
            },
            zoom: 0
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
        const mapOptions = {
            styles: googleStyles
        }
        const {lat, lng} = this.state;
        const{ campgrounds} = this.props;
        const CampMapCopy = campgrounds.map(camp => camp).map(camp => {
            return (
            <AnyReactComponent
                lat={camp.location.lat}
                lng={camp.location.lng}
                key={camp._id}
                user_id={camp.user.id}
                camp_id={camp._id}
            />
            )
        });
        const CampCopy = campgrounds.map((camp) => camp).slice(0, 4);
        const CampList = CampCopy.map(camp => {
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
                <div className='catalogue'>
                    <div className='card-list'>
                        {CampList}
                    </div>
                    <div className='card-list-map'>
                    <GoogleMapReact
                            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
                            defaultCenter={this.state.location}
                            defaultZoom={this.state.zoom}
                            options={mapOptions}
                            > 
                            {CampMapCopy}
                        </GoogleMapReact>
                    </div>
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