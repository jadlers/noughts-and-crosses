import React from 'react';
import PropTypes, { number, shape } from 'prop-types';

const Settings = ({ values, updateSettings }) => (
  // TODO: Form validation
  <form onSubmit={e => updateSettings(e)}>
    <h2>Settings</h2>
    <label htmlFor="rows">
      Rows:
      <input
        id="rows"
        min="0"
        max="100"
        step="1"
        type="number"
        defaultValue={values.rows}
        require="true"
      />
    </label>
    <br /> {/* TODO: Style properly */}
    <label htmlFor="columns">
      Columns:
      <input
        id="columns"
        min="0"
        max="100"
        step="1"
        type="number"
        defaultValue={values.columns}
        require="true"
      />
    </label>
    <br /> {/* TODO: Style properly */}
    <label htmlFor="seq_len">
      Winning sequence length:
      <input
        id="seq_len"
        min="0"
        step="1"
        type="number"
        defaultValue={values.seq_len}
        require="true"
      />
    </label>
    <br /> {/* TODO: Style properly */}
    <input type="submit" />
  </form>
);

Settings.propTypes = {
  values: shape({
    rows: number.isRequired,
    columns: number.isRequired,
    seq_len: number.isRequired,
  }).isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default Settings;
