import React, { Component } from 'react';

export function musicstyleToJson(ms){
    return '{"styleMusic_id": '+ ms.styleMusic_id +', "style": "' + ms.style + '"}'
}

export function locationToJsonWithDtype(location, dtype){
    return '{name: \"' + location.name +'\", \"dtype\": \"' + dtype + '\"}';
}

export function locationToJson(location){
    return '{"name": "' + location.name +'"}';
}

function selectedToJson(selected){
    var ret = [];
    selected.map(select =>(
        ret.push(locationToJson(select))
    ))
    return ret;
}

function redefineLocations(locations){
    var ret = [];
    if(locations.length == 0) {
        return [];
    }
    console.log("redefine locations!", locations);
    if(locations.regions != undefined){
        var new_regions = [];
        locations.regions.map(region => {
            const slash_index = region._links.region.href.lastIndexOf('/');
            const id = parseInt(region._links.region.href.substring(slash_index+1));
            const newregion = {
                id: id,
                name: region.name
            }
            //console.log(newregion);
            new_regions.push(newregion);
        });
        ret.regions = new_regions;
    }
    if(locations.departements != undefined){
        var new_departements = [];
        locations.departements.map(departement => {
            const slash_index = departement._links.departement.href.lastIndexOf('/');
            const id = parseInt(departement._links.departement.href.substring(slash_index+1));
            const newdepartement = {
                id: id,
                name: departement.name
            }
            //console.log(newdepartement);
            new_departements.push(newdepartement);
        });
        ret.departements = new_departements;
    }
    if(locations.villes != undefined){
        var new_villes = [];
        locations.villes.map(ville => {
            const slash_index = ville._links.ville.href.lastIndexOf('/');
            const id = parseInt(ville._links.ville.href.substring(slash_index+1));
            const newville = {
                id: id,
                name: ville.name
            }
            //console.log(newville);
            new_villes.push(newville);
        });
        ret.villes = new_villes;
    }
    //console.log("real content ? :", ret);
    return ret;
}

class MultipleSelect extends Component{
    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            selected: props.selected,
            content: props.categorie == 'locations' ? redefineLocations(props.content) : props.content
        }
    }

    /*componentDidUpdate(){
        this.setState({
            content: this.props.categorie == 'locations' ? redefineLocations(this.props.content) : this.props.content
        })
    }*/

    render(){
        const {selected, content } = this.state;
        console.log("selected & content :", selected, content);
        if(this.props.categorie == 'musicstyles'){
            return(
                <ul className="musicstyles_ul multiple_select">
                    {content.map(ms =>(
                        <li key={ms.styleMusic_id} className={this.isSelected(ms)} onClick={(evt) => this.updateInput(evt, this.isSelected(ms), ms, 'li')}><input key={ms.styleMusic_id} id={ms.styleMusic_id} checked={this.isSelected(ms) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(ms), ms,'input')} value={ms}/><p>{ms.style}</p></li>
                    ))}
                </ul>
            );
        }
        else if (this.props.categorie == 'locations'){
            return(
                <ul className="locations_ul multiple_select">
                        {content.regions && 
                        <ul className="regions"><p>Regions</p>
                            {content.regions.map( region => (
                                <li key={region.id} className={this.isSelected(region)} onClick={(evt) => this.updateInput(evt, this.isSelected(region), region, 'li')}><input key={region.id} id={region.id} checked={this.isSelected(region) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(region), region,'input')} value={region}/><p>{region.name}</p></li>
                            ))}
                        </ul>
                        }
                        {content.departements &&
                            <ul className="departements"><p>Departements</p>
                                {content.departements.map( departement => (
                                <li key={departement.id} className={this.isSelected(departement)} onClick={(evt) => this.updateInput(evt, this.isSelected(departement), departement, 'li')}><input key={departement.id} id={departement.id} checked={this.isSelected(departement) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(departement), departement,'input')} value={departement}/><p>{departement.name}</p></li>
                                ))}
                            </ul>
                        }
                        {content.villes &&
                            <ul className="villes"><p>Villes</p>
                                {content.villes.map( ville => (
                                <li key={ville.id} className={this.isSelected(ville)} onClick={(evt) => this.updateInput(evt, this.isSelected(ville), ville, 'li')}><input key={ville.id} id={ville.id} checked={this.isSelected(ville) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(ville), ville,'input')} value={ville}/><p>{ville.name}</p></li>
                                ))}
                            </ul>
                        }
                </ul>
            );
        }
        else{
            return (
                <ul className="obj_ul">
                    {this.props.content.map(obj =>(
                        <li className={this.isSelected(obj)} onClick={(evt) => this.updateInput(evt, this.isSelected(obj), obj, 'li')}><input key={obj.id} id={obj.id} checked={this.isSelected(obj) == 'selected'} type="checkbox" onClick={evt => this.updateInput(evt, this.isSelected(obj), obj,'input')} value={obj}/><p>{obj}</p></li>
                    ))}
                </ul>
            )
        }
    }

    triggerInput = (input_ref) => {
        this.myRef.current.click();
    }

    isSelected(value){
        return this.indexValue(value) != -1 ? 'selected':'not-selected';
        //console.log("isSelected : ",value, this.state.selected.indexOf(value));
        //return this.state.selected.indexOf(value) != -1 ? 'selected' : 'not-selected';
    }

    indexValue(value){
        var index = 0;
        var ret = false;
        this.state.selected.map(select => {
            if (this.props.categorie == 'musicstyles'){
                if(select.styleMusic_id == value.styleMusic_id){
                    console.log("styleMusic_ids : ", select.styleMusic_id, value.styleMusic_id, select.styleMusic_id == value.styleMusic_id);
                    ret = true;
                }
            }else{
                if(select.id == value.id){
                    console.log("ids : ", select.id, value.id, select.id == value.id);                   
                    ret = true;
                }
            }
            if(ret){
                console.log("return selected");
                return 'selected';
            }
            index++;
        });

        return ret ? index: -1;
    }

    updateInput(evt, classname, value, type){
        evt.stopPropagation();
        const checked = classname == 'not-selected';
        //console.log(type == 'input' ? "input: ": "li: ", value, checked);
        if(checked){
            this.state.selected.push(value);
        }else{
            const index = this.indexValue(value);
            this.state.selected.splice(index, 1);
        }
        this.setState({
            selected : this.state.selected
        })
        this.props.callbackUpdate(this.state.selected);
    }

    updateSelected(evt){
        var options = evt.target.options;
        var values = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
        }
        this.props.callbackUpdate(values);
    }
}

export default MultipleSelect