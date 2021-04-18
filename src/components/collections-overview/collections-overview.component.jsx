import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollections } from '../../redux/shop/shop.selectors';

import  CollectionPreview  from '../collection-preview/collection-preview.componet';

import './collections-overview.styles.scss'

const CollectionsOverview = ({ collections }) => {

  return (
  <div className="collections-overview">
    {
      Object.keys(collections).map(key => {
        let {id, ...otherProperties} = collections[key];
        return (
          <CollectionPreview kew={id} {...otherProperties}/>
        )
      })
    }
  </div>
)};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
})


export default connect(mapStateToProps)(CollectionsOverview);