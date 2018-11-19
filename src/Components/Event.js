import React, { Component } from 'react';
export var default_img_url_from_component = require('../images/empty-img.jpg');

class Event extends Component {
    render() {
        const {id, title, url, locations, musicStyles, dateBegin, dateEnd, img, isFollowed} = this.props;
        var dateStart = null, dateFinish = null, img_url = default_img_url_from_component;
        //console.log("locations :", locations);
        if(dateBegin != null){
            dateStart = dateBegin.replace(/-/g, '/');
        }

        if(dateEnd != null){
            dateFinish = dateEnd.replace(/-/g, '/');
        }
        if(img != null)
        {
            img_url = window.URL.createObjectURL(img);
        }
        //console.log("Event " + id + (isFollowed ? " is " : " is NOT ") + "followed ", isFollowed);
        //console.log('start : ' + dateStart + ' | end : ' + dateFinish);
        return (
            <div className="event" >
                <img className={img ? "img_ev" : "img_ev default"} src={img_url} />
                <div className="event_info">
                    <h4>{title}</h4>
                    {url && <a href={url}>Link to event page</a>}
                    <div className="date_ev">
                        {dateStart != null && !dateStart == '' && <p className="begin_ev">{"from " + dateStart}</p>}
                        {dateStart != null && !dateStart == '' && dateEnd != null && !dateEnd == '' && <p className="date_sep"></p>}
                        {dateFinish != null && !dateEnd == '' && <p className="end_ev">{"to " + dateFinish}</p>}
                    </div>
                    <ul className="musicstyles_ev">
                        {musicStyles.map(ms => (
                            <li key={ms.id} className="ms_ev">{ms.style}</li>
                        ))}
                    </ul>
                    <ul className="locations_ev">
                        {locations.map(location =>(
                            <li key={location.id} className="location_ev">{location.name}</li>
                        ))}
                    </ul>
                    {this.props.buttonClickedMethod && <button className={isFollowed ? 'unfollow_button' : 'follow_button'} onClick={() => this.props.buttonClickedMethod(this)}>{isFollowed ? "Unfollow" : "Follow"}</button>}
                </div>
            </div>
        )
    }
}
export default Event
/*
 <ul className="musicstyles">
                        {this.props.musicstyles.map(ms => (
                        <li className="music">{ms.style}</li>    
                        ))}
                    </ul>*/

/*
 {locations.regions &&
                        <ul className="regions_ev">
                            {locations.regions.map(reg => (
                                <li className="reg">reg.name</li>
                            ))}
                        </ul>
                        }
                        {locations.departements &&
                        <ul className="departements_ev">
                            {locations.departements.map(dep => (
                                <li className="dep">dep.name</li>
                            ))}
                        </ul>
                        }
                        {this.props.locations.villes &&
                        <ul className="villes_ev">
                            {locations.villes.map(vil => (
                                <li className="vil">vil.name</li>
                            ))}
                        </ul>
                        }
                        */