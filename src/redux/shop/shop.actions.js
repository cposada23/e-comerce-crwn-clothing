import ShopActionTypes from './shop.types';

// import { firestore, converCollectionsSanpshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionFailure = error => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: error
})

// We don't need this because we switch to using sagas instead of thunk see: shop.sagas.js file
// export const fetchCollectionsStartAsync = () => {
//   return dispatch => {
//     const collectionRef = firestore.collection('collections');
//     dispatch(fetchCollectionsStart())

//     collectionRef.get().then(async snapshot => {
//       const collectionsMap = converCollectionsSanpshotToMap(snapshot);
//       dispatch(fetchCollectionsSuccess(collectionsMap))
//     }).catch(error => dispatch(fetchCollectionFailure(error.message)))
//   };
// };

// // Observable way to get data, this is the way to get live data (update)
    // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = converCollectionsSanpshotToMap(snapshot);
    //   console.log(collectionsMap);
    //   updateCollections(collectionsMap)
    //   this.setState({loading: false})
    // });

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
