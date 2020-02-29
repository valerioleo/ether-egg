/* eslint-disable camelcase */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

const Person = props => {
  const {
    skin_color,
    gender,
    hair_color,
    height,
    created,
    name,
    mass,
    eye_color,
    birth_year,
    classes
  } = props;

  return (
    <div className={classes.box}>
      <Typography variant='h3'>{name}</Typography>
      <Typography variant='caption'>Skin color: {skin_color}</Typography>
      <Typography variant='caption'>Gender: {gender}</Typography>
      <Typography variant='caption'>Hair color: {hair_color}</Typography>
      <Typography variant='caption'>Eye color: {eye_color}</Typography>
      <Typography variant='caption'>Height: {height}</Typography>
      <Typography variant='caption'>Mass: {mass}</Typography>
      <Typography variant='caption'>Birth Year: {birth_year}</Typography>
      <Typography variant='caption'>Created: {created}</Typography>
    </div>
  );
};

export default withStyles(styles)(Person);
