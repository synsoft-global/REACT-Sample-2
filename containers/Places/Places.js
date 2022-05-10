import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom';
import Role from '../../components/Role/Role';
import PlacesList from './PlacesList/PlacesList';
import PlaceShow from './PlaceShow/PlaceShow';
import PlaceEdit from './PlaceEdit/PlaceEdit';
import PlaceCreate from './PlaceCreate/PlaceCreate';
import PlaceDelete from './PlaceDelete/PlaceDelete';

class Places extends Component<{}> {
    render() {
        const { match }     = this.props;
        const { isLoading, hasLoadingError, loadingErrorMessage } = this.props.places;
        return (
            <div className="Places">
                <Role not has="admin">
                    <Redirect to="/" />
                </Role>

                {isLoading &&
                    <span className="loadingMessage"><i className="fa fa-spinner fa-spin"></i>&nbsp;Chargement en cours...</span>
                }
                {hasLoadingError &&
                    <div
                        className="alert alert-danger"
                        dangerouslySetInnerHTML={{__html: loadingErrorMessage}} />
                }
                <Route exact path={ match.path } component={PlacesList} />
                <Route exact path={ `${ match.url }/new` } component={PlaceCreate} />
                <Route exact path={ `${ match.url }/show/:placeId` } component={PlaceShow} />
                <Route exact path={ `${ match.url }/edit/:placeId` } component={PlaceEdit} />
                <Route exact path={ `${ match.url }/delete/:placeId` } component={PlaceDelete} />
            </div>
        );
    }
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({
    places: state.places
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Places));
