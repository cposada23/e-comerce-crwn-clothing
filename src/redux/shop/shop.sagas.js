import { takeLatest, call, put} from 'redux-saga/effects';

import { firestore, convertCollectionsSanpshotToMap } from '../../firebase/firebase.utils';

import {
  fetchCollectionsSuccess, 
  fetchCollectionFailure
} from './shop.actions'
 
import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  yield console.log('I am fine');

  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // Call is for: invoquing the method. a methot that takes as it firs argument a function, because we are yildids this call, we deffer the control in this part of the excecution back to the saga midleware. so in case it needs to cancel we've give it(the middleware )another place were is able to cancel if needed
    // For how I was using before look at the comment inside shop.actions.js file
    const collectionsMap = yield call(convertCollectionsSanpshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
    // Sagas dispathc action using put, instead of the dispathc method that thunk gives us
  } catch (error) {
    console.error(error)
    yield put(fetchCollectionFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync  
  )
}