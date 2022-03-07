import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import _ from 'lodash';

import { FileDrop } from '@components/file-drop';
import { FilePicker } from '@components/file-picker';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      files: [],
      fileError: false,
      suspensionsIniData: null,
      tyresIniData: null,
      vsuspUrl: null
    };
  }

  onDragOver = () => {
    this.setState({
      dragging: true
    });
    this.onDragLeaveDebounced.cancel();
  };

  onDragLeave = () => {
    this.setState({
      dragging: false
    });
  };

  onDragLeaveDebounced = _.debounce(this.onDragLeave, 10);

  onFileSelected = (files) => {
    const suspensionsIni = _.find(files, (f) => f.file.name === 'suspensions.ini');
    const suspensionsIniData = this.processSuspensionsIni(suspensionsIni);
    const tyresIni = _.find(files, (f) => f.file.name === 'tyres.ini');
    const tyresIniData = this.processTyresIni(tyresIni);

    const newState = {
      dragging: false,
      files,
      fileError: false,
      suspensionsIniData,
      tyresIniData
    };

    if (suspensionsIniData && tyresIniData) {
      const vsuspUrl = this.generateVsuspUrl(suspensionsIniData, tyresIniData);
      newState.vsuspUrl = vsuspUrl;
    }

    this.setState(newState);
  }

  processSuspensionsIni = (suspensionsIni) => {
  };

  processTyresIni = (tyresIni) => {
  };

  render() {
    const file = this.state.fileData && this.state.fileData.file || {};
    const files = this.state.files; // shortcut

    return (
      <FileDrop
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeaveDebounced}
        onChange={this.onFileSelected}
        multiple
      >
        <div className={styles.mainLayout}>

          {this.state.fileError && (
            <p className={styles.warning}>
              This file type is not supported. Please choose another file.
            </p>
          )}

          <div className={styles.fileDropIndicator}>
            <span className={styles.fileDropIndicatorText}>
              Drag &amp; drop anywhere
            </span>
            <FilePicker
              label="Choose files"
              onChange={this.onFileSelected}
              multiple />
          </div>

        </div>
      </FileDrop>
    );
  }
}

export default Home;

