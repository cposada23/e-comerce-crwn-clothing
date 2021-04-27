import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.page';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, converCollectionsSanpshotToMap} from '../../firebase/firebase.utils';

const CollectionOvervieWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount () {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    // Observable way to get data, this is the way to get live data (update)
    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = converCollectionsSanpshotToMap(snapshot);
      console.log(collectionsMap);
      updateCollections(collectionsMap)
      this.setState({loading: false})
    });

    // Using promises to get data from firebase, this way we loose live data
    // collectionRef.get().then(async snapshot => {
    //   const collectionsMap = converCollectionsSanpshotToMap(snapshot);
    //   console.log(collectionsMap);
    //   updateCollections(collectionsMap)
    //   this.setState({loading: false})
    // })

    // using rest https://firebase.google.com/docs/firestore/use-rest-api#making_rest_calls

    // Id proyecto: crwn-db-b680c
    // URL: https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/{collection_name}

    // fetch('https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/collections')
    //   .then(response => response.json())
    //   .then(collections => console.log('collections'))



  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionOvervieWithSpinner isLoading={loading} {...props}/> } />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
      </div> 
    )
  }

} 

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => 
    dispatch(updateCollections(collectionsMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);