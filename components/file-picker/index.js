import React from 'react';
import styles from './file-picker.module.scss';
import _ from 'lodash';

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
    const { multiple, accept, label } = this.props;

    return (
      <React.Fragment>
        <label className={styles.fileLabel} htmlFor={_.camelCase(label)}>
          {this.props.children || label}
        </label>
        <input
          className={styles.fileInput}
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

