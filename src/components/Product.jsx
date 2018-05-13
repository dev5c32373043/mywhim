import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import MobileTearSheet from './MobileTearSheet';

const Product = props => (
  <Card style={{ width: 300, margin: '3%', boxShadow: '' }}>
    <MobileTearSheet>
      <CardHeader title={props.category} />
      <CardMedia overlay={<CardTitle title={`${props.price} $`} subtitle={props.location} />}>
        <img src={props.image} alt="" />
      </CardMedia>
      <CardTitle title={props.title} titleColor="#00bcd4" />
      <CardText>{props.description}</CardText>
    </MobileTearSheet>
  </Card>
);

Product.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
};

export default Product;
