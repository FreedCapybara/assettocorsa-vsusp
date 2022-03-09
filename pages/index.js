import React from 'react';
import Link from 'next/link';
import styles from './index.module.scss';
import _ from 'lodash';

import { fileUtils } from '@lib/file-utils';
import { acUtils } from '@lib/ac-utils';
import { vsuspUtils } from '@lib/vsusp-utils';

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

  onFileSelected = async (files) => {
    const suspensionsIni = _.find(files, (f) => f.file.name === 'suspensions.ini');
    const suspensionsIniText = await this.getFileText(suspensionsIni);
    const suspensionsIniData = acUtils.processSuspensionsIni(suspensionsIniText);

    const tyresIni = _.find(files, (f) => f.file.name === 'tyres.ini');
    const tyresIniText = await this.getFileText(tyresIni);
    const tyresIniData = acUtils.processTyresIni(tyresIniText);

    const newState = {
      dragging: false,
      files,
      fileError: false,
      suspensionsIniData,
      tyresIniData
    };

    if (suspensionsIniData && tyresIniData) {
      const vsuspUrl = this.createVsuspUrl(suspensionsIniData, tyresIniData);
      newState.vsuspUrl = vsuspUrl;
      window.open(vsuspUrl, '_blank');
    }

    this.setState(newState);
  };

  getFileText = async (fileData) => {
    if (!fileData) {
      return null;
    }

    const fileText = await fileUtils.readFileText(fileData.file);
    return fileText;
  };

  createVsuspUrl = (suspensionsIniData, tyresIniData) => {
    const frontSuspensionData = vsuspUtils.convertSuspensionData(suspensionsIniData.front, tyresIniData);
    const rearSuspensionData = vsuspUtils.convertSuspensionData(suspensionsIniData.rear, tyresIniData);

    const front = vsuspUtils.generateSuspension(frontSuspensionData);
    const rear = vsuspUtils.generateSuspension(rearSuspensionData);
    const prefs = vsuspUtils.generatePrefs();

    const result = vsuspUtils.generateVsuspUrl(front, rear, prefs);
    return result;
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

          <a target="_blank" rel="noopener noreferrer" href={this.state.vsuspUrl}>{this.state.vsuspUrl}</a>

        </div>
      </FileDrop>
    );
  }
}

export default Home;

