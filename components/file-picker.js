import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import { buttonStyle } from '@components/elements';

/* istanbul ignore next */
const FileInput = styled.input`
  display: none;
`;

/* istanbul ignore next */
const FileLabel = styled.label`
  ${({ labelStyle }) => labelStyle || buttonStyle}
  display: block;
  text-align: center;
`;

export class FilePicker extends React.Component {

  async handleChange(e) {
    const promises = [];
    for (const file of e.target.files) {
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target.result;
          const data = {
            file,
            base64
          };
          resolve(data);
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    }

    const values = await Promise.all(promises);

    if (this.props.onChange) {
      this.props.onChange(values);
    }
  }

  onChange = (e) => {
    this.handleChange(e);
    e.target.value = null;
  };

  render() {
    const { multiple, accept, label, labelStyle } = this.props;

    return (
      <React.Fragment>
        <FileLabel htmlFor={_.camelCase(label)} labelStyle={labelStyle}>
          {this.props.children || label}
        </FileLabel>
        <FileInput
          type="file"
          id={_.camelCase(label)}
          multiple={multiple}
          accept={accept}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

FilePicker.propTypes = {
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func
};

